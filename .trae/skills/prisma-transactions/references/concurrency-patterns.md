# Read, Modify, Write

In some cases you may need to perform custom logic as part of an atomic operation - also known as the [read-modify-write pattern](https://en.wikipedia.org/wiki/Read%E2%80%93modify%E2%80%93write). The following is an example of the read-modify-write pattern:

- Read a value from the database
- Run some logic to manipulate that value (for example, contacting an external API)
- Write the value back to the database

All operations should **succeed or fail together** without making unwanted changes to the database, but you do not necessarily need to use an actual database transaction. This section of the guide describes two ways to work with Prisma Client and the read-modify-write pattern:

- Designing idempotent APIs
- Optimistic concurrency control

## Idempotent APIs

Idempotency is the ability to run the same logic with the same parameters multiple times with the same result: the **effect on the database** is the same whether you run the logic once or one thousand times. For example:

- **NOT IDEMPOTENT**: Upsert (update-or-insert) a user in the database with email address `"letoya@prisma.io"`. The `User` table **does not** enforce unique email addresses. The effect on the database is different if you run the logic once (one user created) or ten times (ten users created).
- **IDEMPOTENT**: Upsert (update-or-insert) a user in the database with the email address `"letoya@prisma.io"`. The `User` table **does** enforce unique email addresses. The effect on the database is the same if you run the logic once (one user created) or ten times (existing user is updated with the same input).

Idempotency is something you can and should actively design into your application wherever possible.

### When to design an idempotent API

- ✔ You need to be able to retry the same logic without creating unwanted side-effects in the databases

### Scenario: Upgrading a Slack team

You are creating an upgrade flow for Slack that allows teams to unlock paid features. Teams can choose between different plans and pay per user, per month. You use Stripe as your payment gateway, and extend your `Team` model to store a `stripeCustomerId`. Subscriptions are managed in Stripe.

```prisma highlight=5;normal
model Team {
  id               Int     @id @default(autoincrement())
  name             String
  User             User[]
  //highlight-next-line
  stripeCustomerId String?
}
```

The upgrade flow looks like this:

1. Count the number of users
2. Create a subscription in Stripe that includes the number of users
3. Associate the team with the Stripe customer ID to unlock paid features

```ts
const teamId = 9;
const planId = 'plan_id';

// Count team members
const numTeammates = await prisma.user.count({
  where: {
    teams: {
      some: {
        id: teamId,
      },
    },
  },
});

// Create a customer in Stripe for plan-9454549
const customer = await stripe.customers.create({
  externalId: teamId,
  plan: planId,
  quantity: numTeammates,
});

// Update the team with the customer id to indicate that they are a customer
// and support querying this customer in Stripe from our application code.
await prisma.team.update({
  data: {
    customerId: customer.id,
  },
  where: {
    id: teamId,
  },
});
```

This example has a problem: you can only run the logic _once_. Consider the following scenario:

1. Stripe creates a new customer and subscription, and returns a customer ID
2. Updating the team **fails** - the team is not marked as a customer in the Slack database
3. The customer is charged by Stripe, but paid features are not unlocked in Slack because the team lacks a valid `customerId`
4. Running the same code again either:
   - Results in an error because the team (defined by `externalId`) already exists - Stripe never returns a customer ID
   - If `externalId` is not subject to a unique constraint, Stripe creates yet another subscription (**not idempotent**)

You cannot re-run this code in case of an error and you cannot change to another plan without being charged twice.

The following refactor (highlighted) introduces a mechanism that checks if a subscription already exists, and either creates the description or updates the existing subscription (which will remain unchanged if the input is identical):

```ts highlight=12-27;normal
// Calculate the number of users times the cost per user
const numTeammates = await prisma.user.count({
  where: {
    teams: {
      some: {
        id: teamId,
      },
    },
  },
});

//highlight-start
// Find customer in Stripe
let customer = await stripe.customers.get({ externalId: teamID });

if (customer) {
  // If team already exists, update
  customer = await stripe.customers.update({
    externalId: teamId,
    plan: 'plan_id',
    quantity: numTeammates,
    //highlight-end
  });
} else {
  customer = await stripe.customers.create({
    // If team does not exist, create customer
    externalId: teamId,
    plan: 'plan_id',
    quantity: numTeammates,
  });
}

// Update the team with the customer id to indicate that they are a customer
// and support querying this customer in Stripe from our application code.
await prisma.team.update({
  data: {
    customerId: customer.id,
  },
  where: {
    id: teamId,
  },
});
```

You can now retry the same logic multiple times with the same input without adverse effect. To further enhance this example, you can introduce a mechanism whereby the subscription is cancelled or temporarily deactivated if the update does not succeed after a set number of attempts.

## Optimistic concurrency control

Optimistic concurrency control (OCC) is a model for handling concurrent operations on a single entity that does not rely on 🔒 locking. Instead, we **optimistically** assume that a record will remain unchanged in between reading and writing, and use a concurrency token (a timestamp or version field) to detect changes to a record.

If a ❌ conflict occurs (someone else has changed the record since you read it), you cancel the transaction. Depending on your scenario, you can then:

- Re-try the transaction (book another cinema seat)
- Throw an error (alert the user that they are about to overwrite changes made by someone else)

This section describes how to build your own optimistic concurrency control. See also: Plans for [application-level optimistic concurrency control on GitHub](https://github.com/prisma/prisma/issues/4988)

:::info

- If you use version 4.4.0 or earlier, you cannot use optimistic concurrency control on `update` operations, because you cannot filter on non-unique fields. The `version` field you need to use with optimistic concurrency control is a non-unique field.

- Since version 5.0.0 you are able to [filter on non-unique fields in `update` operations](/orm/reference/prisma-client-reference#filter-on-non-unique-fields-with-userwhereuniqueinput) so that optimistic concurrency control is being used. The feature was also available via the Preview flag `extendedWhereUnique` from versions 4.5.0 to 4.16.2.

:::

### When to use optimistic concurrency control

- ✔ You anticipate a high number of concurrent requests (multiple people booking cinema seats)
- ✔ You anticipate that conflicts between those concurrent requests will be rare

Avoiding locks in an application with a high number of concurrent requests makes the application more resilient to load and more scalable overall. Although locking is not inherently bad, locking in a high concurrency environment can lead to unintended consequences - even if you are locking individual rows, and only for a short amount of time. For more information, see:

- [Why ROWLOCK Hints Can Make Queries Slower and Blocking Worse in SQL Server](https://kendralittle.com/2016/02/04/why-rowlock-hints-can-make-queries-slower-and-blocking-worse-in-sql-server/)

### Scenario: Reserving a seat at the cinema

You are creating a booking system for a cinema. Each movie has a set number of seats. The following schema models movies and seats:

```ts
model Seat {
  id        Int   @id @default(autoincrement())
  userId    Int?
  claimedBy User? @relation(fields: [userId], references: [id])
  movieId   Int
  movie     Movie @relation(fields: [movieId], references: [id])
}

model Movie {
  id    Int    @id     @default(autoincrement())
  name  String @unique
  seats Seat[]
}
```

The following sample code finds the first available seat and assigns that seat to a user:

```ts
const movieName = 'Hidden Figures';

// Find first available seat
const availableSeat = await prisma.seat.findFirst({
  where: {
    movie: {
      name: movieName,
    },
    claimedBy: null,
  },
});

// Throw an error if no seats are available
if (!availableSeat) {
  throw new Error(`Oh no! ${movieName} is all booked.`);
}

// Claim the seat
await prisma.seat.update({
  data: {
    claimedBy: userId,
  },
  where: {
    id: availableSeat.id,
  },
});
```

However, this code suffers from the "double-booking problem" - it is possible for two people to book the same seats:

1. Seat 3A returned to Sorcha (`findFirst`)
2. Seat 3A returned to Ellen (`findFirst`)
3. Seat 3A claimed by Sorcha (`update`)
4. Seat 3A claimed by Ellen (`update` - overwrites Sorcha's claim)

Even though Sorcha has successfully booked the seat, the system ultimately stores Ellen's claim. To solve this problem with optimistic concurrency control, add a `version` field to the seat:

```prisma highlight=7;normal
model Seat {
  id        Int   @id @default(autoincrement())
  userId    Int?
  claimedBy User? @relation(fields: [userId], references: [id])
  movieId   Int
  movie     Movie @relation(fields: [movieId], references: [id])
  //highlight-next-line
  version   Int
}
```

Next, adjust the code to check the `version` field before updating:

```ts highlight=19-38;normal
const userEmail = 'alice@prisma.io';
const movieName = 'Hidden Figures';

// Find the first available seat
// availableSeat.version might be 0
const availableSeat = await client.seat.findFirst({
  where: {
    Movie: {
      name: movieName,
    },
    claimedBy: null,
  },
});

if (!availableSeat) {
  throw new Error(`Oh no! ${movieName} is all booked.`);
}

//highlight-start
// Only mark the seat as claimed if the availableSeat.version
// matches the version we're updating. Additionally, increment the
// version when we perform this update so all other clients trying
// to book this same seat will have an outdated version.
const seats = await client.seat.updateMany({
  data: {
    claimedBy: userEmail,
    version: {
      increment: 1,
    },
  },
  where: {
    id: availableSeat.id,
    version: availableSeat.version, // This version field is the key; only claim seat if in-memory version matches database version, indicating that the field has not been updated
  },
});

if (seats.count === 0) {
  throw new Error(`That seat is already booked! Please try again.`);
}
//highlight-end
```

It is now impossible for two people to book the same seat:

1. Seat 3A returned to Sorcha (`version` is 0)
2. Seat 3A returned to Ellen (`version` is 0)
3. Seat 3A claimed by Sorcha (`version` is incremented to 1, booking succeeds)
4. Seat 3A claimed by Ellen (in-memory `version` (0) does not match database `version` (1) - booking does not succeed)

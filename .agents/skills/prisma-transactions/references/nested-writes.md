# Nested Writes

A [nested write](/orm/prisma-client/queries/relation-queries#nested-writes) lets you perform a single Prisma Client API call with multiple _operations_ that touch multiple [_related_](/orm/prisma-schema/data-model/relations) records. For example, creating a _user_ together with a _post_ or updating an _order_ together with an _invoice_. Prisma Client ensures that all operations succeed or fail as a whole.

The following example demonstrates a nested write with `create`:

```ts
// Create a new user with two posts in a
// single transaction
const newUser: User = await prisma.user.create({
  data: {
    email: 'alice@prisma.io',
    posts: {
      create: [
        { title: 'Join the Prisma Discord at https://pris.ly/discord' },
        { title: 'Follow @prisma on Twitter' },
      ],
    },
  },
});
```

The following example demonstrates a nested write with `update`:

```ts
// Change the author of a post in a single transaction
const updatedPost: Post = await prisma.post.update({
  where: { id: 42 },
  data: {
    author: {
      connect: { email: 'alice@prisma.io' },
    },
  },
});
```

## Dependent writes

Writes are considered **dependent** on each other if:

- Operations depend on the result of a preceding operation (for example, the database generating an ID)

The most common scenario is creating a record and using the generated ID to create or update a related record. Examples include:

- Creating a user and two related blog posts (a one-to-many relationship) - the author ID must be known before creating blog posts
- Creating a team and assigning members (a many-to-many relationship) - the team ID must be known before assigning members

Dependent writes must succeed together in order to maintain data consistency and prevent unexpected behavior, such as blog post without an author or a team without members.

Prisma Client's solution to dependent writes is the **nested writes** feature, which is supported by `create` and `update`.

If any operation fails, Prisma Client rolls back the entire transaction. Nested writes are not currently supported by top-level bulk operations like `client.user.deleteMany` and `client.user.updateMany`.

### When to use nested writes

Consider using nested writes if:

- ✔ You want to create two or more records related by ID at the same time (for example, create a blog post and a user)
- ✔ You want to update and create records related by ID at the same time (for example, change a user's name and create a new blog post)

:::tip

If you [pre-compute your IDs, you can choose between a nested write or using the `$transaction([])` API](#scenario-pre-computed-ids-and-the-transaction-api).

:::

### Scenario: Sign-up flow

Consider the Slack sign-up flow, which:

1. Creates a team
2. Adds one user to that team, which automatically becomes that team's administrator

This scenario can be represented by the following schema - note that users can belong to many teams, and teams can have many users (a many-to-many relationship):

```prisma
model Team {
  id      Int    @id @default(autoincrement())
  name    String
  members User[] // Many team members
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  teams Team[] // Many teams
}
```

The most straightforward approach is to create a team, then create and attach a user to that team:

```ts
// Create a team
const team = await prisma.team.create({
  data: {
    name: 'Aurora Adventures',
  },
});

// Create a user and assign them to the team
const user = await prisma.user.create({
  data: {
    email: 'alice@prisma.io',
    team: {
      connect: {
        id: team.id,
      },
    },
  },
});
```

However, this code has a problem - consider the following scenario:

1. Creating the team succeeds - "Aurora Adventures" is now taken
2. Creating and connecting the user fails - the team "Aurora Adventures" exists, but has no users
3. Going through the sign-up flow again and attempting to recreate "Aurora Adventures" fails - the team already exists

Creating a team and adding a user should be one atomic operation that **succeeds or fails as a whole**.

To implement atomic writes in a low-level database clients, you must wrap your inserts in `BEGIN`, `COMMIT` and `ROLLBACK` statements. Prisma Client solves the problem with [nested writes](/orm/prisma-client/queries/relation-queries#nested-writes). The following query creates a team, creates a user, and connects the records in a single transaction:

```ts
const team = await prisma.team.create({
  data: {
    name: 'Aurora Adventures',
    members: {
      create: {
        email: 'alice@prisma.io',
      },
    },
  },
});
```

Furthermore, if an error occurs at any point, Prisma Client rolls back the entire transaction.

### Nested writes FAQs

#### Why can't I use the `$transaction([])` API to solve the same problem?

The `$transaction([])` API does not allow you to pass IDs between distinct operations. In the following example, `createUserOperation.id` is not available yet:

```ts highlight=12;delete
const createUserOperation = prisma.user.create({
  data: {
    email: 'ebony@prisma.io',
  },
});

const createTeamOperation = prisma.team.create({
  data: {
    name: 'Aurora Adventures',
    members: {
      connect: {
        //delete-next-line
        id: createUserOperation.id, // Not possible, ID not yet available
      },
    },
  },
});

await prisma.$transaction([createUserOperation, createTeamOperation]);
```

#### Nested writes support nested updates, but updates are not dependent writes - should I use the `$transaction([])` API?

It is correct to say that because you know the ID of the team, you can update the team and its team members independently within a `$transaction([])`. The following example performs both operations in a `$transaction([])`:

```ts
const updateTeam = prisma.team.update({
  where: {
    id: 1,
  },
  data: {
    name: 'Aurora Adventures Ltd',
  },
});

const updateUsers = prisma.user.updateMany({
  where: {
    teams: {
      some: {
        id: 1,
      },
    },
    name: {
      equals: null,
    },
  },
  data: {
    name: 'Unknown User',
  },
});

await prisma.$transaction([updateUsers, updateTeam]);
```

However, you can achieve the same result with a nested write:

```ts
const updateTeam = await prisma.team.update({
  where: {
    id: 1,
  },
  data: {
    name: 'Aurora Adventures Ltd', // Update team name
    members: {
      updateMany: {
        // Update team members that do not have a name
        data: {
          name: 'Unknown User',
        },
        where: {
          name: {
            equals: null,
          },
        },
      },
    },
  },
});
```

#### Can I perform multiple nested writes - for example, create two new teams and assign users?

Yes, but this is a combination of scenarios and techniques:

- Creating a team and assigning users is a dependent write - use nested writes
- Creating all teams and users at the same time is an independent write because team/user combination #1 and team/user combination #2 are unrelated writes - use the `$transaction([])` API

```ts
// Nested write
const createOne = prisma.team.create({
  data: {
    name: 'Aurora Adventures',
    members: {
      create: {
        email: 'alice@prisma.io',
      },
    },
  },
});

// Nested write
const createTwo = prisma.team.create({
  data: {
    name: 'Cool Crew',
    members: {
      create: {
        email: 'elsa@prisma.io',
      },
    },
  },
});

// $transaction([]) API
await prisma.$transaction([createTwo, createOne]);
```

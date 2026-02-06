# The `$transaction` API

The `$transaction` API can be used in two ways:

- [Sequential operations](#sequential-prisma-client-operations): Pass an array of Prisma Client queries to be executed sequentially inside of a transaction.

  `$transaction<R>(queries: PrismaPromise<R>[]): Promise<R[]>`

- [Interactive transactions](#interactive-transactions): Pass a function that can contain user code including Prisma Client queries, non-Prisma code and other control flow to be executed in a transaction.

  `$transaction<R>(fn: (prisma: PrismaClient) => R): R`

## Sequential Prisma Client operations

The following query returns all posts that match the provided filter as well as a count of all posts:

```ts
const [posts, totalPosts] = await prisma.$transaction([
  prisma.post.findMany({ where: { title: { contains: 'prisma' } } }),
  prisma.post.count(),
]);
```

You can also use raw queries inside of a `$transaction`:

<TabbedContent code>

<TabItem value="Relational databases">

```ts
import { selectUserTitles, updateUserName } from '@prisma/client/sql';

const [userList, updateUser] = await prisma.$transaction([
  prisma.$queryRawTyped(selectUserTitles()),
  prisma.$queryRawTyped(updateUserName(2)),
]);
```

</TabItem>

<TabItem value="MongoDB">

```ts
const [findRawData, aggregateRawData, commandRawData] =
  await prisma.$transaction([
    prisma.user.findRaw({
      filter: { age: { $gt: 25 } },
    }),
    prisma.user.aggregateRaw({
      pipeline: [
        { $match: { status: 'registered' } },
        { $group: { _id: '$country', total: { $sum: 1 } } },
      ],
    }),
    prisma.$runCommandRaw({
      aggregate: 'User',
      pipeline: [
        { $match: { name: 'Bob' } },
        { $project: { email: true, _id: false } },
      ],
      explain: false,
    }),
  ]);
```

</TabItem>

</TabbedContent>

Instead of immediately awaiting the result of each operation when it's performed, the operation itself is stored in a variable first which later is submitted to the database with a method called `$transaction`. Prisma Client will ensure that either all three `create` operations succeed or none of them succeed.

> **Note**: Operations are executed according to the order they are placed in the transaction. Using a query in a transaction does not influence the order of operations in the query itself.

From version 4.4.0, the sequential operations transaction API has a second parameter. You can use the following optional configuration option in this parameter:

- `isolationLevel`: Sets the [transaction isolation level](#transaction-isolation-level). By default this is set to the value currently configured in your database.

For example:

```ts
await prisma.$transaction(
  [
    prisma.resource.deleteMany({ where: { name: 'name' } }),
    prisma.resource.createMany({ data }),
  ],
  {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
  },
);
```

### When to use the `$transaction([])` API

Consider the `$transaction([])` API if:

- ✔ You want to update a batch that includes different types of records, such as emails and users. The records do not need to be related in any way.
- ✔ You want to batch raw SQL queries (`$executeRaw`) - for example, for features that Prisma Client does not yet support.

### Scenario: Privacy legislation

GDPR and other privacy legislation give users the right to request that an organization deletes all of their personal data. In the following example schema, a `User` can have many posts and private messages:

```prisma
model User {
  id              Int              @id @default(autoincrement())
  posts           Post[]
  privateMessages PrivateMessage[]
}

model Post {
  id      Int    @id @default(autoincrement())
  user    User   @relation(fields: [userId], references: [id])
  userId  Int
  title   String
  content String
}

model PrivateMessage {
  id      Int    @id @default(autoincrement())
  user    User   @relation(fields: [userId], references: [id])
  userId  Int
  message String
}
```

If a user invokes the right to be forgotten, we must delete three records: the user record, private messages, and posts. It is critical that _all_ delete operations succeed together or not at all, which makes this a use case for a transaction. However, using a single bulk operation like `deleteMany` is not possible in this scenario because we need to delete across three models. Instead, we can use the `$transaction([])` API to run three operations together - two `deleteMany` and one `delete`:

```ts
const id = 9; // User to be deleted

const deletePosts = prisma.post.deleteMany({
  where: {
    userId: id,
  },
});

const deleteMessages = prisma.privateMessage.deleteMany({
  where: {
    userId: id,
  },
});

const deleteUser = prisma.user.delete({
  where: {
    id: id,
  },
});

await prisma.$transaction([deletePosts, deleteMessages, deleteUser]); // Operations succeed or fail together
```

### Scenario: Pre-computed IDs and the `$transaction([])` API

Dependent writes are not supported by the `$transaction([])` API - if operation A relies on the ID generated by operation B, use [nested writes](#nested-writes). However, if you _pre-computed_ IDs (for example, by generating GUIDs), your writes become independent. Consider the sign-up flow from the nested writes example:

```ts
await prisma.team.create({
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

Instead of auto-generating IDs, change the `id` fields of `Team` and `User` to a `String` (if you do not provide a value, a UUID is generated automatically). This example uses UUIDs:

```prisma highlight=2,9;delete|3,10;add
model Team {
  //delete-next-line
  id      Int    @id @default(autoincrement())
  //add-next-line
  id      String @id @default(uuid())
  name    String
  members User[]
}

model User {
  //delete-next-line
  id    Int    @id @default(autoincrement())
  //add-next-line
  id    String @id @default(uuid())
  email String @unique
  teams Team[]
}
```

Refactor the sign-up flow example to use the `$transaction([])` API instead of nested writes:

```ts
import { v4 } from 'uuid';

const teamID = v4();
const userID = v4();

await prisma.$transaction([
  prisma.user.create({
    data: {
      id: userID,
      email: 'alice@prisma.io',
      team: {
        id: teamID,
      },
    },
  }),
  prisma.team.create({
    data: {
      id: teamID,
      name: 'Aurora Adventures',
    },
  }),
]);
```

Technically you can still use nested writes with pre-computed APIs if you prefer that syntax:

```ts
import { v4 } from 'uuid';

const teamID = v4();
const userID = v4();

await prisma.team.create({
  data: {
    id: teamID,
    name: 'Aurora Adventures',
    members: {
      create: {
        id: userID,
        email: 'alice@prisma.io',
        team: {
          id: teamID,
        },
      },
    },
  },
});
```

There's no compelling reason to switch to manually generated IDs and the `$transaction([])` API if you are already using auto-generated IDs and nested writes.

## Interactive transactions

### Overview

Sometimes you need more control over what queries execute within a transaction. Interactive transactions are meant to provide you with an escape hatch.

:::info

Interactive transactions have been generally available from version 4.7.0.

If you use interactive transactions in preview from version 2.29.0 to 4.6.1 (inclusive), you need to add the `interactiveTransactions` preview feature to the generator block of your Prisma schema.

:::

To use interactive transactions, you can pass an async function into [`$transaction`](#transaction-api).

The first argument passed into this async function is an instance of Prisma Client. Below, we will call this instance `tx`. Any Prisma Client call invoked on this `tx` instance is encapsulated into the transaction.

:::warning

**Use interactive transactions with caution**. Keeping transactions open for a long time hurts database performance and can even cause deadlocks. Try to avoid performing network requests and executing slow queries inside your transaction functions. We recommend you get in and out as quick as possible!

:::

### Example

Let's look at an example:

Imagine that you are building an online banking system. One of the actions to perform is to send money from one person to another.

As experienced developers, we want to make sure that during the transfer,

- the amount doesn't disappear
- the amount isn't doubled

This is a great use-case for interactive transactions because we need to perform logic in-between the writes to check the balance.

In the example below, Alice and Bob each have $100 in their account. If they try to send more money than they have, the transfer is rejected.

Alice is expected to be able to make 1 transfer for $100 while the other transfer would be rejected. This would result in Alice having $0 and Bob having $200.

```tsx
import { PrismaClient } from '../prisma/generated/client';
const prisma = new PrismaClient();

function transfer(from: string, to: string, amount: number) {
  return prisma.$transaction(async (tx) => {
    // 1. Decrement amount from the sender.
    const sender = await tx.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: {
        email: from,
      },
    });

    // 2. Verify that the sender's balance didn't go below zero.
    if (sender.balance < 0) {
      throw new Error(`${from} doesn't have enough to send ${amount}`);
    }

    // 3. Increment the recipient's balance by amount
    const recipient = await tx.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: {
        email: to,
      },
    });

    return recipient;
  });
}

async function main() {
  // This transfer is successful
  await transfer('alice@prisma.io', 'bob@prisma.io', 100);
  // This transfer fails because Alice doesn't have enough funds in her account
  await transfer('alice@prisma.io', 'bob@prisma.io', 100);
}

main();
```

In the example above, both `update` queries run within a database transaction. When the application reaches the end of the function, the transaction is **committed** to the database.

If your application encounters an error along the way, the async function will throw an exception and automatically **rollback** the transaction.

To catch the exception, you can wrap `$transaction` in a try-catch block:

```js
try {
  await prisma.$transaction(async (tx) => {
    // Code running in a transaction...
  });
} catch (err) {
  // Handle the rollback...
}
```

### Transaction options

The transaction API has a second parameter. For interactive transactions, you can use the following optional configuration options in this parameter:

- `maxWait`: The maximum amount of time Prisma Client will wait to acquire a transaction from the database. The default value is 2 seconds.
- `timeout`: The maximum amount of time the interactive transaction can run before being canceled and rolled back. The default value is 5 seconds.
- `isolationLevel`: Sets the [transaction isolation level](#transaction-isolation-level). By default this is set to the value currently configured in your database.

For example:

```ts
await prisma.$transaction(
  async (tx) => {
    // Code running in a transaction...
  },
  {
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
  },
);
```

You can also set these globally on the constructor-level:

```ts
const prisma = new PrismaClient({
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
  },
});
```

### Transaction isolation level

:::info

This feature is not available on MongoDB, because MongoDB does not support isolation levels.

:::

You can set the transaction [isolation level](https://www.prisma.io/dataguide/intro/database-glossary#isolation-levels) for transactions.

:::info

This is available in the following Prisma ORM versions for interactive transactions from version 4.2.0, for sequential operations from version 4.4.0.

In versions before 4.2.0 (for interactive transactions), or 4.4.0 (for sequential operations), you cannot configure the transaction isolation level at a Prisma ORM level. Prisma ORM does not explicitly set the isolation level, so the [isolation level configured in your database](#database-specific-information-on-isolation-levels) is used.

:::

#### Set the isolation level

To set the transaction isolation level, use the `isolationLevel` option in the second parameter of the API.

For sequential operations:

```ts
await prisma.$transaction(
  [
    // Prisma Client operations running in a transaction...
  ],
  {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
  },
);
```

For an interactive transaction:

```jsx
await prisma.$transaction(
  async (prisma) => {
    // Code running in a transaction...
  },
  {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
  },
);
```

#### Supported isolation levels

Prisma Client supports the following isolation levels if they are available in the underlying database:

- `ReadUncommitted`
- `ReadCommitted`
- `RepeatableRead`
- `Snapshot`
- `Serializable`

The isolation levels available for each database connector are as follows:

| Database    | `ReadUncommitted` | `ReadCommitted` | `RepeatableRead` | `Snapshot` | `Serializable` |
| ----------- | ----------------- | --------------- | ---------------- | ---------- | -------------- |
| PostgreSQL  | ✔️                | ✔️              | ✔️               | No         | ✔️             |
| MySQL       | ✔️                | ✔️              | ✔️               | No         | ✔️             |
| SQL Server  | ✔️                | ✔️              | ✔️               | ✔️         | ✔️             |
| CockroachDB | No                | No              | No               | No         | ✔️             |
| SQLite      | No                | No              | No               | No         | ✔️             |

By default, Prisma Client sets the isolation level to the value currently configured in your database.

The isolation levels configured by default in each database are as follows:

| Database    | Default          |
| ----------- | ---------------- |
| PostgreSQL  | `ReadCommitted`  |
| MySQL       | `RepeatableRead` |
| SQL Server  | `ReadCommitted`  |
| CockroachDB | `Serializable`   |
| SQLite      | `Serializable`   |

#### Database-specific information on isolation levels

See the following resources:

- [Transaction isolation levels in PostgreSQL](https://www.postgresql.org/docs/9.3/runtime-config-client.html#GUC-DEFAULT-TRANSACTION-ISOLATION)
- [Transaction isolation levels in Microsoft SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql?view=sql-server-ver15)
- [Transaction isolation levels in MySQL](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html)

CockroachDB and SQLite only support the `Serializable` isolation level.

### Transaction timing issues

:::info

- The solution in this section does not apply to MongoDB, because MongoDB does not support [isolation levels](https://www.prisma.io/dataguide/intro/database-glossary#isolation-levels).
- The timing issues discussed in this section do not apply to CockroachDB and SQLite, because these databases only support the highest `Serializable` isolation level.

:::

When two or more transactions run concurrently in certain [isolation levels](https://www.prisma.io/dataguide/intro/database-glossary#isolation-levels), timing issues can cause write conflicts or deadlocks, such as the violation of unique constraints. For example, consider the following sequence of events where Transaction A and Transaction B both attempt to execute a `deleteMany` and a `createMany` operation:

1. Transaction B: `createMany` operation creates a new set of rows.
1. Transaction B: The application commits transaction B.
1. Transaction A: `createMany` operation.
1. Transaction A: The application commits transaction A. The new rows conflict with the rows that transaction B added at step 2.

This conflict can occur at the isolation level `ReadCommited`, which is the default isolation level in PostgreSQL and Microsoft SQL Server. To avoid this problem, you can set a higher isolation level (`RepeatableRead` or `Serializable`). You can set the isolation level on a transaction. This overrides your database isolation level for that transaction.

To avoid transaction write conflicts and deadlocks on a transaction:

1. On your transaction, use the `isolationLevel` parameter to `Prisma.TransactionIsolationLevel.Serializable`.

   This ensures that your application commits multiple concurrent or parallel transactions as if they were run serially. When a transaction fails due to a write conflict or deadlock, Prisma Client returns a [P2034 error](/orm/reference/error-reference#p2034).

2. In your application code, add a retry around your transaction to handle any P2034 errors, as shown in this example:

   ```ts
   import { Prisma, PrismaClient } from '../prisma/generated/client';

   const prisma = new PrismaClient();
   async function main() {
     const MAX_RETRIES = 5;
     let retries = 0;

     let result;
     while (retries < MAX_RETRIES) {
       try {
         result = await prisma.$transaction(
           [
             prisma.user.deleteMany({
               where: {
                 /** args */
               },
             }),
             prisma.post.createMany({
               data: {
                 /** args */
               },
             }),
           ],
           {
             isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
           },
         );
         break;
       } catch (error) {
         if (error.code === 'P2034') {
           retries++;
           continue;
         }
         throw error;
       }
     }
   }
   ```

### Using `$transaction` within `Promise.all()`

If you wrap a `$transaction` inside a call to `Promise.all()`, the queries inside the transaction will be executed _serially_ (i.e. one after another):

```ts
await prisma.$transaction(async (prisma) => {
  await Promise.all([
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
    prisma.user.findMany(),
  ]);
});
```

This may be counterintuitive because `Promise.all()` usually _parallelizes_ the calls passed into it.

The reason for this behaviour is that:

- One transaction means that all queries inside it have to be run on the same connection.
- A database connection can only ever execute one query at a time.
- As one query blocks the connection while it is doing its work, putting a transaction into `Promise.all` effectively means that queries should be ran one after another.

# Batch/Bulk Operations

The following bulk operations run as transactions:

- `createMany()`
- `createManyAndReturn()`
- `updateMany()`
- `updateManyAndReturn()`
- `deleteMany()`

## Independent writes

Writes are considered **independent** if they do not rely on the result of a previous operation. The following groups of independent writes can occur in any order:

- Updating the status field of a list of orders to "Dispatched"
- Marking a list of emails as "Read"

> **Note**: Independent writes may have to occur in a specific order if constraints are present - for example, you must delete blog posts before the blog author if the post have a mandatory `authorId` field. However, they are still considered independent writes because no operations depend on the _result_ of a previous operation, such as the database returning a generated ID.

Depending on your requirements, Prisma Client has four options for handling independent writes that should succeed or fail together.

### Bulk operations

Bulk writes allow you to write multiple records of the same type in a single transaction - if any operation fails, Prisma Client rolls back the entire transaction.

#### When to use bulk operations

Consider bulk operations as a solution if:

- ✔ You want to update a batch of the _same type_ of record, like a batch of emails

#### Scenario: Marking emails as read

You are building a service like gmail.com, and your customer wants a **"Mark as read"** feature that allows users to mark all emails as read. Each update to the status of an email is an independent write because the emails do not depend on one another - for example, the "Happy Birthday! 🍰" email from your aunt is unrelated to the promotional email from IKEA.

In the following schema, a `User` can have many received emails (a one-to-many relationship):

```ts
model User {
  id    Int       @id @default(autoincrement())
  email           String @unique
  receivedEmails  Email[] // Many emails
}

model Email {
  id      Int     @id @default(autoincrement())
  user    User    @relation(fields: [userId], references: [id])
  userId  Int
  subject String
  body    String
  unread  Boolean
}
```

Based on this schema, you can use `updateMany` to mark all unread emails as read:

```ts
await prisma.email.updateMany({
  where: {
    user: {
      id: 10,
    },
    unread: true,
  },
  data: {
    unread: false,
  },
});
```

#### Can I use nested writes with bulk operations?

No - neither `updateMany` nor `deleteMany` currently supports nested writes. For example, you cannot delete multiple teams and all of their members (a cascading delete):

```ts highlight=8;delete
await prisma.team.deleteMany({
  where: {
    id: {
      in: [2, 99, 2, 11],
    },
  },
  data: {
    //delete-next-line
    members: {}, // Cannot access members here
  },
});
```

#### Can I use bulk operations with the `$transaction([])` API?

Yes — for example, you can include multiple `deleteMany` operations inside a `$transaction([])`.

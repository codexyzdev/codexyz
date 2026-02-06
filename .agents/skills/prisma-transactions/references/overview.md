# Transactions Overview

A database transaction refers to a sequence of read/write operations that are _guaranteed_ to either succeed or fail as a whole. This section describes the ways in which the Prisma Client API supports transactions.

:::info

Before Prisma ORM version 4.4.0, you could not set isolation levels on transactions. The isolation level in your database configuration always applied.

:::

Developers take advantage of the safety guarantees provided by the database by wrapping the operations in a transaction. These guarantees are often summarized using the ACID acronym:

- **Atomic**: Ensures that either _all_ or _none_ operations of the transactions succeed. The transaction is either _committed_ successfully or _aborted_ and _rolled back_.
- **Consistent**: Ensures that the states of the database before and after the transaction are _valid_ (i.e. any existing invariants about the data are maintained).
- **Isolated**: Ensures that concurrently running transactions have the same effect as if they were running in serial.
- **Durability**: Ensures that after the transaction succeeded, any writes are being stored persistently.

While there's a lot of ambiguity and nuance to each of these properties (for example, consistency could actually be considered an _application-level responsibility_ rather than a database property or isolation is typically guaranteed in terms of stronger and weaker _isolation levels_), overall they serve as a good high-level guideline for expectations developers have when thinking about database transactions.

> "Transactions are an abstraction layer that allows an application to pretend that certain concurrency problems and certain kinds of hardware and software faults don’t exist. A large class of errors is reduced down to a simple transaction abort, and the application just needs to try again." [Designing Data-Intensive Applications](https://dataintensive.net/), [Martin Kleppmann](https://bsky.app/profile/martin.kleppmann.com)

Prisma Client supports six different ways of handling transactions for three different scenarios:

| Scenario            | Available techniques                                                                                            |
| :------------------ | :-------------------------------------------------------------------------------------------------------------- |
| Dependent writes    | <ul><li>Nested writes</li></ul>                                                                                 |
| Independent writes  | <ul><li>`$transaction([])` API</li><li>Batch operations</li></ul>                                               |
| Read, modify, write | <ul><li>Idempotent operations</li><li>Optimistic concurrency control</li><li>Interactive transactions</li></ul> |

The technique you choose depends on your particular use case.

> **Note**: For the purposes of this guide, _writing_ to a database encompasses creating, updating, and deleting data.

## About transactions in Prisma Client

Prisma Client provides the following options for using transactions:

- [Nested writes](#nested-writes): use the Prisma Client API to process multiple operations on one or more related records inside the same transaction.
- [Batch / bulk transactions](#batchbulk-operations): process one or more operations in bulk with `updateMany`, `deleteMany`, and `createMany`.
- The `$transaction` API in Prisma Client:
  - [Sequential operations](#sequential-prisma-client-operations): pass an array of Prisma Client queries to be executed sequentially inside a transaction, using `$transaction<R>(queries: PrismaPromise<R>[]): Promise<R[]>`.
  - [Interactive transactions](#interactive-transactions): pass a function that can contain user code including Prisma Client queries, non-Prisma code and other control flow to be executed in a transaction, using `$transaction<R>(fn: (prisma: PrismaClient) => R, options?: object): R`

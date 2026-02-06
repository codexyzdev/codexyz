# RBAC Database Schema

This reference documents the Prisma models used for the Role-Based Access Control system.

## Models

### Role
Represents a role that can be assigned to users.
- `id`: Unique identifier (CUID).
- `name`: Unique name (slug-like, e.g., "admin", "editor").
- `description`: Optional description.
- `isSystem`: Boolean. If true, the role cannot be deleted or renamed.
- `permissions`: Many-to-many relationship with `Permission`.
- `users`: One-to-many relationship with `Users`.

### Permission
Represents a specific action or capability.
- `id`: Unique identifier.
- `action`: Unique string identifier (e.g., "users:view", "posts:write").
- `description`: Optional description.
- `module`: Grouping category for UI (e.g., "Usuarios", "Configuración").
- `roles`: Many-to-many relationship with `Role`.

### RoleAuditLog
Audit trail for changes to roles.
- `action`: "CREATE", "UPDATE", "DELETE".
- `performedBy`: ID of the user who performed the action.
- `details`: JSON object containing the diff or snapshot of changes.

### Users (RBAC Extensions)
- `roleId`: Foreign key to `Role`.
- `role`: Relation to `Role`.

## Prisma Schema Snippet

```prisma
model Users {
  id        String  @id
  // ...
  roleId    String?
  role      Role?   @relation(fields: [roleId], references: [id])
}

model Role {
  id          String  @id @default(cuid())
  name        String  @unique
  description String?
  isSystem    Boolean @default(false)
  users       Users[]
  permissions Permission[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Permission {
  id          String  @id @default(cuid())
  action      String  @unique
  description String?
  module      String
  roles       Role[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model RoleAuditLog {
  id          String   @id @default(cuid())
  roleId      String?
  roleName    String
  action      String
  performedBy String
  details     Json?
  createdAt   DateTime @default(now())
  @@index([roleId])
  @@index([performedBy])
  @@index([details], type: Gin)
}
```

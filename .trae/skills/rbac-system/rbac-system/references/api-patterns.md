# RBAC API Patterns

This reference documents the standard patterns for implementing secure API routes using the RBAC system.

## Security Middleware

All RBAC-protected routes MUST use the `checkPermission` helper.

```typescript
import { checkPermission } from '@/features/auth/utils/api-protection';
import { NextResponse } from 'next/server';

export async function GET() {
  const { authorized, status, error } = await checkPermission('required:permission');

  if (!authorized) {
    return NextResponse.json({ error }, { status });
  }
  
  // Proceed with logic...
}
```

## Creating Resources (POST)

When creating resources that require auditing (like Roles), use `prisma.$transaction`.

1.  **Check Permission**: Verify `roles:manage` or equivalent.
2.  **Validate Input**: Use Zod schemas.
3.  **Transaction**:
    *   Create the resource.
    *   Create the audit log entry.
4.  **Error Handling**: Wrap in try/catch.

```typescript
// Example: Creating a Role
const result = await prisma.$transaction(async (tx) => {
  const newRole = await tx.role.create({ /* ... */ });
  
  await tx.roleAuditLog.create({
    data: {
      roleId: newRole.id,
      action: 'CREATE',
      // ... details
    }
  });
  
  return newRole;
});
```

## Updating Resources (PUT)

1.  **Check Permission**.
2.  **Fetch Current State**: Needed for diffing and validation (e.g., checking `isSystem`).
3.  **Validate Logic**: Ensure system resources aren't modified illegally.
4.  **Transaction**:
    *   Update resource.
    *   Calculate diffs (added/removed permissions).
    *   Create audit log with `details: { changes: ... }`.

## Deleting Resources (DELETE)

1.  **Check Permission**.
2.  **Validate Constraints**:
    *   Cannot delete `isSystem` roles.
    *   Cannot delete roles with assigned users (`_count.users > 0`).
3.  **Transaction**:
    *   Create audit log (store `originalData` in details).
    *   Delete resource.

## Validation Schemas

Schemas are located in `features/admin/schemas/`.

```typescript
import { createRoleSchema, updateRoleSchema } from '@/features/admin/schemas/roles';

const validation = createRoleSchema.safeParse(body);
if (!validation.success) {
  return NextResponse.json({ error: 'Invalid data', details: validation.error.format() }, { status: 400 });
}
```

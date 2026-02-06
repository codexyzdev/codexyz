---
name: rbac-system
description: Comprehensive guide for the Role-Based Access Control (RBAC) system. Use when working on admin features, managing roles/permissions, or implementing secure API routes that require authorization checks.
---

# Role-Based Access Control (RBAC) System

This skill provides guidelines and patterns for working with the application's RBAC system. It covers the database schema, security patterns, and API implementation standards.

## Core Components

### Database Schema
The system uses `Role`, `Permission`, and `RoleAuditLog` models in Prisma. Users are assigned a single `Role`.
See [references/schema.md](references/schema.md) for details.

### API Security
All protected routes must use the `checkPermission` utility.
See [references/api-patterns.md](references/api-patterns.md) for implementation patterns including:
- Security Middleware usage
- Transactional updates with auditing
- Validation logic

## Quick Start Checklist

When implementing a new admin feature:

1.  **Define Permissions**: Does the feature need a new permission (e.g., `reports:view`)?
    - If yes, add it to the `Permission` table via migration or seed.
2.  **Protect the API**:
    - Import `checkPermission`.
    - Call `await checkPermission('required:action')` at the start of the route.
3.  **Validate Inputs**:
    - Use Zod schemas for request bodies.
4.  **Audit Changes**:
    - If modifying data (CREATE/UPDATE/DELETE), use `prisma.$transaction`.
    - Create a `RoleAuditLog` entry (or similar audit log if extending beyond roles).

## Common Tasks

### Checking Permissions in API
```typescript
const { authorized } = await checkPermission('roles:view');
if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
```

### Accessing User Info
The `checkPermission` function returns the authenticated user:
```typescript
const { user } = await checkPermission('roles:manage');
console.log('Action performed by:', user.id);
```

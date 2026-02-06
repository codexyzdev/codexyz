## Qué cambió (lo que está en “Changes”)
### Base común
- Se agregó un “layer” de respuestas API consistente en [response.ts](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/lib/api/response.ts#L1-L75) (helpers `ok/created/fail` + códigos de error) y helper para errores Zod.
- Se reforzó la autorización server-side con Supabase SSR + DB en [api-protection.ts](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/features/auth/utils/api-protection.ts#L1-L69):
  - `checkPermission(permission)` devuelve un resultado tipado `{ authorized, status, error, user }`.
  - `requirePermission(permission)` centraliza el 401/403 usando `unauthorized/forbidden`.

### Endpoints admin
- [admin/permissions](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/admin/permissions/route.ts#L1-L57): GET con validación de query (`module`) y respuesta agrupada por `module`.
- [admin/roles](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/admin/roles/route.ts#L1-L178):
  - GET con paginación/búsqueda (`page/pageSize/q`) y conteo.
  - POST crea rol + crea log de auditoría (`roleAuditLog`) en una transacción.
- [admin/roles/[id]](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/admin/roles/%5Bid%5D/route.ts#L1-L211):
  - PUT actualiza rol en transacción y genera log de auditoría con cambios.
  - DELETE valida: existe, no es system, no tiene usuarios; registra auditoría y borra.
- [admin/users](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/admin/users/route.ts#L1-L126): GET con paginación/búsqueda y filtro `roleId`, y sanitiza campos de usuario.
- [admin/users/[id]/role](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/admin/users/%5Bid%5D/role/route.ts#L1-L97): PUT para cambiar rol:
  - valida input (`roleId` o `roleName`),
  - busca rol en Prisma,
  - sincroniza metadata en Supabase Auth (admin) y actualiza `users.roleId`.

### Auth y perfil
- [auth/login](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/auth/login/route.ts#L1-L66): manejo de errores de Supabase más amigable y logging.
- [auth/sign-up](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/auth/sign-up/route.ts#L1-L142): signup “admin” (service role) que:
  - valida rol en DB,
  - crea usuario en Supabase Auth con metadata,
  - upsert en Prisma y rollback en Auth si falla Prisma.
- [users/profile](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/users/profile/route.ts#L1-L69): GET del perfil desde DB + rol/permisos, con auth SSR.
- [users/assign-role](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/app/api/users/assign-role/route.ts#L1-L92): endpoint “legacy” para asignar rol (misma idea que el admin) y sincronizar metadata.

### Documento
- Se añadió una guía de auditoría/estandarización en [.trae doc](file:///c:/Users/Codexyz.dev/Desktop/Development/template-app/.trae/documents/Auditor%C3%ADa%20y%20estandarizaci%C3%B3n%20de%20APIs%20(Next.js).md#L1-L66) explicando objetivos (contrato consistente, paginación, logging, seguridad).

## Plan para terminar la estandarización (sin cambiar comportamiento)
1. Migrar rutas para usar `requirePermission()` y `lib/api/response` de forma consistente (mismo envelope de error/éxito).
2. Corregir detalles de calidad en `admin/roles/[id]` (cálculo de cambios cuando `name/description` vienen `undefined`, y formateo/consistencia de `details`).
3. Endurecer runtime/seguridad: añadir `export const runtime = 'nodejs'` donde se usa Prisma/Supabase admin; revisar variables `NEXT_PUBLIC_*` en servidor.
4. Validar con lint/build y pruebas manuales de endpoints críticos (roles CRUD, users list, change role, login/signup/profile).
## Alcance
- Revisar y mejorar los route handlers en `app/api/**/route.ts` usando principios de diseño REST/GraphQL.
- Alinear implementación con buenas prácticas de Next.js 16 + React 19 (rendimiento, serialización, logging, auth server-side).

## Hallazgos (estado actual)
- Hay 8 endpoints en App Router (no existe `pages/api`).
- AuthN/AuthZ: Supabase SSR + `checkPermission('...')` para permisos.
- Validación: Zod en varias rutas, pero el formato de errores cambia (`z.treeifyError` vs `error.format()`).
- Contratos inconsistentes: a veces devuelve lista cruda, a veces sanitizada; errores sin “envelope” común; mensajes mixtos ES/EN.
- Listados admin sin paginación/filtrado (riesgo de payload grande y peor performance).
- Logging no homogéneo (mezcla `console.error` y `logger`) y se loguean datos potencialmente sensibles (ej. email).

## Objetivos de diseño
- Contrato consistente para éxito y error (misma forma en todas las rutas).
- Semántica REST más clara (recursos/nombres, métodos HTTP).
- Paginación + filtros en endpoints de colección.
- Seguridad y observabilidad: no filtrar PII, logs estructurados, y errores con códigos.
- Next.js: rutas dinámicas bien marcadas, evitar waterfalls innecesarios, minimizar serialización al cliente.

## Implementación propuesta
1) Estandarizar respuestas y errores
- Crear un pequeño “API response layer” (helpers) para:
  - `ok(data, init?)` / `created(data)` / `noContent()`.
  - `badRequest(code, message, details?)`, `unauthorized()`, `forbidden()`, `notFound()`, `conflict()`, `internal()`.
- Unificar error shape, por ejemplo:
  - `{ ok: true, data }`
  - `{ ok: false, error: { code, message, details? } }`
- Unificar Zod errors (elegir 1 formato) y aplicar también a query params.

2) Normalizar autorización
- Reajustar `checkPermission` para que su retorno sea estable y fácil de usar sin destructuring frágil.
- Crear helper tipo `requirePermission('x')` que centralice la respuesta 401/403 y reduzca repetición.

3) Paginación y filtrado en listados admin
- `GET /api/admin/users`: soportar `page`, `pageSize`, `q` (y/o `roleId`). Responder con `{ items, pageInfo }`.
- `GET /api/admin/roles`: soportar paginación (y opcional búsqueda por nombre).
- `GET /api/admin/permissions`: si crece mucho, paginar o mantener agrupado pero con opción `module`.

4) Endpoints “action-based” y compatibilidad
- Proponer rutas más REST (ej. `PUT /api/admin/users/:id/role` en vez de `/api/users/assign-role`).
- Mantener el endpoint actual como alias temporal para no romper el frontend, y deprecarlo internamente.

5) Seguridad, serialización y logging
- Reemplazar `console.error` por `logger.error` en todos los handlers.
- Evitar loguear PII (email/teléfono) o al menos enmascararlo.
- Asegurar que `users/profile` devuelva una versión sanitizada (solo campos necesarios + rol/permisos si realmente se usa).

6) Next.js / performance
- Confirmar y estandarizar el “dynamic behavior” de todas las rutas que tocan DB (`connection()` o alternativa equivalente).
- Añadir `export const runtime = 'nodejs'` en handlers que usan Prisma/Supabase admin (para evitar despliegues edge accidentales).
- Aplicar `Promise.all` donde sea seguro (ej. parseo de body + lecturas DB) sin hacer queries “inútiles” si el usuario no está autorizado.

## Verificación
- Ejecutar `npm run lint` y `npm run build` para asegurar typings y build.
- Probar manualmente rutas críticas (login/signup/profile, roles CRUD) y verificar:
  - Status codes correctos
  - Formato de respuesta consistente
  - Paginación funcionando
  - Sin logs de datos sensibles

## Entregables
- Helpers de respuesta/errores reutilizables.
- Rutas API migradas al contrato común.
- Listados admin con paginación.
- Logging y auth normalizados.
- Notas breves de compatibilidad/deprecación para el endpoint de asignación de rol.

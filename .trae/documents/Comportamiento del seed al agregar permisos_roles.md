## Respuesta
- Explicar cómo prisma/seed.ts usa upsert para permisos y roles, qué se conserva y qué se sobrescribe.
- Aclarar casos borde: roles “system” resembrados, permisos renombrados/eliminados en código, y posibles restos en DB.

## Si luego quieres ejecutarlo (sin hacerlo ahora)
- Enumerar los pasos seguros: agregar permiso/rol en constantes, correr seed, y verificar en UI/API.
- Indicar qué revisar para evitar sorpresas (roles system vs roles creados por usuarios).
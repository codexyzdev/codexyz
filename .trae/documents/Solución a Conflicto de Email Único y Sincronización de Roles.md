### Diagnóstico del Error
El error `Unique constraint failed on the fields: ('email')` en `prisma.users.upsert` indica que estás intentando insertar o actualizar un registro que viola la restricción única del campo `email` en la tabla `Users`.

**Causa Raíz:**
1.  **Race Condition (Condición de Carrera):** Aunque desactivaste el trigger, es posible que el usuario ya exista en la tabla `Users` (tal vez de intentos anteriores o triggers residuales) pero con un ID diferente, o que el `upsert` esté fallando al intentar actualizar un registro existente que tiene el mismo email pero un ID diferente al que estás proporcionando (el `userId` de Auth).
2.  **Conflicto de IDs:** Estás usando el `userId` que viene de Supabase Auth como la clave primaria (`id`) en tu tabla `Users`. Si ya existe un usuario con ese `email` en tu tabla `Users` pero con un `id` diferente (por ejemplo, generado anteriormente de otra forma), el `upsert` fallará porque intenta poner ese email en un registro con el NUEVO `id` de Auth, chocando con el registro viejo.

**Sobre tu observación de los Roles:**
Tienes toda la razón, y el código ya refleja parcialmente esto. En el archivo `route.ts` (líneas 31-33 y 78/86), ya estás buscando el rol por nombre (`prisma.role.findUnique`) y conectándolo por ID (`connect: { id: roleRecord.id }`). **Esto es correcto según tu nuevo esquema.** El problema actual no es la relación con el rol, sino la duplicidad del email.

### Plan de Solución

Para solucionar el conflicto de `email` único y asegurar que la creación sea robusta:

1.  **Verificar existencia por Email antes del Upsert:**
    Antes de intentar el `upsert` con el ID de Auth, debemos verificar si ya existe un usuario con ese `email` en nuestra base de datos `Users`.

2.  **Manejar el caso "Usuario Existente":**
    *   Si existe un usuario con ese email: Debemos actualizar ese registro existente con el nuevo `id` de Auth (si es posible/seguro) o simplemente actualizar sus datos usando su ID existente.
    *   *Nota:* Cambiar el ID de un registro existente es delicado. Una estrategia más segura para sincronizar Auth y DB es usar el `email` como clave de búsqueda secundaria si el ID no coincide.

3.  **Refinar la lógica del `upsert`:**
    Modificaré el `route.ts` para que maneje explícitamente la lógica de "si existe por email, actualiza; si no, crea".

**Estrategia Propuesta (Código):**
En lugar de confiar ciegamente en `upsert` por `id`, haremos:
1.  Buscar usuario por `email`.
2.  Si existe: Actualizarlo (y opcionalmente vincularlo al nuevo ID de Auth si tu lógica de negocio lo permite, aunque normalmente el ID de Auth es la fuente de verdad). *Sin embargo, como el ID de Auth es inmutable y viene de Supabase, lo ideal es que tu tabla `Users` use ese mismo ID.*
3.  Si NO existe: Crear el usuario con el ID de Auth.

**Corrección Específica para tu Error:**
El error dice que el email ya está tomado. Lo más probable es que tengas datos "basura" o antiguos en tu tabla `Users` con ese email.
El `upsert` actual intenta: "Busca por ID Auth. Si no encuentra, CREA con ID Auth y Email X". -> Aquí falla porque Email X ya existe en OTRO registro con OTRO ID.

**Solución:**
Modificar el `route.ts` para manejar este conflicto de email. Si el email ya existe, debemos decidir qué hacer. Lo lógico es actualizar el registro existente para que coincida con el nuevo usuario de Auth (aunque esto implica que el ID de base de datos y el ID de Auth podrían diferir si no los sincronizamos).
**Mejor enfoque para "Full Stack" con Supabase:** El ID de la tabla `Users` DEBE ser igual al ID de `auth.users`. Si tienes un registro viejo con el mismo email pero diferente ID, **ese registro viejo es el problema**.

**Pasos a ejecutar:**
1.  Limpiar el usuario problemático de la base de datos (si es un entorno de desarrollo/pruebas) O modificar el código para que borre el registro huérfano antes de crear el nuevo.
2.  Dado que estás en desarrollo (veo `localhost`), te propongo limpiar la inconsistencia automáticamente en el código: "Si encuentro un usuario con este email pero diferente ID, lo elimino (o actualizo su ID si fuera posible, pero borrar es más limpio para Auth) y luego creo el nuevo correctamente vinculado".

**Plan Detallado:**
1.  Modificar `app/api/auth/sign-up/route.ts`:
    *   Antes del `upsert`, buscar si existe un usuario con el mismo `email`.
    *   Si existe y su ID es diferente al `userId` (el de Auth), significa que hay un registro "zombie".
    *   Eliminar ese registro zombie de `prisma.users`.
    *   Proceder con el `upsert`.

Esto auto-corregirá tu base de datos y evitará el error `UniqueConstraintViolation`.
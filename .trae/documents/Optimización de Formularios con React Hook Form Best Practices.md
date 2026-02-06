He revisado los formularios en `role-dialog.tsx`, `sign-up.tsx` y `login-form.tsx` utilizando la skill `react-hook-form-zod`.

### Hallazgos
1.  **`role-dialog.tsx`**: Implementa correctamente `register` para inputs simples (mejor rendimiento) y `Controller` para componentes complejos (`PermissionMatrix`). **Estado: Óptimo.**
2.  **`sign-up.tsx` y `login-form.tsx`**: Utilizan `Controller` para **todos** los campos, incluyendo inputs simples de texto. La skill recomienda explícitamente usar `register` para inputs nativos/simples para evitar re-renderizados innecesarios y mejorar el rendimiento.

### Plan de Acción
Refactorizar los formularios de autenticación para seguir las mejores prácticas de rendimiento:

1.  **`features/auth/components/sign-up.tsx`**:
    *   Reemplazar `Controller` por `register` en los campos: `fullName`, `email`, `password`, `phone`.
    *   Mantener `Controller` para el campo `role` (ya que es un `Select` de UI component que requiere control).
    *   Actualizar el manejo de errores para leer directamente de `formState.errors`.

2.  **`features/auth/components/login-form.tsx`**:
    *   Reemplazar `Controller` por `register` en los campos: `email`, `password`.
    *   Actualizar el manejo de errores para leer directamente de `formState.errors`.

Esta optimización reducirá la complejidad del código y mejorará el rendimiento de los formularios al evitar renderizados controlados donde no son necesarios.
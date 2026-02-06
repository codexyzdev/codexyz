Para realizar un análisis profundo de tu proyecto utilizando las capacidades de `ui-ux-pro-max`, propongo el siguiente plan de ejecución:

## 1. Auditoría del Sistema de Diseño Actual
*   **Analizar Configuración Base**: Revisaré `components.json` y `app/globals.css` para entender tu paleta de colores actual, radios de borde y configuración de temas (claro/oscuro).
*   **Verificar Tipografía**: Identificaré las fuentes configuradas y si siguen las reglas de "font pairing" (títulos vs cuerpo).

## 2. Revisión de Componentes Clave (UI Audit)
Utilizaré las reglas de la skill para evaluar componentes críticos en `features/common/ui` y `features/auth`:
*   **Accesibilidad (Prioridad 1)**: Verificar contrastes de color, uso de `aria-labels`, y estados de foco visibles en botones e inputs.
*   **Interacción (Prioridad 2)**: Comprobar que los elementos interactivos tengan `cursor-pointer`, estados `hover` suaves y tamaños de toque adecuados (>44px).
*   **Feedback Visual**: Asegurar que formularios como el Login tengan estados de carga (`loading states`) y mensajes de error claros.

## 3. Análisis de Layout y Responsividad
*   Revisar `app/layout.tsx` y `app/page.tsx` para confirmar la estructura semántica HTML.
*   Verificar que las clases de utilidad de Tailwind sigan el enfoque "Mobile First" y no haya desbordamientos horizontales.

## 4. Informe de Mejoras
*   Generaré un reporte con los hallazgos.
*   Crearé una lista de tareas (TODOs) específicas para aplicar las correcciones sugeridas por la skill (ej: "Corregir contraste en modo oscuro", "Añadir transiciones a botones").

¿Te parece bien comenzar con este análisis?
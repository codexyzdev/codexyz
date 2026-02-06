Esta skill tiene como objetivo actuar como un **Líder de Sistemas de Diseño** experto. Su función principal es analizar proyectos de **Stitch** y sintetizar un "Sistema de Diseño Semántico" en un archivo llamado `DESIGN.md`.

Aquí están los detalles clave de su funcionamiento:

1.  **Objetivo Principal**: Crear un archivo `DESIGN.md` que sirva como "fuente de verdad" para el diseño del proyecto.
2.  **Análisis de Recursos**:
    *   Se conecta al servidor MCP de Stitch para recuperar metadatos de proyectos y pantallas.
    *   Analiza capturas de pantalla y código HTML para capturar la "vibra" o atmósfera visual.
    *   Extrae configuraciones técnicas (como clases de Tailwind) y las traduce a descripciones de diseño.
3.  **Síntesis de Información**:
    *   **Tema Visual y Atmósfera**: Describe el estado de ánimo (ej. "Minimalista", "Aéreo").
    *   **Paleta de Colores**: Lista colores con nombres descriptivos, códigos hexadecimales y roles funcionales.
    *   **Tipografía y Geometría**: Define reglas de fuentes, redondez de bordes ("Pill-shaped", "Sharp") y elevación (sombras).
    *   **Estilos de Componentes**: Documenta cómo deben lucir botones, tarjetas y formularios.
4.  **Utilidad**: Este archivo permite que Stitch (o cualquier desarrollador/IA) genere **nuevas pantallas** que se alineen perfectamente con el lenguaje de diseño existente, asegurando consistencia visual.

En resumen, transforma los activos técnicos de un proyecto en una guía de estilo legible y estructurada para mantener la coherencia en el desarrollo futuro.
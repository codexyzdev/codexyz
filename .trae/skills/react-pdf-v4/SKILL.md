---
name: 'react-pdf-v4'
description: 'Generates PDF documents using React components. Invoke when user wants to create, style, or render PDFs in React (v4).'
---

# React PDF v4

React-pdf is a React renderer for creating PDF files on the browser and server.

## Installation

```bash
pnpm install @react-pdf/renderer
```

## Basic Usage

The most fundamental way to use react-pdf is by composing a `Document` with `Page`, `View`, and `Text` components.

```jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
```

## Key Components

- **Document**: The root of the PDF document.
- **Page**: Represents a single page. Accepts `size` (e.g., "A4"), `orientation`, and `style`.
- **View**: The basic container, similar to `div` or React Native's `View`. Supports Flexbox.
- **Text**: Displays text. Supports nesting for inline styling.
- **Image**: Displays images (supports URL, Blob, Buffer).
- **Link**: Hyperlinks to URLs or other destinations in the PDF.
- **Note**: Adds annotations/notes.
- **Canvas**: For drawing vector graphics.

## Styling

Styling is done using a subset of CSS properties, primarily Flexbox for layout.

### Using `StyleSheet`

```javascript
import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Helvetica', // Built-in font
  },
});
```

### Supported Properties (Partial List)

- **Layout**: `display`, `flex`, `flexDirection`, `flexWrap`, `alignItems`, `justifyContent`, `margin`, `padding`, `width`, `height`.
- **Typography**: `color`, `fontFamily`, `fontSize`, `fontStyle`, `fontWeight`, `letterSpacing`, `lineHeight`, `textAlign`, `textDecoration`.
- **Background**: `backgroundColor`.
- **Borders**: `border`, `borderColor`, `borderRadius`, `borderStyle`, `borderWidth`.

## Rendering

### Client-side (Browser)

Use `PDFViewer` to display the PDF on the page, or `PDFDownloadLink` to create a download button.

```jsx
import { PDFViewer } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer width="100%" height="600">
    <MyDocument />
  </PDFViewer>
);
```

### Server-side (Node.js)

```javascript
import ReactPDF from '@react-pdf/renderer';

ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
// OR render to stream
// ReactPDF.renderToStream(<MyDocument />);
```

## Fonts

You can register custom fonts using `Font.register`:

```javascript
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});
```

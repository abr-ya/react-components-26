# Card

A set of layout primitives for grouping content with a header, description, body, and footer.

## Usage

Import the library styles once in your application:

```tsx
import 'component-lib-26/style.css'
```

Then compose the card parts you need:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'component-lib-26'

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project status</CardTitle>
        <CardDescription>Updated a few minutes ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The current build is passing.</p>
      </CardContent>
      <CardFooter>
        <p>Ready for review</p>
      </CardFooter>
    </Card>
  )
}
```

## Components

### Card

The outer container. It renders a `div` with border, background, foreground, radius, and shadow styles.

### CardHeader

Container for the title and description.

### CardTitle

Card heading. It renders an `h3`.

### CardDescription

Supporting text for the card heading. It renders a `p`.

### CardContent

The main content area.

### CardFooter

Footer area for actions, metadata, or supporting content.

## Props

| Component | Props |
|-----------|-------|
| `Card` | Standard `div` props, including `className` |
| `CardHeader` | Standard `div` props, including `className` |
| `CardTitle` | Props are forwarded to the rendered heading, including `className` |
| `CardDescription` | Props are forwarded to the rendered paragraph, including `className` |
| `CardContent` | Standard `div` props, including `className` |
| `CardFooter` | Standard `div` props, including `className` |

## Accessibility

- The card primitives do not add ARIA roles by default.
- Use semantic wrappers such as `article` or `section` around the card when the surrounding page structure needs them.
- `CardTitle` renders an `h3`; make sure the heading level fits the surrounding document outline.
- Standard `aria-*` attributes can be passed through to the rendered elements.

## Source

`src/components/ui/card.tsx`

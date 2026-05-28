# ThemeToggle

An icon button that cycles between light, dark, and system theme modes.

## Usage

Import the library styles once in your application:

```tsx
import 'component-lib-26/style.css'
```

`ThemeToggle` must be rendered inside `ThemeProvider` because it reads and updates the theme context.

```tsx
import { ThemeProvider, ThemeToggle } from 'component-lib-26'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ThemeToggle />
    </ThemeProvider>
  )
}
```

## Behavior

The toggle cycles through the modes in this order:

```text
light -> dark -> system -> light
```

The displayed icon follows the current selected mode:

| Theme | Icon |
|-------|------|
| `light` | Sun |
| `dark` | Moon |
| `system` | Sun |

The component uses the shared `Button` component with `variant="ghost"` and `size="icon"`.

## Accessibility

- The button includes visually hidden text: `Toggle theme`.
- It supports keyboard activation through the underlying native `button`.

## Related

- `ThemeProvider`
- [`Button`](./button.md)

## Source

`src/components/common/theme-toggle.tsx`

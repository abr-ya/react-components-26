# Components

This section documents the reusable components available in Component Library 26.

## Component List

- **Button** — a composable button with style variants and size variants
- **Card** — a content container with header, content, footer, title, and description parts
- **PeakHoursRangeSelector** — an interactive selector for peak-hour ranges across a 24-hour day
- **ThemeToggle** — a theme switcher for `dark`, `light`, and `system` modes

## Usage

Import the generated stylesheet once in your application:

```tsx
import 'component-lib-26/dist/style.css'
```

Then import the components you need:

```tsx
import { Button, Card } from 'component-lib-26'
```

Base UI components use dark theme tokens by default and do not require `ThemeProvider`.

Use `ThemeProvider` when your application needs runtime theme control:

```tsx
import { ThemeProvider } from 'component-lib-26'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      {/* your app */}
    </ThemeProvider>
  )
}
```

`ThemeToggle` must be rendered inside `ThemeProvider` because it uses the theme context.

Each component page includes usage examples and prop details.

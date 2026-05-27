# Component Library 26

A React component library built with TypeScript, Vite, Tailwind CSS 4, Radix primitives, and Vitest.

## Getting Started

```bash
npm install
npm run dev
```

Use the development playground to preview components locally.

## Library Build

```bash
npm run build
```

The public library entry point is `src/lib/index.ts`. Vite builds ESM and CJS bundles into `dist/`.

## What's Inside

- **React 18** + **TypeScript**
- **Vite 6** library build: ESM + CJS
- **Tailwind CSS 4** + **@tailwindcss/vite**
- **Radix Slot** for composable primitives
- **class-variance-authority** for component variants
- **lucide-react** and **Radix Icons**
- **Vitest** + **Testing Library**
- **VitePress** documentation
- **ESLint** + **Prettier**

## Theme Support

The library is dark by default. Theme colors are defined with CSS variables in `src/index.css`, so base components can render without a React provider as long as the library stylesheet is loaded.

Use `ThemeProvider` when an application needs explicit theme control:

- `ThemeProvider` manages the active theme and stores the selected value in `localStorage`.
- `useTheme` exposes `theme`, `setTheme`, `resolvedTheme`, and `isDark`.
- `ThemeToggle` switches between available theme modes and must be rendered inside `ThemeProvider`.

Supported theme modes:

- `dark`
- `light`
- `system`

## Usage

Import the library stylesheet once:

```tsx
import 'component-lib-26/dist/style.css'
```

Import components from the package:

```tsx
import { Button, Card, ThemeProvider } from 'component-lib-26'
```

Wrap your app only if you want runtime theme control:

```tsx
export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      {/* your app */}
    </ThemeProvider>
  )
}
```

## Structure

```text
src/
├── components/
│   ├── ui/          # UI primitives, including Button and Card
│   └── common/      # Shared components, including ThemeToggle
├── lib/             # Public exports, utilities, and types
├── providers/       # ThemeProvider and useTheme
├── test/            # Test setup
├── App.tsx          # Development playground
├── main.tsx         # Development entry point
└── index.css        # Tailwind import and theme tokens
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development playground |
| `npm run build` | Build the component library |
| `npm run preview` | Preview the built app |
| `npm run docs:dev` | Start the documentation server |
| `npm run docs:build` | Build the documentation |
| `npm run docs:preview` | Preview the built documentation |
| `npm run test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:ui` | Start Vitest UI |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format files with Prettier |
| `npm run format:check` | Check formatting |

## Documentation

- [Components](/components/intro)
- [Initial Setup](./01-init.md)
- [Update and Theme Changes](./02-update-and-theme.md)

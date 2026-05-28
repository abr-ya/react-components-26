# Component Library 26

A React component library built with TypeScript, Vite, Tailwind CSS, Radix primitives, and Vitest.

## Getting Started

```bash
npm install
npm run dev
```

## Library Build

```bash
npm run build
```

The library entry point is `src/lib/index.ts`. Vite builds ESM and CJS bundles into `dist/`, and TypeScript emits declarations into `dist/types/`.

## Build a Local Package File

Build the library and create a local npm tarball:

```bash
npm run build
npm pack
```

This creates a file like:

```text
component-lib-26-0.0.0.tgz
```

Install that file in another project:

```bash
npm install ../react-components-26/component-lib-26-0.0.0.tgz
```

Use the actual relative or absolute path to the generated `.tgz` file from your target project.

## Usage

Import the library styles once in your app:

```tsx
import 'component-lib-26/style.css'
```

Then import components from the package:

```tsx
import { Button, Card } from 'component-lib-26'
```

Components use a dark theme by default through CSS variables. They work without a provider as long as the library CSS is loaded.

To control the active theme, wrap your app with `ThemeProvider`:

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

`ThemeProvider` supports `dark`, `light`, and `system` themes. `ThemeToggle` requires `ThemeProvider`.

## What's Inside

- **React 18** + **TypeScript**
- **Vite 6** library build: ESM + CJS
- **Tailwind CSS 4** theme tokens
- **Radix Slot** and **class-variance-authority** for composable components
- **lucide-react** and **Radix Icons**
- **Vitest** + **Testing Library** for tests
- **VitePress** documentation
- **ESLint** + **Prettier** for code quality

## Structure

```text
src/
├── components/
│   ├── common/      # Shared components, including ThemeToggle
│   └── ui/          # UI primitives, including Button and Card
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
| `npm run docs:dev` | Start VitePress documentation |
| `npm run docs:build` | Build VitePress documentation |
| `npm run docs:preview` | Preview built documentation |
| `npm run test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:ui` | Start Vitest UI |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format files with Prettier |
| `npm run format:check` | Check formatting |

## Documentation

- Full guide: [`docs/01_Start.md`](./docs/01_Start.md)
- VitePress docs: [`docs/index.md`](./docs/index.md)

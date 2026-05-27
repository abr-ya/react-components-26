# Component Library — Guide

## 🚀 Project Start

### What Has Been Done

1. **Created the basic project structure**
   - React 18 + TypeScript
   - Vite 6 (library mode)
   - Tailwind CSS 3
   - Lucide Icons

### Installed Packages

#### Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.453.0",
  "tailwind-merge": "^2.5.4"
}
```

#### Dev Dependencies
```json
{
  "vite": "^6.0.1",
  "typescript": "^5.6.3",
  "@vitejs/plugin-react": "^4.3.3",
  "vite-plugin-dts": "^4.2.1",
  "tailwindcss": "^3.4.14",
  "@tailwindcss/vite": "^4.0.0",
  "@types/react": "^18.3.12",
  "@types/react-dom": "^18.3.1",
  "vitest": "^2.1.4",
  "@testing-library/react": "^16.0.1",
  "eslint": "^8.57.1",
  "@typescript-eslint/eslint-plugin": "^8.12.0",
  "@typescript-eslint/parser": "^8.12.0",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.14",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.2.1",
  "prettier": "^3.3.3",
  "husky": "^9.1.6",
  "lint-staged": "^15.2.10"
}
```

---

## 📁 Project Structure

```
component-lib/
├── src/
│   ├── components/      # Library components
│   ├── lib/             # Utilities and shared files
│   ├── test/            # Tests
│   ├── App.tsx          # Usage example (for dev)
│   ├── main.tsx         # Dev entry point
│   └── index.css        # Global styles + Tailwind
├── docs/                # Documentation
├── dist/                # Built library (generated)
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── package.json
└── README.md
```

---

## 🛠 How to Continue

### 1. Create a New Component

**Steps:**
1. Create a folder in `src/components/` using the component name in PascalCase
2. Create a `ComponentName.tsx` file inside it
3. Add an export in `src/lib/index.ts`

**Example:**
```bash
# Create a button
mkdir src/components/Button
touch src/components/Button/Button.tsx
```

```tsx
// src/components/Button/Button.tsx
import React from 'react'
import { cn } from '@lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center rounded font-medium transition-colors'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
```

4. Add the export in `src/lib/index.ts`:
```tsx
export * from '@components/Button'
```

---

### 2. Write Tests

**Where to write them:** `src/components/[ComponentName]/__tests__/`

**Test example:**
```tsx
// src/components/Button/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vitest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

**Test commands:**
```bash
npm run test        # Run tests
npm run test:ui     # Run tests with UI
npm run test:coverage  # Run tests with coverage
```

---

### 3. Create Component Documentation

**Options:**

**a) Storybook (recommended for libraries)**
```bash
npx storybook@latest init
```

**b) Vitest + Vite Docs (quick start)**
Create a page in `docs/components/`:
```md
# Button

A button for user interaction.

## Example

```tsx
import { Button } from 'component-lib'

<Button variant="primary" size="md">
  Click me
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary'` | `'primary'` | Button style |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| onClick | `() => void` | - | Click handler |

## Accessibility

The button supports keyboard navigation (Enter, Space).
```

---

### 4. Portable Build

**Build command:**
```bash
npm run build
```

**What happens:**
1. TypeScript compiles the code → `dist/types/`
2. Vite builds the library → `dist/index.es.js` + `dist/index.cjs.js`

**Build structure:**
```
dist/
├── index.es.js    # ESM version
├── index.cjs.js   # CJS version
└── types/         # TypeScript types (.d.ts)
```

**package.json for publishing (if you plan to publish to npm):**
```json
{
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.es.js",
  "types": "./dist/types/index.d.ts",
  "files": ["dist"]
}
```

---

## 📝 Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (for testing components) |
| `npm run build` | Build the library for production |
| `npm run preview` | Preview the built library |
| `npm run lint` | Check code for errors |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage |

---

## ✅ Pre-Commit Checklist

1. [ ] `npm run lint:fix` passes successfully
2. [ ] `npm run format` has been applied to all files
3. [ ] `npm run test` is green
4. [ ] `npm run build` completes without errors
5. [ ] Tests have been added for new components
6. [ ] Documentation has been updated

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Vitest Documentation](https://vitest.dev)
- [ESLint Documentation](https://eslint.org)
- [Prettier Documentation](https://prettier.io)

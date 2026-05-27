# Update and Theme Changes

This document summarizes the main changes made after the previous commit. The update focused on making the project buildable as a component library, aligning dependency versions, adding a minimal test baseline, and changing the theme model so components are dark by default while still allowing controlled theme switching.

## Dependency Alignment

The project had a dependency conflict around Vite. The package manifest was asking for Vite 8, while the installed documentation and testing stack expected older Vite versions:

- `vitepress@1.x` uses Vue tooling that expects Vite 5 or Vite 6.
- `vitest@2.x` expected Vite 5.
- `@vitejs/plugin-react@6.x` and `@rolldown/plugin-babel` were aligned with Vite 8 and newer Node requirements.

The dependency set was adjusted to a more stable Vite 6-based setup:

- `vite` was moved to `^6.4.2`.
- `@vitejs/plugin-react` was moved to `^4.7.0`.
- `vitest` was moved to `^3.2.4`.
- `@rolldown/plugin-babel` and `babel-plugin-react-compiler` were removed because they were not needed for the current library build and pulled the project toward Vite 8.
- `@vitest/ui`, `@vitest/coverage-v8`, `jsdom`, and `@testing-library/react` were added because the scripts and test setup depend on them.

React was kept on React 18 after VitePress dependencies reported peer warnings with React 19 through DocSearch. This keeps the library closer to the compatibility range expected by the current documentation stack.

## Test Setup

The initial `npm run test` run failed because Vitest did not find any test files. A minimal test was added for the `cn` utility:

```text
src/lib/utils.test.ts
```

The test verifies that `cn` joins class names and resolves conflicting Tailwind classes through `tailwind-merge`.

The shared test setup was also cleaned up:

- `src/test/setup.ts` now imports only `afterEach` from Vitest.
- `cleanup` from `@testing-library/react` runs after every test.
- The unused `expect` import was removed.

## Build Fixes

Several TypeScript build errors came from exports and aliases that did not match the actual source tree.

The following issues were fixed:

- Removed exports for `@components/layout` because there is no `src/components/layout` module yet.
- Removed `./layout` from `src/components/index.ts`.
- Added bare TypeScript path aliases for `@components`, `@lib`, `@hooks`, and `@providers`.
- Changed the development entry import from `./App.tsx` to `./App`, because TypeScript does not allow `.tsx` import extensions unless `allowImportingTsExtensions` is enabled.
- Exported providers from the public library entry point so consumers can import `ThemeProvider` and `useTheme` directly from the package.

After these changes, `npm run build` completed successfully.

## Public Entry Point

The main library entry point is now focused on the modules that exist and are intended for consumers:

```ts
export * from '@components/ui'
export * from '@components/common'
export * from '@providers'

export { cn } from '@lib/utils'
export { cva } from 'class-variance-authority'

export type { ClassNameProps } from '@lib/types'
export type { VariantProps } from 'class-variance-authority'
```

This gives consumers access to UI components, shared components such as `ThemeToggle`, theme utilities, `cn`, and variant typing.

## Theme Model

The theme model was changed so the library is dark by default without requiring a React provider.

Before this update, the theme provider was the main mechanism that added or removed the `dark` class on `document.documentElement`. That meant the visual behavior was closely tied to runtime theme state.

Now the CSS tokens make the default theme dark:

- `:root` contains the dark token values.
- `.dark` also contains the dark token values.
- `.light` contains the light token values.
- Tailwind's custom dark variant treats the document as dark by default unless `.light` is present.

This means basic components such as `Button` and `Card` can render in the dark theme without `ThemeProvider`, as long as the library stylesheet is loaded.

## ThemeProvider

`ThemeProvider` is now optional and is used only when the consuming app wants to control the active theme.

It supports:

- `dark`
- `light`
- `system`

It also accepts:

- `defaultTheme`, which defaults to `dark`
- `storageKey`, which defaults to `component-lib-theme`

The provider writes the resolved theme class to `document.documentElement`:

- `dark` applies the dark theme.
- `light` applies the light theme.
- `system` follows `prefers-color-scheme`.

The current context value exposes:

- `theme`
- `setTheme`
- `resolvedTheme`
- `isDark`

`ThemeToggle` still requires `ThemeProvider`, because it calls `useTheme`. Regular UI components do not require the provider.

## CSS Usage

Consumers should import the generated stylesheet once:

```tsx
import 'component-lib-26/dist/style.css'
```

With that stylesheet loaded:

- Components render with the dark theme by default.
- Adding `.light` to the root switches tokens to the light theme.
- Using `ThemeProvider` manages the root class automatically.

## Documentation and README

The README was rewritten in English and updated to describe the current project state:

- React 18
- Vite 6
- Tailwind CSS 4
- VitePress documentation
- dark-by-default theme behavior
- optional `ThemeProvider`
- current npm scripts

The previous Russian README content and older package descriptions were replaced with the current library usage model.

## Remaining Follow-Ups

The project is now buildable, but a few library-packaging tasks are still worth doing before publishing:

- Add `main`, `module`, `types`, `exports`, and `files` fields to `package.json`.
- Decide whether `react` and `react-dom` should move to `peerDependencies` for package publishing.
- Add declaration generation with `vite-plugin-dts` or a dedicated build TypeScript config.
- Document the CSS import and theme contract in the VitePress docs.
- Add component-level tests for `Button`, `Card`, and `ThemeToggle`.

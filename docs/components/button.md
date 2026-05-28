# Button

A flexible button component with style variants, sizes, and optional Radix Slot composition.

## Usage

Import the library styles once in your application:

```tsx
import 'component-lib-26/style.css'
```

Then import and render the component:

```tsx
import { Button } from 'component-lib-26'

function App() {
  return <Button>Click me</Button>
}
```

## Variants

### Default

```tsx
<Button>Button</Button>
```

### Destructive

```tsx
<Button variant="destructive">Delete</Button>
```

### Outline

```tsx
<Button variant="outline">Outline</Button>
```

### Secondary

```tsx
<Button variant="secondary">Secondary</Button>
```

### Ghost

```tsx
<Button variant="ghost">Ghost</Button>
```

### Link

```tsx
<Button variant="link">Link</Button>
```

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Open menu">
  <Icon />
</Button>
<Button size="icon-sm" aria-label="Previous">
  <Icon />
</Button>
<Button size="icon-lg" aria-label="Next">
  <Icon />
</Button>
```

## Rendering Another Element

Use `asChild` to pass the button styles to another element through Radix Slot.

```tsx
<Button asChild>
  <a href="/dashboard">Open dashboard</a>
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Button size |
| `asChild` | `boolean` | `false` | Render the child element instead of a native `button` |
| `className` | `string` | `-` | Additional CSS classes |

The component also accepts the standard props for a native `button` element.

## Accessibility

- Renders a native `button` by default, so keyboard activation works with Enter and Space.
- Supports standard `aria-*` attributes.
- Icon-only buttons should include an accessible name, such as `aria-label`.

## Source

`src/components/ui/button.tsx`

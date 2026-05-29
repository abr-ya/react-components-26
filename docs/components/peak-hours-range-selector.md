# PeakHoursRangeSelector

An interactive range selector for choosing one or more peak-hour intervals across a 24-hour day.

## Usage

Import the library styles once in your application:

```tsx
import 'component-lib-26/style.css'
```

Then keep the selected ranges in state and pass them to the component:

```tsx
import { useState } from 'react'
import { PeakHoursRangeSelector, type PeakHoursValue } from 'component-lib-26'

function App() {
  const [peakHours, setPeakHours] = useState<PeakHoursValue>([
    { start: 8, end: 10 },
    { start: 18, end: 20 },
  ])

  return (
    <PeakHoursRangeSelector
      value={peakHours}
      onChange={setPeakHours}
    />
  )
}
```

Range values are expressed as decimal hours from `0` to `24`. For example, `8.5` means `08:30`.

## Behavior

- Renders a horizontal 24-hour timeline.
- Supports multiple non-overlapping ranges.
- Ranges can be moved by dragging the range body.
- Range start and end can be adjusted with the side handles.
- The add button creates a new range using the configured strategy.
- When `addOnDoubleClick` is enabled, double-clicking an available slot adds a range and double-clicking an existing range removes it.

## Add Range Strategies

The `addRangeStrategy` prop controls where a new range is placed when the add button is pressed.

| Strategy | Description |
|----------|-------------|
| `'largest-gap'` | Places the range in the largest available gap |
| `'first-available'` | Places the range in the first available slot |
| `'preferred-time'` | Tries to place the range near `preferredRange` |

## Example

```tsx
<PeakHoursRangeSelector
  value={peakHours}
  onChange={setPeakHours}
  maxRanges={4}
  step={0.25}
  minDuration={0.5}
  minGap={0.25}
  defaultRangeDuration={1}
  addRangeStrategy="preferred-time"
  preferredRange={{ start: 9, end: 10 }}
  addOnDoubleClick
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `PeakHoursValue` | Required | Selected ranges |
| `onChange` | `(value: PeakHoursValue) => void` | Required | Called when ranges are added, removed, moved, or resized |
| `maxRanges` | `number` | `3` | Maximum number of ranges |
| `step` | `number` | `0.5` | Time snapping step in hours |
| `minDuration` | `number` | `0.5` | Minimum range duration in hours |
| `minGap` | `number` | `0.5` | Minimum gap between ranges in hours |
| `defaultRangeDuration` | `number` | `1` | Duration of newly added ranges in hours |
| `disabled` | `boolean` | `false` | Disables adding, dragging, resizing, and removing ranges |
| `addRangeStrategy` | `'first-available' \| 'preferred-time' \| 'largest-gap'` | `'largest-gap'` | Placement strategy for the add button |
| `preferredRange` | `PeakRange` | `{ start: 8, end: 9 }` | Preferred placement when `addRangeStrategy="preferred-time"` |
| `addOnDoubleClick` | `boolean` | `false` | Enables double-click add and remove behavior |
| `showTimeLabels` | `boolean` | `true` | Shows timeline labels at `00:00`, `06:00`, `12:00`, `18:00`, and `24:00` |
| `showAddButton` | `boolean` | `true` | Shows the add range button |
| `className` | `string` | `-` | Additional CSS classes for the root element |

## Types

```ts
type PeakRange = {
  start: number
  end: number
}

type PeakHoursValue = PeakRange[]

type AddRangeStrategy = 'first-available' | 'preferred-time' | 'largest-gap'
```

## Accessibility

- The add, remove, start-handle, and end-handle controls include accessible labels.
- The component uses native `button` elements for interactive controls.
- Dragging is currently mouse-based; provide an additional form-based editing path when full keyboard range editing is required.

## Related

- [`Button`](./button.md)

## Source

`src/components/common/peak-hours-range-selector.tsx`

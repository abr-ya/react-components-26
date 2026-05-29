import { fireEvent, render, screen } from '@testing-library/react'
import type { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { PeakHoursRangeSelector } from './peak-hours-range-selector'
import type { PeakHoursValue } from './peak-hours-range-selector.types'

const renderSelector = ({
  value = [],
  onChange = vi.fn(),
  ...props
}: Partial<ComponentProps<typeof PeakHoursRangeSelector>> & {
  value?: PeakHoursValue
  onChange?: (value: PeakHoursValue) => void
} = {}) => {
  render(<PeakHoursRangeSelector value={value} onChange={onChange} {...props} />)

  return { onChange }
}

describe('PeakHoursRangeSelector', () => {
  it('renders time labels and selected ranges', () => {
    renderSelector({
      value: [
        { start: 8, end: 10 },
        { start: 18.5, end: 20 },
      ],
    })

    expect(screen.getByText('00:00')).toBeTruthy()
    expect(screen.getByText('12:00')).toBeTruthy()
    expect(screen.getByText('08:00 - 10:00')).toBeTruthy()
    expect(screen.getByText('18:30 - 20:00')).toBeTruthy()
  })

  it('adds a range using the largest available gap by default', () => {
    const { onChange } = renderSelector()

    fireEvent.click(screen.getByLabelText('Добавить диапазон'))

    expect(onChange).toHaveBeenCalledWith([{ start: 11.5, end: 12.5 }])
  })

  it('uses the preferred range strategy when configured', () => {
    const { onChange } = renderSelector({
      addRangeStrategy: 'preferred-time',
      preferredRange: { start: 9, end: 11 },
      defaultRangeDuration: 1,
    })

    fireEvent.click(screen.getByLabelText('Добавить диапазон'))

    expect(onChange).toHaveBeenCalledWith([{ start: 9, end: 11 }])
  })

  it('removes a selected range', () => {
    const { onChange } = renderSelector({
      value: [
        { start: 8, end: 10 },
        { start: 18, end: 20 },
      ],
    })

    fireEvent.click(screen.getAllByLabelText('Удалить диапазон')[0])

    expect(onChange).toHaveBeenCalledWith([{ start: 18, end: 20 }])
  })

  it('does not add ranges when disabled', () => {
    const { onChange } = renderSelector({ disabled: true })

    fireEvent.click(screen.getByLabelText('Добавить диапазон'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('resizes a range start handle by dragging', () => {
    const { onChange } = renderSelector({
      value: [{ start: 8, end: 10 }],
      step: 0.5,
    })

    const range = screen.getByText('08:00 - 10:00').parentElement
    const track = range?.parentElement

    expect(track).toBeTruthy()

    vi.spyOn(track as HTMLElement, 'getBoundingClientRect').mockReturnValue({
      bottom: 9,
      height: 9,
      left: 0,
      right: 240,
      top: 0,
      width: 240,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })

    fireEvent.mouseDown(screen.getByLabelText('Изменить начало диапазона'), {
      clientX: 80,
    })
    fireEvent.mouseMove(document, { clientX: 90 })
    fireEvent.mouseUp(document)

    expect(onChange).toHaveBeenCalledWith([{ start: 9, end: 10 }])
  })
})

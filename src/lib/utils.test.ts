import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('inline-flex', false && 'hidden', 'items-center')).toBe(
      'inline-flex items-center',
    )
  })

  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })
})

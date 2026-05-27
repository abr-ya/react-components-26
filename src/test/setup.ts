import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Clean up the React tree after each test.
afterEach(() => {
  cleanup()
})

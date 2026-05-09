import { renderHook } from '@testing-library/react'
import { useBodyScrollLock } from './useBodyScrollLock'

describe('useBodyScrollLock', () => {
  const originalOverflow = document.body.style.overflow

  afterEach(() => {
    // Reset to original overflow value after each test
    document.body.style.overflow = originalOverflow
  })

  it('should lock body scroll when enabled is true', () => {
    renderHook(() => useBodyScrollLock(true))
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should restore previous body overflow style when unmounted', () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true))
    unmount()
    expect(document.body.style.overflow).toBe(originalOverflow)
  })

  it('should not modify body overflow style when enabled is false', () => {
    renderHook(() => useBodyScrollLock(false))
    expect(document.body.style.overflow).toBe(originalOverflow)
  })
})

import { renderHook } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { useEscapeKey } from './useEscapeKey'

describe('useEscapeKey', () => {
  it('calls onEscape when Escape key is pressed and enabled is true', () => {
    const mockOnEscape = vi.fn()

    renderHook(() => useEscapeKey(true, mockOnEscape))

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)

    expect(mockOnEscape).toHaveBeenCalledTimes(1)
  })

  it('does not call onEscape when a non-Escape key is pressed', () => {
    const mockOnEscape = vi.fn()

    renderHook(() => useEscapeKey(true, mockOnEscape))

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    document.dispatchEvent(enterEvent)

    expect(mockOnEscape).not.toHaveBeenCalled()
  })

  it('does not call onEscape when enabled is false', () => {
    const mockOnEscape = vi.fn()

    renderHook(() => useEscapeKey(false, mockOnEscape))

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)

    expect(mockOnEscape).not.toHaveBeenCalled()
  })

  it('cleans up listener when unmounted', () => {
    const mockOnEscape = vi.fn()
    const { unmount } = renderHook(() => useEscapeKey(true, mockOnEscape))

    unmount()

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)

    expect(mockOnEscape).not.toHaveBeenCalled()
  })
})

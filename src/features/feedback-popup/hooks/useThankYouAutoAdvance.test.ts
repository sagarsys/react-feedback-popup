import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useThankYouAutoAdvance, type UseThankYouAutoAdvanceParams } from './useThankYouAutoAdvance'

describe('useThankYouAutoAdvance', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('should continue to Trustpilot after the timeout if rating is "stellar"', () => {
    const onContinueToTrustpilot = vi.fn()
    const onDismiss = vi.fn()
    const params: UseThankYouAutoAdvanceParams = {
      open: true,
      thanksRating: 'stellar',
      thanksTimeoutMs: 1000,
      onContinueToTrustpilot,
      onDismiss,
    }

    renderHook(() => useThankYouAutoAdvance(params))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onContinueToTrustpilot).toHaveBeenCalledTimes(1)
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('should dismiss after the timeout if rating is not "stellar"', () => {
    const onContinueToTrustpilot = vi.fn()
    const onDismiss = vi.fn()
    const params: UseThankYouAutoAdvanceParams = {
      open: true,
      thanksRating: 'positive',
      thanksTimeoutMs: 1000,
      onContinueToTrustpilot,
      onDismiss,
    }

    renderHook(() => useThankYouAutoAdvance(params))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onDismiss).toHaveBeenCalledTimes(1)
    expect(onContinueToTrustpilot).not.toHaveBeenCalled()
  })

  it('should not trigger any callback if "open" is false', () => {
    const onContinueToTrustpilot = vi.fn()
    const onDismiss = vi.fn()
    const params: UseThankYouAutoAdvanceParams = {
      open: false,
      thanksRating: 'stellar',
      thanksTimeoutMs: 1000,
      onContinueToTrustpilot,
      onDismiss,
    }

    renderHook(() => useThankYouAutoAdvance(params))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onContinueToTrustpilot).not.toHaveBeenCalled()
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('should not trigger any callback if "thanksRating" is undefined', () => {
    const onContinueToTrustpilot = vi.fn()
    const onDismiss = vi.fn()
    const params: UseThankYouAutoAdvanceParams = {
      open: true,
      thanksRating: undefined,
      thanksTimeoutMs: 1000,
      onContinueToTrustpilot,
      onDismiss,
    }

    renderHook(() => useThankYouAutoAdvance(params))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onContinueToTrustpilot).not.toHaveBeenCalled()
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('should clear timeout on unmount', () => {
    const onContinueToTrustpilot = vi.fn()
    const onDismiss = vi.fn()
    const params: UseThankYouAutoAdvanceParams = {
      open: true,
      thanksRating: 'stellar',
      thanksTimeoutMs: 1000,
      onContinueToTrustpilot,
      onDismiss,
    }

    const { unmount } = renderHook(() => useThankYouAutoAdvance(params))
    unmount()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onContinueToTrustpilot).not.toHaveBeenCalled()
    expect(onDismiss).not.toHaveBeenCalled()
  })
})

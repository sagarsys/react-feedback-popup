import { act, renderHook } from '@testing-library/react'
import { useFeedbackPopup } from './useFeedbackPopup'

describe('useFeedbackPopup', () => {
  it('should initialize with the correct initial state', () => {
    const { result } = renderHook(() => useFeedbackPopup())
    expect(result.current.state).toEqual({ step: 'rate' })
  })

  it('should handle selecting a positive rating', () => {
    const { result } = renderHook(() => useFeedbackPopup())

    act(() => {
      result.current.select('positive')
    })

    expect(result.current.state).toEqual({ step: 'thanks', rating: 'positive' })
  })

  it('should handle selecting a negative rating', () => {
    const { result } = renderHook(() => useFeedbackPopup())

    act(() => {
      result.current.select('negative')
    })

    expect(result.current.state).toEqual({ step: 'negative-form', rating: 'negative' })
  })

  it('should handle submitting negative feedback', () => {
    const { result } = renderHook(() => useFeedbackPopup())

    act(() => {
      result.current.select('negative')
      result.current.submitNegative()
    })

    expect(result.current.state).toEqual({ step: 'thanks', rating: 'negative' })
  })

  it('should handle showing the Trustpilot step for stellar ratings', () => {
    const { result } = renderHook(() => useFeedbackPopup())

    act(() => {
      result.current.select('stellar')
      result.current.showTrustpilot()
    })

    expect(result.current.state).toEqual({ step: 'trustpilot', rating: 'stellar' })
  })

  it('should not show Trustpilot for non-stellar ratings', () => {
    const { result } = renderHook(() => useFeedbackPopup())

    act(() => {
      result.current.select('positive')
      result.current.showTrustpilot()
    })

    expect(result.current.state).toEqual({ step: 'thanks', rating: 'positive' })
  })

  it('should reset to the initial state', () => {
    const { result } = renderHook(() => useFeedbackPopup())

    act(() => {
      result.current.select('positive')
      result.current.reset()
    })

    expect(result.current.state).toEqual({ step: 'rate' })
  })
})

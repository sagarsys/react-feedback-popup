import { describe, expect, it } from 'vitest'
import { initialState, reducer } from './feedbackPopup.reducer'

describe('reducer', () => {
  it('handles "select" with negative rating', () => {
    const result = reducer(initialState, { type: 'select', rating: 'negative' })
    expect(result).toEqual({ step: 'negative-form', rating: 'negative' })
  })

  it('handles "select" with positive rating', () => {
    const result = reducer(initialState, { type: 'select', rating: 'positive' })
    expect(result).toEqual({ step: 'thanks', rating: 'positive' })
  })

  it('handles "submitNegative"', () => {
    const result = reducer(
      { step: 'negative-form', rating: 'negative' },
      { type: 'submitNegative' },
    )
    expect(result).toEqual({ step: 'thanks', rating: 'negative' })
  })

  it('handles "showTrustpilot" when eligible', () => {
    const result = reducer({ step: 'thanks', rating: 'stellar' }, { type: 'showTrustpilot' })
    expect(result).toEqual({ step: 'trustpilot', rating: 'stellar' })
  })

  it('ignores "showTrustpilot" when not eligible', () => {
    const result = reducer({ step: 'thanks', rating: 'positive' }, { type: 'showTrustpilot' })
    expect(result).toEqual({ step: 'thanks', rating: 'positive' })
  })

  it('handles "reset"', () => {
    const result = reducer({ step: 'thanks', rating: 'positive' }, { type: 'reset' })
    expect(result).toEqual(initialState)
  })
})

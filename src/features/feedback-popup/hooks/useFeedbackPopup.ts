import { useReducer } from 'react'
import { reducer, initialState } from '../feedbackPopup.reducer'
import type { Rating } from '../feedbackPopup.types'

/**
 * Pure state machine for the feedback popup. Side-effects
 * are owned by the component, so this hook stays testable.
 */
export function useFeedbackPopup() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return {
    state,
    select: (rating: Rating) => dispatch({ type: 'select', rating }),
    submitNegative: () => dispatch({ type: 'submitNegative' }),
    showTrustpilot: () => dispatch({ type: 'showTrustpilot' }),
    reset: () => dispatch({ type: 'reset' }),
  }
}

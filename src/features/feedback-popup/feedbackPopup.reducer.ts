import type { Rating, FeedbackState } from './feedbackPopup.types'

type Action =
  | { type: 'select'; rating: Rating }
  | { type: 'submitNegative' }
  | { type: 'showTrustpilot' }
  | { type: 'reset' }

export const initialState: FeedbackState = { step: 'rate' }

export function reducer(state: FeedbackState, action: Action): FeedbackState {
  switch (action.type) {
    case 'select':
      return action.rating === 'negative'
        ? { step: 'negative-form', rating: 'negative' }
        : { step: 'thanks', rating: action.rating }

    case 'submitNegative':
      return { step: 'thanks', rating: 'negative' }

    case 'showTrustpilot':
      if (state.step !== 'thanks' || state.rating !== 'stellar') return state
      return { step: 'trustpilot', rating: 'stellar' }

    case 'reset':
      return initialState

    default:
      return state
  }
}

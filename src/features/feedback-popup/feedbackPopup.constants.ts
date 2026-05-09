import type { FeedbackPayload, RatingButton } from './feedbackPopup.types'

export const RATING_LABEL: Record<FeedbackPayload['rating'], string> = {
  negative: 'Negative',
  positive: 'Positive',
  stellar: 'Stellar',
}

export const RATING_BUTTONS: readonly RatingButton[] = [
  {
    rating: 'negative',
    label: 'Negative',
    icon: '👎',
    hoverClasses: 'hover:text-[#d4493a] hover:border-[rgba(212,73,58,0.5)]',
  },
  {
    rating: 'positive',
    label: 'Positive',
    icon: '👍',
    hoverClasses: 'hover:text-[#2f9e63] hover:border-[rgba(47,158,99,0.5)]',
  },
  {
    rating: 'stellar',
    label: 'Stellar',
    icon: '🤩',
    hoverClasses: 'hover:text-[#d4a017] hover:border-[rgba(212,160,23,0.5)]',
  },
]

export const MAX_COMMENT_LENGTH = 500

export const DEFAULT_THANKS_TIMEOUT_MS = 2000

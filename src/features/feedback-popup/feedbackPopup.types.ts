export type Rating = 'negative' | 'positive' | 'stellar'

export type FeedbackPayload =
  | { rating: 'positive'; comment?: never }
  | { rating: 'stellar'; comment?: never }
  | { rating: 'negative'; comment: string }

export type FeedbackState =
  | { step: 'rate'; rating?: never }
  | { step: 'negative-form'; rating: 'negative' }
  | { step: 'thanks'; rating: Rating }
  | { step: 'trustpilot'; rating: 'stellar' }

export interface RatingButton {
  rating: Rating
  label: string
  icon: string
  /** Per-rating hover overrides for text + border colors. */
  hoverClasses: string
}

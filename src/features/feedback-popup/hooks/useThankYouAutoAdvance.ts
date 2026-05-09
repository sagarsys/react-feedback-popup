import { useEffect } from 'react'
import type { Rating } from '../feedbackPopup.types'
import { useLatestRef } from '@/hooks/useLatestRef'

export interface UseThankYouAutoAdvanceParams {
  open: boolean
  /** Set only while on the thank-you step; `undefined` otherwise. */
  thanksRating: Rating | undefined
  thanksTimeoutMs: number
  /** After a stellar rating’s thank-you delay: move to Trustpilot step. */
  onContinueToTrustpilot: () => void
  /** After positive/negative thank-you delay: close the dialog. */
  onDismiss: () => void
}

/**
 * When `thanksRating` is set and the popup is open, waits `thanksTimeoutMs`
 * then either continues to Trustpilot (stellar) or dismisses.
 */
export function useThankYouAutoAdvance({
  open,
  thanksRating,
  thanksTimeoutMs,
  onContinueToTrustpilot,
  onDismiss,
}: UseThankYouAutoAdvanceParams): void {
  const trustpilotRef = useLatestRef(onContinueToTrustpilot)
  const dismissRef = useLatestRef(onDismiss)

  useEffect(() => {
    if (!open || thanksRating === undefined) return

    const rating = thanksRating
    const id = window.setTimeout(() => {
      if (rating === 'stellar') trustpilotRef.current()
      else dismissRef.current()
    }, thanksTimeoutMs)

    return () => window.clearTimeout(id)
  }, [open, thanksRating, thanksTimeoutMs, dismissRef, trustpilotRef])
}

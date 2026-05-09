import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFeedbackPopup } from '../hooks/useFeedbackPopup'
import type { FeedbackPayload, Rating } from '../feedbackPopup.types'
import { X as CloseIcon } from 'lucide-react'
import { NegativeFeedbackStep } from './NegativeFeedbackStep'
import { RatingStep } from './RatingStep'
import { ThankYouStep } from './ThankYouStep'
import { TrustpilotStep } from './TrustpilotStep'
import { DEFAULT_THANKS_TIMEOUT_MS } from '../feedbackPopup.constants'
import { cn } from '@/lib/utils'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useThankYouAutoAdvance } from '../hooks/useThankYouAutoAdvance'
import { useFeedbackDialogFocus } from '@/features/feedback-popup/hooks/useFeedbackDialogFocus'
import { useFocusTrap } from '@/hooks/useFocusTrap'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  trustpilotUrl?: string
  onSubmit?: (payload: FeedbackPayload) => void
  thanksTimeoutMs?: number
}

export const FeedbackPopup = ({
  open,
  onOpenChange,
  trustpilotUrl = 'https://www.trustpilot.com/',
  onSubmit,
  thanksTimeoutMs = DEFAULT_THANKS_TIMEOUT_MS,
}: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const flow = useFeedbackPopup()
  const { state, select, submitNegative, showTrustpilot, reset } = flow

  const close = () => onOpenChange(false)

  const thanksRating = state.step === 'thanks' ? state.rating : undefined

  const handleSelect = (rating: Rating) => {
    select(rating)
    if (rating !== 'negative') {
      onSubmit?.({ rating })
    }
  }

  const handleNegativeSubmit = (comment: string) => {
    submitNegative()
    onSubmit?.({ rating: 'negative', comment })
  }

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  // Auto-advance from the thank-you screen.
  useThankYouAutoAdvance({
    open,
    thanksRating,
    thanksTimeoutMs,
    onContinueToTrustpilot: showTrustpilot,
    onDismiss: close,
  })

  // Esc to close
  useEscapeKey(open, close)
  // body scroll lock while open
  useBodyScrollLock(open)
  // focus management
  useFeedbackDialogFocus(open, state.step, dialogRef, titleId)
  // trap focus inside the dialog
  useFocusTrap(dialogRef, open)

  if (!open) return null

  const popup = (
    <div
      className="fixed inset-0 z-[1000] grid animate-fade-in place-items-center bg-[rgba(8,6,13,0.45)] p-4 backdrop-blur-[2px]"
      data-testid="feedback-popup-backdrop"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'relative w-full max-w-[560px] animate-pop-in rounded-2xl border border-border px-[22px] pt-8 pb-7 text-center text-text shadow-card outline-none focus-visible:outline-none',
          state.step === 'thanks' ? 'bg-accent' : 'bg-bg',
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {state.step !== 'thanks' && (
          <button
            type="button"
            aria-label="Close"
            className="absolute top-3 right-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-text transition-colors duration-150 hover:bg-code-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={close}
          >
            <CloseIcon />
          </button>
        )}

        {state.step === 'rate' && <RatingStep titleId={titleId} onSelect={handleSelect} />}
        {state.step === 'negative-form' && (
          <NegativeFeedbackStep titleId={titleId} onSubmit={handleNegativeSubmit} />
        )}
        {state.step === 'thanks' && <ThankYouStep titleId={titleId} />}
        {state.step === 'trustpilot' && (
          <TrustpilotStep titleId={titleId} trustpilotUrl={trustpilotUrl} onDismiss={close} />
        )}
      </div>
    </div>
  )

  return createPortal(popup, document.body)
}

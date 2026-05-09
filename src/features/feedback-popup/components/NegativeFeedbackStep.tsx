import { useId, useState, type FormEvent } from 'react'
import { MAX_COMMENT_LENGTH } from '../feedbackPopup.constants'

type Props = {
  titleId: string
  onSubmit: (comment: string) => void
}

export const NegativeFeedbackStep = ({ titleId, onSubmit }: Props) => {
  const textareaId = useId()
  const [comment, setComment] = useState('')
  const trimmed = comment.trim()
  const isValid = trimmed.length > 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) return
    onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 id={titleId} className="m-0 mb-8 text-[22px] font-semibold tracking-[-0.3px] text-text-h">
        How can we make things better?
      </h2>
      <label htmlFor={textareaId} className="sr-only">
        Tell us what went wrong
      </label>
      <textarea
        id={textareaId}
        className="box-border block min-h-24 w-full resize-y rounded-[10px] border border-border bg-bg px-3.5 py-3 text-[15px] leading-[1.4] text-text-h transition-colors duration-150 focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-bg)] focus-visible:outline-none"
        placeholder="Tell us what went wrong…"
        value={comment}
        maxLength={MAX_COMMENT_LENGTH}
        onChange={(event) => setComment(event.target.value)}
        rows={4}
        autoFocus
        required
      />
      <div className="mt-1 mb-4 text-right text-xs text-text" aria-live="polite">
        {trimmed.length}/{MAX_COMMENT_LENGTH}
      </div>
      <button
        type="submit"
        className="inline-flex cursor-pointer items-center justify-center rounded-[10px] border-0 bg-accent-bg px-4 py-3 text-[15px] font-medium text-white transition duration-150 hover:-translate-y-px hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:brightness-100"
        disabled={!isValid}
      >
        Send feedback
      </button>
    </form>
  )
}

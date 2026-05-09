import { useCallback, useState } from 'react'
import { FeedbackPopup, RATING_LABEL, type FeedbackPayload } from '@/features/feedback-popup'

function App() {
  const [open, setOpen] = useState(false)
  const [lastFeedback, setLastFeedback] = useState<FeedbackPayload | null>(null)

  const handleSubmit = useCallback((payload: FeedbackPayload) => {
    setLastFeedback(payload)
  }, [])

  return (
    <main className="grid min-h-svh place-items-center px-4 py-8">
      <section className="w-full max-w-140 rounded-[20px] border border-border bg-bg px-8 py-12 text-center shadow-card">
        <h1 className="m-0 mb-3 text-4xl font-medium text-text-h">Feature feedback</h1>
        <p className="m-0 mb-8 text-text">
          A small, dependency-free popup for collecting product feedback.
        </p>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-[10px] border-0 bg-accent px-5.5 py-3 text-base font-medium text-white transition duration-150 hover:-translate-y-px hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => setOpen(true)}
        >
          Rate this feature
        </button>

        {lastFeedback && (
          <aside
            className="mt-9 rounded-xl border border-border bg-code-bg p-5 text-left"
            aria-live="polite"
          >
            <h2 className="m-0 mb-3 text-base font-medium text-text-h">Last submission</h2>
            <dl className="m-0 grid gap-2">
              <div className="grid grid-cols-[90px_1fr] gap-2">
                <dt className="font-medium text-text">Rating</dt>
                <dd className="m-0 wrap-break-word text-text-h">
                  {RATING_LABEL[lastFeedback.rating]}
                </dd>
              </div>
              {lastFeedback?.comment && (
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="font-medium text-text">Comment</dt>
                  <dd className="m-0 wrap-break-word text-text-h">{lastFeedback.comment}</dd>
                </div>
              )}
            </dl>
          </aside>
        )}
      </section>

      <FeedbackPopup open={open} onOpenChange={setOpen} onSubmit={handleSubmit} />
    </main>
  )
}

export default App

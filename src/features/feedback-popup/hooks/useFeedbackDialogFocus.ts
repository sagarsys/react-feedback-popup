import { type RefObject, useLayoutEffect, useRef } from 'react'

export type FeedbackDialogStep = 'rate' | 'negative-form' | 'thanks' | 'trustpilot'

/**
 * When the dialog opens, remembers the previously focused node (usually the
 * trigger). On close, restores focus there. While open, moves focus to an
 * appropriate control whenever `step` changes.
 */
export function useFeedbackDialogFocus(
  open: boolean,
  step: FeedbackDialogStep,
  dialogRef: RefObject<HTMLElement | null>,
  titleId: string,
) {
  const openerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!open) {
      openerRef.current?.focus({ preventScroll: true })
      openerRef.current = null
      return
    }

    if (openerRef.current === null) {
      const ae = document.activeElement
      openerRef.current = ae instanceof HTMLElement ? ae : null
    }

    const root = dialogRef.current
    if (!root) return

    switch (step) {
      case 'rate': {
        const group = root.querySelector<HTMLElement>(
          '[role="group"][aria-label="Rate this feature"]',
        )
        group?.querySelector<HTMLElement>('button')?.focus()
        break
      }
      case 'negative-form': {
        root.querySelector<HTMLTextAreaElement>('textarea')?.focus()
        break
      }
      case 'thanks': {
        const heading = root.querySelector<HTMLElement>(`#${CSS.escape(titleId)}`)
        heading?.focus()
        break
      }
      case 'trustpilot': {
        root.querySelector<HTMLAnchorElement>('a[href]')?.focus()
        break
      }
    }
  }, [open, step, titleId, dialogRef])
}

import { type RefObject, useLayoutEffect } from 'react'

// Rough list of tab stops inside `root` (DOM order)
function tabbable(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(','),
    ),
  )
}

// Tab / Shift+Tab cycles inside `containerRef` while `active`.
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean) {
  useLayoutEffect(() => {
    if (!active) return
    const el = containerRef.current
    if (!el) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const nodes = tabbable(el)
      if (nodes.length === 0) {
        e.preventDefault()
        return
      }
      const first = nodes[0]!
      const last = nodes[nodes.length - 1]!
      const cur = document.activeElement

      if (e.shiftKey) {
        if (cur === first || (cur && !el.contains(cur))) {
          e.preventDefault()
          last.focus()
        }
      } else if (cur === last || (cur && !el.contains(cur))) {
        e.preventDefault()
        first.focus()
      }
    }

    el.addEventListener('keydown', onKeyDown)
    return () => el.removeEventListener('keydown', onKeyDown)
  }, [active, containerRef])
}

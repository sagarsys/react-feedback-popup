import { useEffect } from 'react'
import { useLatestRef } from './useLatestRef'

export function useEscapeKey(enabled: boolean, onEscape: () => void) {
  const onEscapeRef = useLatestRef(onEscape)

  useEffect(() => {
    if (!enabled) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscapeRef.current()
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [enabled, onEscapeRef])
}

import { useEffect, useRef } from 'react'

/**
 * Keeps a ref synced with the latest value on every commit, without listing
 * that value in other hooks’ dependency arrays (timer listeners, subscriptions).
 */
export function useLatestRef<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref
}

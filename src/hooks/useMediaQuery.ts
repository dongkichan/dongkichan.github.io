import { useSyncExternalStore } from 'react'

/**
 * Live media-query match. `null` on the server and during hydration so the
 * first client render agrees with the prerendered HTML; then the real value.
 */
export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => null,
  )
}

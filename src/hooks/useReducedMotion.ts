import { useMediaQuery } from './useMediaQuery'

/** null until hydrated, then the live prefers-reduced-motion preference. */
export const useReducedMotion = (): boolean | null => useMediaQuery('(prefers-reduced-motion: reduce)')

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/** False on the server and during hydration, true once React is running on the client. */
export const useHydrated = (): boolean => useSyncExternalStore(subscribe, () => true, () => false)

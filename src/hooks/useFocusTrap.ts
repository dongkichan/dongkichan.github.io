import { useEffect, type RefObject } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, summary, [tabindex]:not([tabindex="-1"])'

/** Keeps Tab focus inside `ref` while active; moves focus in on activate and back out on cleanup. */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active) return
    const root = ref.current
    if (!root) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const first = root.querySelector<HTMLElement>('[data-autofocus]') ?? root.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const firstEl = items[0]!
      const lastEl = items[items.length - 1]!
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [ref, active])
}

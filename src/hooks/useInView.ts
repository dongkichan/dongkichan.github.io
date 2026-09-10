import { useEffect, useState, type RefObject } from 'react'

const supported = () => typeof window !== 'undefined' && 'IntersectionObserver' in window

/** True once the element has entered the viewport. Stays true. Browsers without IntersectionObserver start true. */
export function useInView<T extends Element>(ref: RefObject<T | null>, amount = 0.25): boolean {
  const [inView, setInView] = useState(() => (typeof window === 'undefined' ? false : !supported()))
  useEffect(() => {
    const el = ref.current
    if (!el || inView || !supported()) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, amount, inView])
  return inView
}

import { useEffect, useState } from 'react'

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 to `target` once `run` becomes true. Returns `target` until then,
 * so the settled value is what renders on the server and for reduced motion.
 */
export function useCountUp(target: number, run: boolean, duration = 1400): number {
  const [value, setValue] = useState(target)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * easeOut(t)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])
  return value
}

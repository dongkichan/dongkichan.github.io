import { useCallback, useEffect, useState } from 'react'
import { buildSession, buildSessionSummary } from '../data/buildSession'
import { isSettled, sessionFrame, totalChars, type SessionLineKind } from '../lib/session'
import { useHydrated } from '../hooks/useHydrated'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cx } from '../lib/cx'
import s from './BuildSession.module.css'

const MS_PER_TICK = 42
const TOTAL = totalChars(buildSession)
const GLYPH: Record<SessionLineKind, string> = {
  prompt: '›', agent: '·', ok: '✓', test: '✓', deploy: '✓', note: '—', done: '■',
}

type Phase = 'idle' | 'playing' | 'done'

/**
 * The signature hero piece: a terminal that plays the workflow once, then settles.
 * The server, the first client render, small screens and reduced-motion all get
 * the settled frame, so there is no hydration mismatch and no layout shift.
 */
export function BuildSession() {
  const hydrated = useHydrated()
  const reduced = useReducedMotion()
  const wide = useMediaQuery('(min-width: 641px)')
  const [ticks, setTicks] = useState(TOTAL)
  const [phase, setPhase] = useState<Phase>('idle')
  const [run, setRun] = useState(0)

  const canAnimate = hydrated && reduced === false && wide === true

  useEffect(() => {
    if (!canAnimate) return
    let start = performance.now()
    let pausedAt: number | null = null
    let raf = 0
    const onVisibility = () => {
      if (document.hidden) pausedAt = performance.now()
      else if (pausedAt !== null) {
        start += performance.now() - pausedAt
        pausedAt = null
      }
    }
    const tick = (now: number) => {
      if (pausedAt === null) {
        const t = Math.floor((now - start) / MS_PER_TICK)
        setTicks(t)
        if (t >= TOTAL) {
          setPhase('done')
          return
        }
        setPhase('playing')
      }
      raf = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [canAnimate, run])

  const replay = useCallback(() => {
    setTicks(0)
    setPhase('idle')
    setRun((n) => n + 1)
  }, [])

  const shownTicks = !canAnimate ? TOTAL : phase === 'idle' ? 0 : ticks
  const frame = sessionFrame(buildSession, shownTicks)
  const settled = isSettled(buildSession, shownTicks)

  return (
    <div className={s.panel} role="img" aria-label={buildSessionSummary}>
      <div className={s.bar} aria-hidden="true">
        <span className={s.dots}><i /><i /><i /></span>
        <span>session: client-project</span>
        {canAnimate && settled ? (
          <button type="button" className={s.replay} onClick={replay} tabIndex={-1}>replay</button>
        ) : <span />}
      </div>
      <pre className={s.log} aria-hidden="true">
        {frame.map((line, i) => (
          <div key={i} className={cx(s.line, s[line.kind], !line.visible && s.hidden)}>
            <span className={s.glyph}>{GLYPH[line.kind]}</span>
            <span className={s.text}>
              {line.text}
              {line.active || (settled && i === frame.length - 1) ? <span className={s.cursor} /> : null}
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}

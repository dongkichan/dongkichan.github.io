import { useRef } from 'react'
import { stats, statsCaption, type Stat } from '../data/stats'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { useHydrated } from '../hooks/useHydrated'
import { useReducedMotion } from '../hooks/useReducedMotion'
import s from './ProofStrip.module.css'

const fmt = (n: number, stat: Stat) => (stat.format === 'thousands' ? n.toLocaleString('en-US') : String(n))

function StatView({ stat, run }: { stat: Stat; run: boolean }) {
  const value = useCountUp(stat.value, run)
  const finished = value >= stat.value
  return (
    <div className={s.stat}>
      <span className={s.value} aria-hidden="true">{finished ? stat.display : `${fmt(value, stat)}${stat.suffix ?? ''}`}</span>
      <span className="visually-hidden">{stat.display}</span>
      <span className={s.label}>{stat.label}</span>
    </div>
  )
}

export function ProofStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.4)
  const hydrated = useHydrated()
  const reduced = useReducedMotion()
  const run = hydrated && inView && reduced === false
  return (
    <section className={s.strip} aria-label="Track record">
      <div className="container">
        <div ref={ref} className={s.grid}>
          {stats.map((st) => <StatView key={st.label} stat={st} run={run} />)}
        </div>
        <p className={s.caption}>{statsCaption}</p>
      </div>
    </section>
  )
}

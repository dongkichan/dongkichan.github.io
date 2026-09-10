import { useRef } from 'react'
import { stats, upworkBadge, type Stat } from '../data/stats'
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

/** A tick ring, like the dials in the sky, turning slowly around the Upwork mark. */
function SealRing() {
  const ticks: string[] = []
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2
    const len = i % 4 === 0 ? 7 : 3
    ticks.push(`M${(54 + Math.cos(a) * 44).toFixed(1)} ${(54 + Math.sin(a) * 44).toFixed(1)}L${(54 + Math.cos(a) * (44 + len)).toFixed(1)} ${(54 + Math.sin(a) * (44 + len)).toFixed(1)}`)
  }
  return (
    <svg viewBox="0 0 108 108" fill="none" aria-hidden="true" className={s.sealRing}>
      <circle cx="54" cy="54" r="52" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="2 5" />
      <path d={ticks.join('')} stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1" />
      <circle cx="54" cy="54" r="40" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" />
    </svg>
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
      <div ref={ref} className={`container ${s.grid}`}>
        <a className={s.badge} href={upworkBadge.href} target="_blank" rel="noopener noreferrer">
          <span className={s.seal}>
            <SealRing />
            <img className={s.sealLogo} src={upworkBadge.logo.src} width={upworkBadge.logo.width} height={upworkBadge.logo.height} alt={upworkBadge.logo.alt} />
          </span>
          <span className={s.badgeText}>
            <span className={s.kicker}>Upwork</span>
            <span className={s.title}>{upworkBadge.title}</span>
            <span className={s.subtitle}>{upworkBadge.subtitle}</span>
            <span className={s.detail}>{upworkBadge.detail}</span>
            <span className={s.cta}>View the profile</span>
          </span>
        </a>
        <div className={s.stats}>
          {stats.map((st) => <StatView key={st.label} stat={st} run={run} />)}
        </div>
      </div>
    </section>
  )
}

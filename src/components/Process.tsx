import { useRef } from 'react'
import { commitments, processSteps } from '../data/process'
import { useInView } from '../hooks/useInView'
import { cx } from '../lib/cx'
import s from './Process.module.css'

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, 0.3)
  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <h2 id="process-title">How the work gets done</h2>
          <p>Four steps, every time.</p>
        </div>
        <ol ref={ref} className={cx(s.steps, inView && 'is-in')}>
          <svg className={s.line} viewBox="0 0 1000 2" preserveAspectRatio="none" aria-hidden="true">
            <path className="draw" pathLength={1} d="M0 1H1000" />
          </svg>
          {processSteps.map((step, i) => (
            <li key={step.name} className={s.step}>
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={s.name}>{step.name}</h3>
              <p className={s.text}>{step.text}</p>
            </li>
          ))}
        </ol>
        {commitments.length ? (
          <>
            <p className={s.commitLead}>What you can hold me to</p>
            <ul className={s.commit}>
              {commitments.map((c) => (
                <li key={c.name}><h3>{c.name}</h3><p>{c.text}</p></li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  )
}

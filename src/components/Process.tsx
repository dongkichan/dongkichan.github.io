import { useRef } from 'react'
import { commitments, processSteps } from '../data/process'
import { sections } from '../data/sections'
import { useInView } from '../hooks/useInView'
import { cx } from '../lib/cx'
import { BuildSession } from './BuildSession'
import s from './Process.module.css'

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, 0.3)
  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <h2 id="process-title">{sections.process.title}</h2>
          <p>{sections.process.aside}</p>
        </div>
        <div className={s.grid}>
          <ol ref={ref} className={cx(s.steps, inView && 'is-in')}>
            {processSteps.map((step, i) => (
              <li key={step.name} className={s.step}>
                <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.name}>{step.name}</h3>
                <p className={s.text}>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className={s.session}><BuildSession /></div>
        </div>
        {commitments.length ? (
          <>
            <p className={s.commitLead}>{sections.process.commitmentsLead}</p>
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

import { experience } from '../data/experience'
import { profile } from '../data/profile'
import s from './Cv.module.css'

export function Cv() {
  return (
    <section id="cv" className="section" aria-labelledby="cv-title">
      <div className="container">
        <div className="section-head">
          <h2 id="cv-title">The path, so far</h2>
        </div>
        <ol className={s.list}>
          {experience.map((r) => (
            <li key={`${r.years}-${r.company}`} className={s.role}>
              <span className={s.years}>{r.years}</span>
              <div>
                <h3 className={s.title}>{r.title}</h3>
                <p className={s.org}>{r.company}, {r.location}</p>
                <p className={s.summary}>{r.summary}</p>
                <details className={s.details}>
                  <summary>Details</summary>
                  <ul>{r.bullets.map((b) => <li key={b.slice(0, 32)}>{b}</li>)}</ul>
                </details>
              </div>
            </li>
          ))}
        </ol>
        <div className={s.download}>
          <a className="btn btn-ghost" href={profile.cvPath} download>Download CV</a>
        </div>
      </div>
    </section>
  )
}

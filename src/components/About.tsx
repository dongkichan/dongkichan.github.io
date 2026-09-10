import { profile } from '../data/profile'
import { headlineSkills } from '../data/skills'
import { awards, certifications, education } from '../data/credentials'
import s from './About.module.css'

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${s.grid}`}>
        <div>
          <h2 id="about-title" className={s.h2}>Some context</h2>
          <div className={s.bio}>{profile.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
          <div className={s.block}>
            <p className={s.blockTitle}>Stack</p>
            <ul className="tags">{headlineSkills.map((k) => <li key={k}>{k}</li>)}</ul>
          </div>
          <div className={s.block}>
            <p className={s.blockTitle}>Education</p>
            <p className={s.edu}>
              <picture>
                <source srcSet={education.logo.webp} type="image/webp" />
                <img src={education.logo.png} width={education.logo.width} height={education.logo.height} alt={education.logo.alt} loading="lazy" />
              </picture>
              <span>{education.degree}, {education.school}, {education.years}</span>
            </p>
          </div>
        </div>
        <div className={s.creds}>
          <div>
            <p className={s.blockTitle}>Recognition</p>
            <ul>
              {awards.map((a) => (
                <li key={a.name}><span className={s.credName}>{a.name}, {a.issuer}</span><span>{a.date}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.blockTitle}>Certifications</p>
            <ul>
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.image ? (
                    <a href={c.image.jpg} target="_blank" rel="noopener noreferrer">{c.name}, {c.issuer}</a>
                  ) : (
                    <span className={s.credName}>{c.name}, {c.issuer}</span>
                  )}
                  <span>{c.date ?? ''}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

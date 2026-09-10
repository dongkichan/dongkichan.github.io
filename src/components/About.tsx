import { profile } from '../data/profile'
import { headlineSkills } from '../data/skills'
import { awards, certifications, education } from '../data/credentials'
import s from './About.module.css'

export function About() {
  const { photo } = profile
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${s.grid}`}>
        <div className={s.photo}>
          <picture>
            <source srcSet={photo.webp} type="image/webp" />
            <img src={photo.jpg} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
          </picture>
          <span className={s.bracket} aria-hidden="true" />
          <span className={s.caption}>{photo.caption}</span>
        </div>
        <div>
          <h2 id="about-title" style={{ marginBottom: 28 }}>Some context</h2>
          <div className={s.bio}>{profile.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>

          <div className={s.block}>
            <p className={s.blockTitle}>Stack</p>
            <ul className="tags">{headlineSkills.map((k) => <li key={k}>{k}</li>)}</ul>
          </div>

          <div className={`${s.block} ${s.creds}`}>
            <div>
              <p className={s.blockTitle}>Recognition</p>
              <ul>
                {awards.map((a) => (
                  <li key={a.name}><span style={{ color: 'var(--text)', whiteSpace: 'normal' }}>{a.name}, {a.issuer}</span><span>{a.date}</span></li>
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
                      <span style={{ color: 'var(--text)', whiteSpace: 'normal' }}>{c.name}, {c.issuer}</span>
                    )}
                    <span>{c.date ?? ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className={s.edu}>
            <picture>
              <source srcSet={education.logo.webp} type="image/webp" />
              <img src={education.logo.png} width={education.logo.width} height={education.logo.height} alt={education.logo.alt} loading="lazy" />
            </picture>
            <span>{education.degree}, {education.school}, {education.years}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

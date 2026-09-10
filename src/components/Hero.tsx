import { profile } from '../data/profile'
import s from './Hero.module.css'

export function Hero() {
  const { hero, photo } = profile
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <h1 id="hero-title" className={`${s.h1} rise-solid ${s.rise1}`}>{profile.name}</h1>
          <p className={`${s.role} rise ${s.rise2}`}>{hero.role}</p>
          <p className={`${s.sub} rise ${s.rise3}`}>{hero.subhead}</p>
          <div className={`${s.ctas} rise ${s.rise4}`}>
            <a className="btn btn-primary" href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
            <a className="text-link" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
          </div>
        </div>
        <div className={`${s.photo} rise-solid ${s.rise2}`}>
          <picture>
            <source srcSet={photo.webp} type="image/webp" />
            <img src={photo.jpg} width={photo.width} height={photo.height} alt={photo.alt} fetchPriority="high" decoding="async" />
          </picture>
          <span className={s.bracket} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

import { profile } from '../data/profile'
import { BuildSession } from './BuildSession'
import s from './Hero.module.css'

export function Hero() {
  const { hero } = profile
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`${s.glow} ${s.glow1}`} aria-hidden="true" />
      <div className={`${s.glow} ${s.glow2}`} aria-hidden="true" />
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <p className={`${s.eyebrow} rise ${s.rise1}`}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={s.h1}>
            <span className={`rise ${s.rise2}`}>{hero.headline.lead}</span>
            <span className={`rise ${s.rise3}`}>
              <em>{hero.headline.emphasis}</em> {hero.headline.tail}
            </span>
          </h1>
          <p className={`${s.sub} rise ${s.rise4}`}>{hero.subhead}</p>
          <div className={`${s.ctas} rise ${s.rise5}`}>
            <a className="btn btn-primary" href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
            <a className="text-link" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
          </div>
        </div>
        <BuildSession />
      </div>
    </section>
  )
}

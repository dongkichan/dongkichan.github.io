import { profile } from '../data/profile'
import { sections } from '../data/sections'
import { cx } from '../lib/cx'
import s from './Nav.module.css'

export function Nav({ variant = 'home' }: { variant?: 'home' | 'case' }) {
  const isCase = variant === 'case'
  const prefix = isCase ? '/' : ''
  return (
    <header className={cx(s.nav, isCase && s.case)}>
      <div className={`container ${s.inner}`}>
        <a href="/" className={s.brand}>{profile.name}</a>
        <nav aria-label="Sections" className={s.links}>
          {sections.nav.links.map((l) => (
            <a key={l.href} href={`${prefix}${l.href}`}>{isCase && 'caseLabel' in l ? l.caseLabel : l.label}</a>
          ))}
        </nav>
        <div className={s.right}>
          {profile.availability.open ? (
            <span className={s.status} title={profile.availability.label}><span className={s.dot} aria-hidden="true" /><span>{profile.availability.label}</span></span>
          ) : null}
          <a className={s.cv} href={profile.cvPath} download>Download CV</a>
          <a className="btn btn-primary btn-small" href={`${prefix}#contact`}>Start a project</a>
        </div>
      </div>
    </header>
  )
}

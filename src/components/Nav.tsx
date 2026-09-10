import { profile } from '../data/profile'
import s from './Nav.module.css'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Proof', href: '#proof' },
  { label: 'CV', href: '#cv' },
  { label: 'Contact', href: '#contact' },
]

export function Nav({ variant = 'home' }: { variant?: 'home' | 'case' }) {
  const prefix = variant === 'home' ? '' : '/'
  return (
    <header className={s.nav}>
      <div className={`container ${s.inner}`}>
        <a href="/" className={s.brand}>{profile.name}</a>
        <nav aria-label="Sections" className={s.links}>
          {variant === 'case' ? <a href="/#work">All work</a> : null}
          {links.map((l) => (
            <a key={l.href} href={`${prefix}${l.href}`}>{l.label}</a>
          ))}
        </nav>
        <div className={s.right}>
          {profile.availability.open ? (
            <span className={s.status}><span className={s.dot} aria-hidden="true" /><span>{profile.availability.label}</span></span>
          ) : null}
          <a className={s.cv} href={profile.cvPath} download>Download CV</a>
          <a className="btn btn-primary btn-small" href={`${prefix}#contact`}>Start a project</a>
        </div>
      </div>
    </header>
  )
}

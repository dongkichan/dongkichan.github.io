import { profile } from '../data/profile'
import s from './Footer.module.css'

export function Footer() {
  return (
    <footer className="container">
      <div className={s.footer}>
        <span>© {profile.copyrightYear} {profile.name}</span>
        <span>{profile.location.city}, {profile.location.timezone}</span>
        {profile.availability.open ? <span>{profile.availability.label}</span> : null}
      </div>
    </footer>
  )
}

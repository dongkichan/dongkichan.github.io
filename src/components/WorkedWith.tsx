import type { CSSProperties } from 'react'
import { profile } from '../data/profile'
import s from './WorkedWith.module.css'

export function WorkedWith() {
  return (
    <section aria-label="Organisations worked with" className={`container ${s.wrap}`}>
      <p className={s.lead}>Worked with teams at</p>
      <ul className={s.row}>
        {profile.workedWith.map((org) => (
          <li key={org.name}>
            <a className={s.logo} href={org.href} target="_blank" rel="noopener noreferrer" style={{ '--scale': org.scale } as CSSProperties} aria-label={org.name}>
              <img src={org.src} width={org.width} height={org.height} alt={org.name} loading="lazy" decoding="async" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

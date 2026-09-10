import { profile } from '../data/profile'
import s from './WorkedWith.module.css'

export function WorkedWith() {
  return (
    <section aria-label="Organisations worked with" className="container">
      <ul className={s.row}>
        <li className={s.lead}>Worked with teams at</li>
        {profile.workedWith.map((name) => <li key={name} className={s.name}>{name}</li>)}
      </ul>
    </section>
  )
}

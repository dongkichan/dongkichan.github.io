import { profile } from '../data/profile'
import { Footer } from './Footer'
import s from './Contact.module.css'

export function Contact() {
  const { contact } = profile
  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className={`container ${s.wrap}`}>
        <h2 id="contact-title" className={s.h2}>
          <span>{contact.heading.lead}</span>
          <span>{contact.heading.tail}</span>
        </h2>
        <a className={s.email} href={`mailto:${profile.email}`}>{profile.email}</a>
        {contact.responseNote ? <p className={s.note}>{contact.responseNote}</p> : null}
        <ul className={s.socials}>
          {profile.socials.map((so) => (
            <li key={so.label}>
              <span>{so.label}</span>
              <a href={so.href} target="_blank" rel="noopener noreferrer">{so.handle}</a>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </section>
  )
}

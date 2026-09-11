import type { ReactNode } from 'react'
import { sections } from '../data/sections'
import { testimonials, type Testimonial } from '../data/testimonials'
import s from './Testimonials.module.css'

/** Wraps each highlight phrase in <mark> so the words that matter read in accent. */
function highlight(text: string, phrases: readonly string[]): ReactNode[] {
  if (!phrases.length) return [text]
  const re = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(re).map((part, i) => (phrases.includes(part) ? <mark key={i}>{part}</mark> : part))
}

function Who({ t }: { t: Testimonial }) {
  return (
    <p className={s.who}>
      <strong>{t.name}</strong>
      <span>{t.title}</span>
      <a href={t.href} target="_blank" rel="noopener noreferrer">{t.source}, {t.date}</a>
    </p>
  )
}

export function Testimonials() {
  const [lead, ...rest] = testimonials
  return (
    <section id="proof" className="section" aria-labelledby="proof-title">
      <div className="container">
        <div className="section-head">
          <h2 id="proof-title">{sections.proof.title}</h2>
          <p>{sections.proof.aside}</p>
        </div>
        {lead ? (
          <figure className={s.lead}>
            <blockquote>{highlight(lead.quote, lead.highlights)}</blockquote>
            <figcaption><Who t={lead} /></figcaption>
          </figure>
        ) : null}
        <ul className={s.grid}>
          {rest.map((t) => (
            <li key={t.name}>
              <figure>
                <blockquote>{highlight(t.quote, t.highlights)}</blockquote>
                <figcaption><Who t={t} /></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

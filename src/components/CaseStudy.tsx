import { useRef } from 'react'
import { profile } from '../data/profile'
import type { Project } from '../data/projects'
import { useInView } from '../hooks/useInView'
import { cx } from '../lib/cx'
import { ProjectArt } from './art/ProjectArt'
import s from './CaseStudy.module.css'

export function CaseStudy({ project, context, titleId }: { project: Project; context: 'page' | 'modal'; titleId: string }) {
  const artRef = useRef<HTMLDivElement>(null)
  const inView = useInView(artRef, 0.2)
  const Title = context === 'page' ? 'h1' : 'h2'
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Re: ${project.title}`)}`
  return (
    <article className={s.article} aria-labelledby={titleId}>
      <header>
        <p className={s.meta}><span>{project.category}</span><span>{project.year}</span></p>
        <Title id={titleId} className={s.title}>{project.title}</Title>
        <p className={s.tagline}>{project.tagline}</p>
        <dl className={s.facts}>
          <div><dt>Client</dt><dd>{project.client}{project.clientNote ? <small>{project.clientNote}</small> : null}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
        </dl>
      </header>

      <div ref={artRef} className={cx(s.art, inView && 'is-in')}>
        <ProjectArt variant={project.art} id={`${context}-${project.slug}`} decorative={false} />
      </div>

      <section className={s.section}><h3>The problem</h3><p>{project.problem}</p></section>

      <section className={s.section}>
        <h3>What I built</h3>
        <ul className={s.built}>{project.built.map((b) => <li key={b.slice(0, 32)}>{b}</li>)}</ul>
      </section>

      <section className={s.section}>
        <h3>Result</h3>
        <ul className={s.outcomes}>
          {project.outcomes.map((o) => <li key={o.label}><strong>{o.value}</strong><span>{o.label}</span></li>)}
        </ul>
      </section>

      <section className={s.section}>
        <h3>Stack</h3>
        <ul className="tags">{project.stack.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <blockquote className={s.takeaway}>{project.takeaway}</blockquote>

      <footer className={s.cta}>
        <p>Like this work?</p>
        <a className="btn btn-primary" href={mailto}>Start a project</a>
        <a className="text-link" href="/#work">All work</a>
      </footer>
    </article>
  )
}

import { useRef, type MouseEvent } from 'react'
import { projects, type Project } from '../data/projects'
import { useInView } from '../hooks/useInView'
import { cx } from '../lib/cx'
import { ProjectArt } from './art/ProjectArt'
import { ProjectMedia } from './ProjectMedia'
import s from './Work.module.css'

function WorkRow({ project, onOpen }: { project: Project; onOpen?: (slug: string, trigger: HTMLElement) => void }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, 0.3)
  const href = `/work/${project.slug}/`
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onOpen || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onOpen(project.slug, e.currentTarget)
  }
  return (
    <li>
      <a ref={ref} href={href} className={cx(s.row, inView && 'is-in')} onClick={handle}>
        <div className={s.art}>
          {project.media ? <ProjectMedia media={project.media} name={project.client} /> : <ProjectArt variant={project.art} id={project.slug} />}
        </div>
        <div>
          <p className={s.meta}><span>{project.category}</span><span>{project.year}</span></p>
          <h3 className={s.title}><span>{project.title}</span></h3>
          <p className={s.outcome}>{project.outcomeLine}</p>
          <ul className="tags" aria-label="Stack">{project.stack.slice(0, 3).map((t) => <li key={t}>{t}</li>)}</ul>
          <div className={s.foot}>
            <span className={s.client}>{project.client}</span>
            <span className={s.cta}>Case study</span>
          </div>
        </div>
      </a>
    </li>
  )
}

export function Work({ onOpen }: { onOpen?: (slug: string, trigger: HTMLElement) => void }) {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head">
          <h2 id="work-title">Selected work</h2>
          <p>Seven projects since 2019, for clients you can look up.</p>
        </div>
        <ul className={s.list}>
          {projects.map((p) => <WorkRow key={p.slug} project={p} onOpen={onOpen} />)}
        </ul>
      </div>
    </section>
  )
}

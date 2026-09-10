import type { Project } from '../data/projects'
import { CaseStudy } from './CaseStudy'
import { Footer } from './Footer'
import { Nav } from './Nav'
import s from './CaseStudyPage.module.css'

export function CaseStudyPage({ project }: { project: Project }) {
  return (
    <>
      <Nav variant="case" />
      <main className={`container ${s.main}`}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <a href="/">Home</a><span aria-hidden="true">/</span>
          <a href="/#work">Work</a><span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <div className={s.inner}>
          <CaseStudy project={project} context="page" titleId="case-title" />
        </div>
      </main>
      <Footer />
    </>
  )
}

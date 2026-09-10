import { useCallback, useEffect, useMemo, useState } from 'react'
import { projectBySlug } from '../data/projects'
import { useDocumentHead } from '../hooks/useDocumentHead'
import { pageMeta } from '../lib/seo'
import { resolveRoute } from '../routes'
import { About } from './About'
import { CaseStudyModal } from './CaseStudyModal'
import { Contact } from './Contact'
import { Cv } from './Cv'
import { Hero } from './Hero'
import { Nav } from './Nav'
import { Process } from './Process'
import { ProofStrip } from './ProofStrip'
import { Testimonials } from './Testimonials'
import { Work } from './Work'
import { WorkedWith } from './WorkedWith'

interface ModalState {
  modal: true
  slug: string
}

export function Home() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const project = openSlug ? (projectBySlug(openSlug) ?? null) : null

  const open = useCallback((slug: string) => {
    const state: ModalState = { modal: true, slug }
    window.history.pushState(state, '', `/work/${slug}/`)
    setOpenSlug(slug)
  }, [])

  const navigate = useCallback((slug: string) => {
    const state: ModalState = { modal: true, slug }
    window.history.pushState(state, '', `/work/${slug}/`)
    setOpenSlug(slug)
  }, [])

  const close = useCallback(() => {
    const state = window.history.state as Partial<ModalState> | null
    if (state?.modal) window.history.back()
    else {
      window.history.replaceState(null, '', '/')
      setOpenSlug(null)
    }
  }, [])

  useEffect(() => {
    const onPop = () => {
      const route = resolveRoute(window.location.pathname)
      setOpenSlug(route.kind === 'case' ? route.project.slug : null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const meta = useMemo(() => (openSlug ? pageMeta(resolveRoute(`/work/${openSlug}/`)) : null), [openSlug])
  useDocumentHead(meta)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <WorkedWith />
        <Work onOpen={open} />
        <Process />
        <Testimonials />
        <About />
        <Cv />
      </main>
      <Contact />
      <CaseStudyModal project={project} onClose={close} onNavigate={navigate} />
    </>
  )
}

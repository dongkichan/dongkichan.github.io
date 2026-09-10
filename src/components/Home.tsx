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
  /** How many modal entries sit on the history stack above the home page. */
  depth: number
}

const modalState = (): ModalState | null => {
  const st = window.history.state as Partial<ModalState> | null
  return st?.modal ? (st as ModalState) : null
}

export function Home() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const project = openSlug ? (projectBySlug(openSlug) ?? null) : null

  const push = useCallback((slug: string) => {
    const depth = (modalState()?.depth ?? 0) + 1
    const state: ModalState = { modal: true, slug, depth }
    window.history.pushState(state, '', `/work/${slug}/`)
    setOpenSlug(slug)
  }, [])

  const open = push
  const navigate = push

  /** Close the modal completely, however many prev/next steps were pushed. */
  const close = useCallback(() => {
    const depth = modalState()?.depth ?? 0
    if (depth > 0) window.history.go(-depth)
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

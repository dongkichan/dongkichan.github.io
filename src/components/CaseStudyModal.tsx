import { useEffect, useRef } from 'react'
import { projects, type Project } from '../data/projects'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { CaseStudy } from './CaseStudy'
import s from './CaseStudyModal.module.css'

interface Props {
  project: Project | null
  onClose: () => void
  onNavigate: (slug: string) => void
}

export function CaseStudyModal({ project, onClose, onNavigate }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const open = project !== null
  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 })
  }, [project?.slug])

  if (!project) return null
  const index = projects.findIndex((p) => p.slug === project.slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]!
  const next = projects[(index + 1) % projects.length]!

  return (
    <div className={s.overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={panelRef} className={s.panel} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={s.top}>
          <button type="button" className={s.close} onClick={onClose} data-autofocus>Close</button>
          <span className={s.hint}>Esc closes, browser back works too</span>
        </div>
        <CaseStudy project={project} context="modal" titleId="modal-title" />
        <nav className={s.pager} aria-label="Other case studies">
          <button type="button" onClick={() => onNavigate(prev.slug)}><span>Previous</span><strong>{prev.title}</strong></button>
          <button type="button" onClick={() => onNavigate(next.slug)}><span>Next</span><strong>{next.title}</strong></button>
        </nav>
      </div>
    </div>
  )
}

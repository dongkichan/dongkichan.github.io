import { useEffect, useState } from 'react'
import type { Project } from '../data/projects'
import { sections } from '../data/sections'
import { useHydrated } from '../hooks/useHydrated'
import { shareTargets, shareText, shareUrl } from '../lib/share'
import s from './ShareLinks.module.css'

/**
 * Share row for a case study. The LinkedIn, X and email links are plain URLs
 * and work without JavaScript. The button copies the link on desktops and
 * opens the native share sheet on touch devices; it is hidden until JS runs.
 */
export function ShareLinks({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false)
  const hydrated = useHydrated()
  const native = hydrated && typeof navigator.share === 'function' && matchMedia('(pointer: coarse)').matches
  const url = shareUrl(project)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(timer)
  }, [copied])

  const share = async () => {
    if (native) {
      try {
        await navigator.share({ title: project.title, text: shareText(project), url })
        return
      } catch (err) {
        if ((err as DOMException).name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      /* Clipboard unavailable: the visible links still work. */
    }
  }

  const label = copied ? sections.share.copied : native ? sections.share.native : sections.share.copy
  return (
    <div className={s.share}>
      <span className={s.label}>{sections.share.label}</span>
      {shareTargets(project).map((t) => (
        <a key={t.label} href={t.href} {...(t.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {t.label}
        </a>
      ))}
      <button type="button" className={s.copy} onClick={share}>{label}</button>
      <span role="status" className="visually-hidden">{copied ? sections.share.copied : ''}</span>
    </div>
  )
}

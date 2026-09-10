import { useEffect } from 'react'
import type { PageMeta } from '../lib/seo'

const setAttr = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector<HTMLElement>(selector)
  const prev = el?.getAttribute(attr) ?? null
  el?.setAttribute(attr, value)
  return () => {
    if (el && prev !== null) el.setAttribute(attr, prev)
  }
}

/** While `meta` is set (a modal is open), swap title, canonical and og:url; restore on cleanup. */
export function useDocumentHead(meta: PageMeta | null): void {
  useEffect(() => {
    if (!meta) return
    const prevTitle = document.title
    document.title = meta.title
    const restores = [
      setAttr('link[rel="canonical"]', 'href', meta.url),
      setAttr('meta[property="og:url"]', 'content', meta.url),
      setAttr('meta[name="description"]', 'content', meta.description),
    ]
    return () => {
      document.title = prevTitle
      restores.forEach((r) => r())
    }
  }, [meta])
}

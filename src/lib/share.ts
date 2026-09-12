import { profile } from '../data/profile'
import type { Project } from '../data/projects'
import { sections } from '../data/sections'
import { absolute } from './url'

export interface ShareTarget {
  label: string
  href: string
}

/** The canonical case-study URL, the one that carries the share card. */
export const shareUrl = (project: Pick<Project, 'slug'>): string => absolute(`/work/${project.slug}/`)

/** One line for a post, subject line, or native share sheet. */
export const shareText = (project: Pick<Project, 'title'>): string =>
  `${project.title} — ${sections.share.blurb} ${profile.name}`

/** Plain links that work without JavaScript: LinkedIn, X, and email. */
export function shareTargets(project: Pick<Project, 'slug' | 'title' | 'tagline'>): readonly ShareTarget[] {
  const url = shareUrl(project)
  const text = shareText(project)
  const q = encodeURIComponent
  return [
    { label: sections.share.targets.linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${q(url)}` },
    { label: sections.share.targets.x, href: `https://x.com/intent/post?url=${q(url)}&text=${q(text)}` },
    { label: sections.share.targets.email, href: `mailto:?subject=${q(text)}&body=${q(`${project.tagline}\n\n${url}`)}` },
  ]
}

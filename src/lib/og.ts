import type { Project } from '../data/projects'

/** Size of the share card each case study renders for Open Graph and Twitter previews. */
export const OG_CARD = { width: 1200, height: 630 } as const

/** Path of a case study's share card. Rendered by `npm run og` and committed. */
export const ogCardPath = (project: Pick<Project, 'slug'>): string => `/assets/images/og/${project.slug}.png`

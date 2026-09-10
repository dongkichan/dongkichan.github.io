import { projects, type Project } from './data/projects'
import { normalizeRoutePath } from './lib/url'

export type Route =
  | { kind: 'home'; path: '/' }
  | { kind: 'case'; path: string; project: Project }
  | { kind: 'notFound'; path: '/404/' }

export const homeRoute: Route = { kind: 'home', path: '/' }
export const notFoundRoute: Route = { kind: 'notFound', path: '/404/' }

export const caseRoutes: readonly Route[] = projects.map((project) => ({
  kind: 'case' as const,
  path: `/work/${project.slug}/`,
  project,
}))

/** Every prerendered route, in sitemap order. */
export const routes: readonly Route[] = [homeRoute, ...caseRoutes, notFoundRoute]

export function resolveRoute(pathname: string): Route {
  const path = normalizeRoutePath(pathname)
  return routes.find((r) => r.path === path && r.kind !== 'notFound') ?? notFoundRoute
}

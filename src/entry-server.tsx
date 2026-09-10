import { renderToString } from 'react-dom/server'
import { App } from './App'
import { routes, type Route } from './routes'
import { buildHead } from './lib/seo'
import './styles/index.css'

export { routes }

export function render(route: Route): { html: string; head: string } {
  return { html: renderToString(<App route={route} />), head: buildHead(route) }
}

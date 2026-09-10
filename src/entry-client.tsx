import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { resolveRoute } from './routes'
import { TOKENS } from './lib/template'
import './styles/index.css'

const el = document.getElementById('root')
if (el) {
  const stamped = el.dataset.route
  const path = stamped && stamped !== TOKENS.route ? stamped : window.location.pathname
  hydrateRoot(el, <App route={resolveRoute(path)} />, {
    onRecoverableError: (err) => console.error('[hydration]', err),
  })
}

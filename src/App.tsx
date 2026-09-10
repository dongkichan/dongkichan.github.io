import type { Route } from './routes'
import { Home } from './components/Home'
import { CaseStudyPage } from './components/CaseStudyPage'
import { NotFound } from './components/NotFound'
import { Sky } from './components/Sky'

function Page({ route }: { route: Route }) {
  switch (route.kind) {
    case 'home':
      return <Home />
    case 'case':
      return <CaseStudyPage project={route.project} />
    case 'notFound':
      return <NotFound />
  }
}

export function App({ route }: { route: Route }) {
  return (
    <>
      <Sky />
      <Page route={route} />
    </>
  )
}

import { projects } from '../data/projects'
import { Footer } from './Footer'
import { Nav } from './Nav'

export function NotFound() {
  return (
    <>
      <Nav variant="case" />
      <main className="container section" style={{ minHeight: '60vh' }}>
        <h1 style={{ marginBottom: 20 }}>That page moved.</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '40em', marginBottom: 32, fontSize: 'var(--fs-lead)' }}>
          Nothing lives at this address. The work, the CV, and a way to get in touch are all on the home page.
        </p>
        <a className="btn btn-primary" href="/">Go to the home page</a>
        <h2 style={{ fontSize: 'var(--fs-h3)', margin: '56px 0 16px' }}>Or jump to a case study</h2>
        <ul style={{ display: 'grid', gap: 10 }}>
          {projects.map((p) => <li key={p.slug}><a className="text-link" href={`/work/${p.slug}/`}>{p.title}</a></li>)}
        </ul>
      </main>
      <Footer />
    </>
  )
}

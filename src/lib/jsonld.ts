import { profile } from '../data/profile'
import { projects, type Project } from '../data/projects'
import { knowsAbout } from '../data/skills'
import { awards, certifications, education } from '../data/credentials'
import { SITE_ORIGIN, absolute } from './url'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonLd = Record<string, any>

/** Serialise for a <script type="application/ld+json"> block without letting `</script>` break out. */
export const safeJsonLd = (obj: JsonLd): string => JSON.stringify(obj).replace(/</g, '\\u003c')

const person = (): JsonLd => ({
  '@type': 'Person',
  name: profile.name,
  url: SITE_ORIGIN,
})

export function homeJsonLd(): JsonLd[] {
  const image = absolute(profile.photo.jpg)
  return [
    {
      '@context': 'https://schema.org',
      '@type': ['Person', 'ProfessionalService'],
      name: profile.name,
      alternateName: profile.alternateName,
      jobTitle: profile.title,
      description: profile.seo.description,
      url: SITE_ORIGIN,
      email: `mailto:${profile.email}`,
      image: { '@type': 'ImageObject', url: image, width: profile.photo.width, height: profile.photo.height },
      sameAs: profile.socials.map((s) => s.href),
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.location.city,
        addressRegion: profile.location.region,
        addressCountry: profile.location.country,
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: education.school,
        address: { '@type': 'PostalAddress', addressLocality: 'Cebu City', addressCountry: 'Philippines' },
      },
      knowsAbout: [...knowsAbout],
      hasOccupation: {
        '@type': 'Occupation',
        name: profile.title,
        occupationLocation: { '@type': 'Country', name: profile.location.country },
        skills: [
          'React', 'Next.js', 'Vite', 'TypeScript', 'Angular', 'Spring Boot', 'Azure Automation', 'Workflow Automation',
          'Systems Integration', 'ConnectWise PSA', 'Microsoft Graph', 'Python', 'AI-Augmented Engineering', 'Claude Code', 'Azure Static Web Apps',
        ],
      },
      worksFor: { '@type': 'Organization', name: 'Greene Information Systems' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'professional',
        email: profile.email,
        availableLanguage: ['English', 'Filipino'],
      },
      award: awards.map((a) => `${a.name} — ${a.issuer} (${a.date})`),
      hasCredential: certifications.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: 'Certification',
        recognizedBy: { '@type': 'Organization', name: c.issuer },
        ...(c.date ? { dateCreated: c.date } : {}),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: profile.seo.siteName,
      alternateName: `${profile.alternateName} Portfolio`,
      url: SITE_ORIGIN,
      description: profile.seo.description,
      author: person(),
      inLanguage: 'en-US',
      copyrightYear: String(profile.copyrightYear),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Selected work — ${profile.name}`,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absolute(`/work/${p.slug}/`),
        name: p.title,
      })),
    },
  ]
}

export function caseJsonLd(project: Project): JsonLd[] {
  const url = absolute(`/work/${project.slug}/`)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.seoDescription,
      url,
      author: person(),
      creator: { '@type': 'Person', name: profile.name },
      keywords: project.stack.join(', '),
      about: project.category,
      sourceOrganization: { '@type': 'Organization', name: project.client },
      dateCreated: project.year,
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
        { '@type': 'ListItem', position: 2, name: 'Work', item: absolute('/#work') },
        { '@type': 'ListItem', position: 3, name: project.title, item: url },
      ],
    },
  ]
}

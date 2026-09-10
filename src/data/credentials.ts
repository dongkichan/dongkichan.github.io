export interface Award {
  name: string
  issuer: string
  date: string
}

export interface Certification {
  name: string
  issuer: string
  date?: string
  image?: { webp: string; jpg: string; width: number; height: number; alt: string }
}

export const awards: readonly Award[] = [
  { name: 'Top Rated Plus', issuer: 'Upwork', date: 'May 2024' },
  { name: 'Recommended by the Global Head of Engineering', issuer: 'Indicia Worldwide', date: 'Jul 2025' },
  { name: 'STARS Big Thank You Award', issuer: 'Fujitsu GDC Philippines', date: 'Jun 2021' },
]

export const certifications: readonly Certification[] = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { name: 'Certified Software Engineer', issuer: 'HackerRank', date: 'Aug 2025' },
  {
    name: 'Angular (Intermediate)',
    issuer: 'HackerRank',
    date: 'Dec 2024',
    image: {
      webp: '/assets/images/webp/hackerrank-angular-intermediate-certificate.webp',
      jpg: '/assets/images/optimized/hackerrank-angular-intermediate-certificate.jpg',
      width: 796,
      height: 606,
      alt: 'HackerRank Angular Intermediate certificate',
    },
  },
  { name: 'SQL (Intermediate)', issuer: 'HackerRank', date: 'Aug 2025' },
  {
    name: 'Lean Six Sigma Yellow Belt',
    issuer: 'Six Sigma Institute',
    date: 'Jun 2025',
    image: {
      webp: '/assets/images/webp/lean-six-sigma-yellow-belt-certificate.webp',
      jpg: '/assets/images/optimized/lean-six-sigma-yellow-belt-certificate.jpg',
      width: 1000,
      height: 707,
      alt: 'Lean Six Sigma Yellow Belt certificate',
    },
  },
  { name: 'Spring Framework: Dependency Injection', issuer: 'Pivotal' },
]

export const education = {
  degree: 'B.S. Computer Engineering',
  school: 'Cebu Institute of Technology — University',
  years: '2014 — 2019',
  logo: {
    webp: '/assets/images/webp/cebu-institute-technology-university-logo.webp',
    png: '/assets/images/optimized/cebu-institute-technology-university-logo.png',
    width: 400,
    height: 79,
    alt: 'Cebu Institute of Technology University logo',
  },
}

export interface Stat {
  /** Numeric target for the count-up. */
  value: number
  /** Final rendered text (what screen readers and no-JS visitors get). */
  display: string
  label: string
  /** Optional formatter for intermediate count-up values. */
  format?: 'plain' | 'thousands'
  suffix?: string
}

export const stats: readonly Stat[] = [
  { value: 7, display: '7+', suffix: '+', label: 'Years shipping production software' },
  { value: 15, display: '15 / 15', suffix: ' / 15', label: 'Upwork projects delivered' },
  { value: 3400, display: '3,400+', suffix: '+', format: 'thousands', label: 'Hours billed on Upwork' },
  { value: 100, display: '100%', suffix: '%', label: 'Job success score' },
]

/** The badge beside the numbers. */
export const upworkBadge = {
  title: 'Top Rated Plus',
  subtitle: 'Top 10% of talent on Upwork',
  detail: '100% job success, every contract delivered',
  href: 'https://www.upwork.com/freelancers/cpgastardo',
  logo: { src: '/assets/images/logos/upwork.svg', width: 120, height: 60, alt: 'Upwork' },
}

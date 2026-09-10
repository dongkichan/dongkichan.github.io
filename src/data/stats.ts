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
  { value: 2600, display: '2,600+', suffix: '+', format: 'thousands', label: 'Hours billed to clients' },
  { value: 100, display: '100%', suffix: '%', label: 'Job success score' },
]

export const statsCaption = 'Upwork Top Rated Plus, top 10% of talent.'

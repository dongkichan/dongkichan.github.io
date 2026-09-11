export interface Testimonial {
  quote: string
  name: string
  title: string
  source: 'LinkedIn' | 'Upwork'
  date: string
  href: string
  /** Words to set in the accent colour. Must appear verbatim in `quote`. */
  highlights: readonly string[]
}

const LINKEDIN = 'https://www.linkedin.com/in/cgastardo/details/recommendations/'
const UPWORK = 'https://www.upwork.com/freelancers/cpgastardo'

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Tremendously impressed by Christian's speed, diligence, and technical expertise. He ramped up on a highly complex SaaS project and immediately began contributing with clarity and confidence. I would not hesitate to recommend him.",
    name: 'Andrew McSherry',
    title: 'Global Head of Engineering, Indicia Worldwide',
    source: 'LinkedIn',
    date: 'Jul 2025',
    href: LINKEDIN,
    highlights: ['would not hesitate to recommend him'],
  },
  {
    quote:
      'He is a very fast learner. We were looking for a React person, and Christian was an Angular developer. Within weeks he had picked it up. He gets the job done.',
    name: 'Luis Daniel Pambid',
    title: 'Software Engineer and mentor, Greene Information Systems',
    source: 'LinkedIn',
    date: 'Aug 2026',
    href: LINKEDIN,
    highlights: ['He gets the job done'],
  },
  {
    quote:
      'An outstanding software engineer. From the moment he joined, he made an immediate impact through his strong Angular expertise. Excellent work ethic, reliable, proactive — a true asset to any organization.',
    name: 'Dean Robbie Tan',
    title: 'Direct manager',
    source: 'LinkedIn',
    date: 'Jul 2025',
    href: LINKEDIN,
    highlights: ['reliable'],
  },
  {
    quote: 'Very knowledgeable, reliable, responsive and cooperative. Always committed to the task given. Truly great to work with him.',
    name: 'Nur',
    title: 'Upwork client',
    source: 'Upwork',
    date: 'Feb 2023',
    href: UPWORK,
    highlights: ['reliable'],
  },
  {
    quote:
      'Easy to communicate, dedicated, knowledgeable. He understood requirements well and delivered flawlessly. Will definitely hire him again.',
    name: 'Jane',
    title: 'Upwork client',
    source: 'Upwork',
    date: 'Mar 2022',
    href: UPWORK,
    highlights: ['delivered flawlessly', 'Will definitely hire him again'],
  },
]

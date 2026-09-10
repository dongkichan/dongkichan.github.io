import type { ProjectMedia as Media } from '../data/projects'
import s from './ProjectMedia.module.css'

/** Real imagery for a project: a public site in a browser frame, or a client logo card. */
export function ProjectMedia({ media, name, lazy = true }: { media: Media; name: string; lazy?: boolean }) {
  if (media.kind === 'logo') {
    const isWordmark = media.width / media.height > 1.6
    return (
      <div className={s.logoCard}>
        <div className={s.logoInner}>
          <img src={media.src} width={media.width} height={media.height} alt={media.alt} loading={lazy ? 'lazy' : 'eager'} decoding="async" />
          {isWordmark ? null : <span className={s.logoName}>{name}</span>}
        </div>
        <span className={s.caption}>{media.caption}</span>
      </div>
    )
  }
  return (
    <div className={s.frame}>
      <div className={s.bar} aria-hidden="true">
        <span className={s.dots}><i /><i /><i /></span>
        <span className={s.url}>{media.caption}</span>
      </div>
      <div className={s.shot}>
        <picture>
          {media.fallback ? <source srcSet={media.src} type="image/webp" /> : null}
          <img src={media.fallback ?? media.src} width={media.width} height={media.height} alt={media.alt} loading={lazy ? 'lazy' : 'eager'} decoding="async" />
        </picture>
      </div>
    </div>
  )
}

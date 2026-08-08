import type { CSSProperties } from 'react'

/**
 * Letters lifted by a swell passing under them — left to right, one crest.
 * Splits for the eye only; the whole word stays one label for screen readers.
 */
export default function SwellText({
  text,
  delay = 0,
  className = '',
}: {
  text: string
  delay?: number
  className?: string
}) {
  return (
    <span className={`swell ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="swell__ch"
          aria-hidden="true"
          style={{ '--i': i, '--delay': `${delay}ms` } as CSSProperties}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

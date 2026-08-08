import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

type Variant = 'rise' | 'drift' | 'sink'

type Props = {
  children: ReactNode
  /** How the element arrives. `drift` comes in from the side, as if on a current. */
  variant?: Variant
  /** Stagger in ms. Also offsets the scroll range so grid siblings land in sequence. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Scroll reveal. Where the browser supports scroll-driven animations the
 * reveal is scrubbed by scroll position (see §11 of App.css), so content
 * renders itself in as you move down the page instead of snapping in once.
 * The observer below is the fallback, and also flips `is-in` for the effects
 * that hang off it (the wake trails, the sounding bars).
 */
export default function Reveal({
  children,
  variant = 'rise',
  delay = 0,
  className = '',
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const Tag = as as 'div'

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        node.classList.add('is-in')
        io.disconnect()
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-reveal={variant}
      style={
        delay
          ? ({ transitionDelay: `${delay}ms`, '--stagger': `${delay / 14}%` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  )
}

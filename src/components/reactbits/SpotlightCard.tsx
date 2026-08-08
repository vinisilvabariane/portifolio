import { useRef, type MouseEvent, type ReactNode } from 'react'

// Card with an inspection light that tracks the cursor.
export default function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div ref={ref} className={`spot ${className}`} onMouseMove={onMove}>
      <div className="spot__light" aria-hidden="true" />
      <div className="spot__inner">{children}</div>
    </div>
  )
}

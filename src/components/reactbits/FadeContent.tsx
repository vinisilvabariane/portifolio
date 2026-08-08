import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = { children: ReactNode; delay?: number }

// Reveal wrapper. In browsers with CSS scroll-driven animations the reveal is
// scrubbed by scroll position (see .fade-content in App.css); the observer here
// is the fallback for other browsers and also flips `is-visible` for effects
// (like the stat meters) that key off it.
export default function FadeContent({ children, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`fade-content ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Typewriter that cycles through phrases — the hero's rotating role readout.
export default function TextType({
  phrases,
  className = '',
  typeSpeed = 55,
  deleteSpeed = 28,
  pause = 1600,
}: {
  phrases: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}) {
  const reduced = usePrefersReducedMotion()
  const [text, setText] = useState(phrases[0] ?? '')

  useEffect(() => {
    if (reduced) {
      setText(phrases[0] ?? '')
      return
    }
    let mounted = true
    let timer: number | undefined
    let phase: 'typing' | 'pausing' | 'deleting' = 'typing'
    let idx = 0
    let char = 0

    const tick = () => {
      if (!mounted) return
      const current = phrases[idx % phrases.length]
      if (phase === 'typing') {
        char++
        setText(current.slice(0, char))
        if (char >= current.length) {
          phase = 'pausing'
          timer = window.setTimeout(tick, pause)
        } else {
          timer = window.setTimeout(tick, typeSpeed)
        }
      } else if (phase === 'pausing') {
        phase = 'deleting'
        timer = window.setTimeout(tick, deleteSpeed)
      } else {
        char--
        setText(current.slice(0, Math.max(0, char)))
        if (char <= 0) {
          idx++
          phase = 'typing'
          timer = window.setTimeout(tick, typeSpeed)
        } else {
          timer = window.setTimeout(tick, deleteSpeed)
        }
      }
    }

    setText('')
    timer = window.setTimeout(tick, 500)
    return () => {
      mounted = false
      if (timer) window.clearTimeout(timer)
    }
  }, [phrases, reduced, typeSpeed, deleteSpeed, pause])

  return (
    <span className={className}>
      {text}
      <span className="type-caret" aria-hidden="true">▍</span>
    </span>
  )
}

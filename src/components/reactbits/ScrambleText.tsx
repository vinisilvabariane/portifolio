import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const GLYPHS = '!<>-_\\/[]{}=+*^?#/////0123456789ABCDEFXZ'

// Decrypts text out of random glyphs, left to right — the console "acquiring signal".
export default function ScrambleText({
  text,
  className = '',
  delay = 0,
  speed = 2,
}: {
  text: string
  className?: string
  delay?: number
  speed?: number
}) {
  const reduced = usePrefersReducedMotion()
  const [out, setOut] = useState(reduced ? text : '')

  useEffect(() => {
    if (reduced) {
      setOut(text)
      return
    }
    let raf = 0
    let frame = 0
    const startFrames = delay / 16
    const run = () => {
      frame++
      if (frame < startFrames) {
        raf = requestAnimationFrame(run)
        return
      }
      const revealed = Math.floor((frame - startFrames) / speed)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          s += ' '
          continue
        }
        s += i < revealed ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setOut(s)
      if (revealed < text.length) raf = requestAnimationFrame(run)
      else setOut(text)
    }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [text, reduced, delay, speed])

  return (
    <span className={className} aria-label={text}>
      {out || ' '}
    </span>
  )
}

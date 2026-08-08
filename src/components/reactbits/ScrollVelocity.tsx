import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Marquee whose speed follows scroll velocity — data throughput you can feel.
// Width is measured once (not per frame) and the loop pauses when off-screen.
export default function ScrollVelocity({
  text,
  baseSpeed = 1.1,
  className = '',
}: {
  text: string
  baseSpeed?: number
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const bandRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const band = bandRef.current
    const track = trackRef.current
    if (!band || !track || reduced) return

    let raf = 0
    let running = false
    let offset = 0
    let vel = 0
    let last = window.scrollY
    let half = track.scrollWidth / 2

    const measure = () => {
      half = track.scrollWidth / 2
    }
    const ro = new ResizeObserver(measure)
    ro.observe(track)

    const onScroll = () => {
      const y = window.scrollY
      vel += y - last
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const loop = () => {
      vel *= 0.9
      offset -= baseSpeed + Math.abs(vel) * 0.3
      if (half > 0) {
        if (offset <= -half) offset += half
        if (offset > 0) offset -= half
      }
      track.style.transform = `translate3d(${offset}px,0,0)`
      raf = requestAnimationFrame(loop)
    }

    // only animate while the band is on screen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        raf = requestAnimationFrame(loop)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(band)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced, baseSpeed])

  return (
    <div className={`svel ${className}`} aria-hidden="true" ref={bandRef}>
      <div className="svel__track" ref={trackRef}>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}

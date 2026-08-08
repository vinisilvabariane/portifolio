import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../reactbits/usePrefersReducedMotion'

export type Leg = { deg: number; point: string; label: string }

/**
 * The heading readout. Each focus area sits on its own bearing; the degrees
 * roll round to the new course and the label rolls up behind them, the way a
 * repeater swings when the helm comes over.
 */
export default function Bearing({
  legs,
  index,
  hold = 3200,
  onChange,
}: {
  legs: Leg[]
  index: number
  hold?: number
  onChange: (next: number) => void
}) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(legs[index].deg)
  const raf = useRef(0)

  // Advance the course on a timer; the parent owns the index so the compass
  // and the readout are never out of step.
  useEffect(() => {
    if (reduced) return
    const t = window.setTimeout(() => onChange((index + 1) % legs.length), hold)
    return () => window.clearTimeout(t)
  }, [index, legs.length, hold, onChange, reduced])

  // Roll the degrees the short way round, as a card would turn.
  useEffect(() => {
    const target = legs[index].deg
    if (reduced) {
      setShown(target)
      return
    }
    const from = shown
    const delta = ((target - from + 540) % 360) - 180
    const t0 = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 900)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown((from + delta * eased + 360) % 360)
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
    // `shown` is the animation's start point, intentionally read once per leg.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, legs, reduced])

  const leg = legs[index]

  return (
    <span className="bearing">
      <span className="bearing__deg">
        {String(Math.round(shown)).padStart(3, '0')}
        <i>°</i>
      </span>
      <span className="bearing__pt">{leg.point}</span>
      <span className="bearing__roll">
        <span key={index} className="bearing__label">
          {leg.label}
        </span>
      </span>
    </span>
  )
}

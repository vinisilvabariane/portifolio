import { useCallback, useRef } from 'react'
import { usePrefersReducedMotion } from '../reactbits/usePrefersReducedMotion'
import { useDepth } from './useDepth'

const POINTS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']

/**
 * The hero instrument, built as a binnacle: the card swings under a fixed
 * lubber line, so you read the heading where the two meet. It follows the
 * bearing the readout is showing, and carries a little scroll-driven sway
 * on top — a compass at sea never sits perfectly still.
 */
export default function CompassRose({ bearing }: { bearing: number }) {
  const swayRef = useRef<SVGGElement>(null)
  const reduced = usePrefersReducedMotion()

  const onDepth = useCallback(
    (d: number) => {
      if (reduced || !swayRef.current) return
      swayRef.current.style.transform = `rotate(${Math.sin(d * 9) * 3.5}deg)`
    },
    [reduced],
  )
  useDepth(onDepth)

  const ticks = []
  for (let i = 0; i < 72; i++) {
    const major = i % 9 === 0
    ticks.push(
      <line
        key={i}
        x1="100"
        y1={major ? 15 : 18}
        x2="100"
        y2={major ? 27 : 23}
        transform={`rotate(${i * 5} 100 100)`}
        stroke="currentColor"
        strokeWidth={major ? 1.3 : 0.7}
        opacity={major ? 0.8 : 0.35}
      />,
    )
  }

  return (
    <svg
      className="rose"
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Rosa dos ventos no rumo ${Math.round(bearing)} graus`}
    >
      <g ref={swayRef} className="rose__sway">
        <g className="rose__card" style={{ transform: `rotate(${-bearing}deg)` }}>
          <circle className="rose__ring" cx="100" cy="100" r="90" />
          <circle className="rose__ring rose__ring--inner" cx="100" cy="100" r="72" />
          {ticks}
          {POINTS.map((p, i) => (
            <text
              key={p}
              x="100"
              y="44"
              className={`rose__pt ${i === 0 ? 'rose__pt--n' : ''}`}
              textAnchor="middle"
              transform={`rotate(${i * 45} 100 100)`}
            >
              {p}
            </text>
          ))}
          {/* Star of the rose: eight rhumbs, each half in light and half in shadow. */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 100 100)`}>
              <path className="rose__ray rose__ray--light" d="M100 100 L100 52 L107 100 Z" />
              <path className="rose__ray rose__ray--dark" d="M100 100 L100 52 L93 100 Z" />
            </g>
          ))}
          <path className="rose__north" d="M100 100 L93 100 L100 40 L107 100 Z" />
          <circle className="rose__pin" cx="100" cy="100" r="4.5" />
        </g>
      </g>
      {/* Lubber line — fixed to the ship, not to the card. Read the heading here. */}
      <line className="rose__lubber" x1="100" y1="2" x2="100" y2="34" />
    </svg>
  )
}

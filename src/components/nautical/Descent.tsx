import { useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { usePrefersReducedMotion } from '../reactbits/usePrefersReducedMotion'
import { useDepth } from './useDepth'

/**
 * Submarines running ahead of you on the way down. They lead rather than
 * follow: each descends faster than the page does, at its own rate, so the
 * three of them keep opening the distance below.
 *
 * Scroll only ever writes `y` and `opacity` through a gsap.quickTo, which
 * gives the movement a little lag — the weight a submarine ought to have —
 * without a layout pass anywhere.
 */
const SUBS = [
  { left: '9%', scale: 1, rate: 1, flip: false, tint: 'a' },
  { left: '72%', scale: 0.62, rate: 1.42, flip: true, tint: 'b' },
  { left: '43%', scale: 0.4, rate: 0.72, flip: false, tint: 'b' },
]

export default function Descent() {
  const root = useRef<HTMLDivElement>(null)
  const setters = useRef<((v: number) => void)[]>([])
  const nodes = useRef<HTMLElement[]>([])

  const onDepth = useCallback((d: number) => {
    const vh = window.innerHeight
    SUBS.forEach((s, i) => {
      const set = setters.current[i]
      const node = nodes.current[i]
      if (!set || !node) return
      set((-0.32 + d * 1.62 * s.rate) * vh)
      // Surface and abyss both belong to other scenes — appear only between
      // them, and never solid enough to compete with the type they pass behind.
      const fade =
        0.55 * Math.min(1, Math.max(0, (d - 0.05) * 9), Math.max(0, (0.95 - d) * 9))
      node.style.opacity = fade.toFixed(3)
    })
  }, [])
  useDepth(onDepth)

  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>('.sub')
      nodes.current = els
      setters.current = els.map((el) =>
        reduced
          ? (v: number) => gsap.set(el, { y: v })
          : gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power2.out' }),
      )
      if (reduced) return

      gsap.to('.sub__screw', { rotation: 360, duration: 1.1, ease: 'none', repeat: -1, svgOrigin: '14 30' })
      gsap.to('.sub__hull', {
        rotation: 3,
        y: 5,
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.7,
      })
      gsap.to('.sub__lamp', { opacity: 0.85, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <div className="descent" ref={root} aria-hidden="true">
      <svg className="descent__defs">
        <defs>
          <linearGradient id="subBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe6ae" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffe6ae" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {SUBS.map((s, i) => (
        <div key={i} className="sub" style={{ left: s.left, opacity: 0 }}>
          {/* The scale lives on an inner wrapper, never on `.sub` itself:
              GSAP writes `scale: none` onto any element whose transform it
              drives, and it drives `y` here — a scale set on `.sub` would be
              wiped the first time the scroll moved, flattening all three
              boats to the same size. */}
          <div className="sub__rig" style={{ scale: String(s.scale) }}>
          <svg
            className={`sub__svg sub__svg--${s.tint}`}
            viewBox="0 0 220 120"
            width="220"
            height="120"
            style={s.flip ? { transform: 'scaleX(-1)' } : undefined}
          >
            <g className="sub__hull">
              {/* Screw first, so the hull covers its shaft */}
              <g className="sub__screw" transform="translate(14 30)">
                <ellipse cx="0" cy="0" rx="4" ry="14" className="sub__metal" />
                <ellipse cx="0" cy="0" rx="14" ry="4" className="sub__metal" opacity="0.55" />
              </g>
              <path d="M22 30h30v0z" className="sub__metal" />
              <path d="M30 22h26v16H30z" className="sub__metal" />

              {/* Hull */}
              <path d="M46 30q0-20 62-20t66 20q-4 20-66 20t-62-20z" className="sub__body" />
              {/* Conning tower */}
              <path d="M96 12h30q4 0 4 5v6H92v-6q0-5 4-5z" className="sub__body" />
              <path d="M108 2v10" className="sub__mast" />
              <path d="M108 3h11" className="sub__mast" />
              {/* Dive planes */}
              <path d="M148 30q16-2 24 6-14 4-24 1z" className="sub__metal" />

              {/* Portholes */}
              <circle cx="86" cy="30" r="4.5" className="sub__glass" />
              <circle cx="102" cy="31" r="4.5" className="sub__glass" />
              <circle cx="118" cy="31" r="4.5" className="sub__glass" />

              {/* Searchlight, aimed down the way you are going */}
              <circle className="sub__lamp" cx="168" cy="34" r="5" />
              <path className="sub__beam" d="M168 36 L206 118 L128 118z" />
            </g>
          </svg>

            <span className="sub__bubbles">
              <i /><i /><i />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

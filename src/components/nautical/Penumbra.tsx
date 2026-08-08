import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../reactbits/usePrefersReducedMotion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * The passage where the light gives out — the real ocean has one, between the
 * sunlit water and the dark, and the page needs one for the same reason: it
 * is the only stretch long enough to change the water underneath the type
 * without ever putting type on water that can't hold it.
 *
 * So it carries no reading matter. Just the descent: a school going down with
 * you, and the marker where the sun stops.
 */
const FISH = Array.from({ length: 14 }, (_, i) => ({
  x: 8 + ((i * 37) % 84),
  y: 12 + ((i * 53) % 70),
  s: 0.5 + ((i * 7) % 10) / 10,
  d: (i % 5) * 0.7,
}))

export default function Penumbra() {
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reduced) return

      // The school sinks past you as you pass through.
      gsap.to('.penumbra__fish', {
        yPercent: -130,
        ease: 'none',
        stagger: { each: 0.08, from: 'random' },
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
      gsap.to('.penumbra__fish', {
        rotation: (i) => (i % 2 ? 5 : -5),
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.09,
      })
      gsap.fromTo(
        '.penumbra__mark',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.penumbra__mark', start: 'top 88%', end: 'top 45%', scrub: 0.5 },
        },
      )
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section className="penumbra" id="penumbra" ref={root} aria-hidden="true">
      <span className="penumbra__thread" />

      {FISH.map((f, i) => (
        // Sized by attribute, not by a CSS scale: GSAP drives this element's
        // transform and writes `scale: none` onto it, which would have made
        // every fish in the school exactly the same size.
        <svg
          key={i}
          className="penumbra__fish"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          width={40 * f.s}
          height={16 * f.s}
          viewBox="0 0 40 16"
        >
          <path d="M12 8q7-7 18-6 6 1 8 6-2 5-8 6-11 1-18-6z" />
          <path d="M12 8 2 2v12z" />
        </svg>
      ))}

      <p className="penumbra__mark">
        <span>zona de penumbra</span>
        <b>a luz para aqui</b>
      </p>
    </section>
  )
}

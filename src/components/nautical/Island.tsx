import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { usePrefersReducedMotion } from '../reactbits/usePrefersReducedMotion'
import { useDepth } from './useDepth'
import { css, waterAtY, type RGB } from './water'

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, CustomWiggle)
CustomWiggle.create('waveHand', { wiggles: 6, type: 'easeOut' })

/**
 * The surface. Everything above the waterline lives here: sky, island, palm,
 * and the one person on it, working in the shade.
 *
 * All idle motion is transform/opacity on a handful of groups, so the whole
 * scene stays on the compositor. Scroll drives one parallax tween — the
 * surface pulls away overhead as the page descends.
 */

const WAVE_WL = 240 // wavelength; 1440 is an exact multiple, so the loop is seamless

/** The crest line itself, open — used both as the fill's top edge and as foam. */
function crestPath(baseY: number, amp: number, phase: number, width = 2880) {
  let d = `M0 ${(baseY + Math.sin(phase) * amp).toFixed(1)}`
  for (let x = 20; x <= width; x += 20) {
    const y = baseY + Math.sin((x / WAVE_WL) * Math.PI * 2 + phase) * amp
    d += ` L${x} ${y.toFixed(1)}`
  }
  return d
}

/**
 * The same crest, closed well past the bottom of the frame — the swell bobs
 * vertically, and closing exactly at 900 would open a gap under it.
 */
function wavePath(baseY: number, amp: number, phase: number, width = 2880) {
  return `${crestPath(baseY, amp, phase, width)} L${width} 960 L0 960 Z`
}

const FRONDS = [
  { rot: -46, scale: 1.0 },
  { rot: 4, scale: 0.92 },
  { rot: 44, scale: 0.86 },
  { rot: 130, scale: 0.9 },
  { rot: 176, scale: 1.02 },
  { rot: 220, scale: 0.88 },
]

/**
 * Kept to the right half of the frame on purpose: the scene is anchored
 * xMax, so anything further left is the first thing a narrow viewport crops.
 * Gulls work the shore anyway, and the shore is over there.
 */
const GULLS = [
  { x: 628, y: 170, s: 1.15, o: 0.8 },
  { x: 784, y: 234, s: 0.78, o: 0.65 },
  { x: 928, y: 142, s: 0.6, o: 0.5 },
  { x: 1062, y: 206, s: 0.92, o: 0.72 },
  { x: 1158, y: 120, s: 0.5, o: 0.42 },
]

/** Gusts crossing the sky — start off the left edge, blow out past the right. */
const GUSTS = [
  { y: 196, len: 190, lift: 13 },
  { y: 292, len: 140, lift: 9 },
  { y: 388, len: 220, lift: 15 },
  { y: 470, len: 120, lift: 7 },
  { y: 604, len: 170, lift: 10 },
]

export default function Island() {
  const root = useRef<SVGSVGElement>(null)
  const [waving, setWaving] = useState(false)
  const reduced = usePrefersReducedMotion()

  const heroH = useRef(0)
  useEffect(() => {
    const measure = () => {
      const hero = root.current?.closest('.hero') as HTMLElement | null
      heroH.current = hero?.offsetHeight ?? window.innerHeight
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /**
   * Keep the hero's water on exactly the colour the canvas is painting at the
   * fold. Matching once at the top is not enough — the canvas darkens as you
   * scroll while an SVG fill would not, and the mismatch shows up as a hard
   * line across the page. Because the two agree, the scene's fade-out blends
   * invisibly whatever its opacity is.
   *
   * Only the near crest is pinned to the seam. The layers behind it are
   * derived by tone, not by depth: water further off reflects more sky and
   * reads darker, and deriving them from depth instead put all three within a
   * few RGB values of each other, which flattened the swell into one sheet.
   */
  const onDepth = useCallback((d: number, y: number) => {
    const svg = root.current
    if (!svg) return
    const seam = waterAtY(d, (heroH.current - y) / window.innerHeight)
    // Toward the horizon: less light off the surface, more of the water itself.
    const off: RGB = [
      Math.round(seam[0] * 0.77),
      Math.round(seam[1] * 0.89),
      Math.round(seam[2] * 0.95),
    ]
    const half: RGB = [
      Math.round((seam[0] + off[0]) / 2),
      Math.round((seam[1] + off[1]) / 2),
      Math.round((seam[2] + off[2]) / 2),
    ]

    svg.querySelector<SVGPathElement>('.isle__wave-fill')?.style.setProperty('fill', css(seam))
    svg.querySelector<SVGStopElement>('.isle__water-b')?.style.setProperty('stop-color', css(seam))
    svg.querySelector<SVGPathElement>('.isle__wave-back-fill')?.style.setProperty('fill', css(half))
    svg.querySelector<SVGStopElement>('.isle__water-a')?.style.setProperty('stop-color', css(off))
  }, [])
  useDepth(onDepth)

  const wave = () => {
    if (waving) return
    const svg = root.current
    const arm = svg?.querySelector('.dev__arm-wave')
    const head = svg?.querySelector('.dev__head')
    const bubble = svg?.querySelector('.dev__bubble')
    if (!arm || !head || !bubble) return

    setWaving(true)
    gsap
      .timeline({ onComplete: () => setWaving(false) })
      .to(arm, { rotation: -118, duration: 0.32, ease: 'back.out(2)', svgOrigin: '1002 598' })
      .to(arm, { rotation: -78, duration: 1.15, ease: 'waveHand', svgOrigin: '1002 598' })
      .to(arm, { rotation: 0, duration: 0.34, ease: 'power2.inOut', svgOrigin: '1002 598' })
      .to(head, { rotation: -7, duration: 0.3, ease: 'power2.out', svgOrigin: '990 578' }, 0)
      .to(head, { rotation: 0, duration: 0.4, ease: 'power2.inOut' }, 1.5)
      .fromTo(
        bubble,
        { opacity: 0, scale: 0.6, svgOrigin: '1046 564' },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2.6)' },
        0.1,
      )
      .to(bubble, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.55)
  }

  useGSAP(
    () => {
      // The surface pulls away overhead as you leave it. One scrubbed tween.
      // The trigger has to be the element, not a selector: useGSAP scopes
      // selector strings to this SVG, and the hero is its ancestor — as a
      // string it silently resolved to nothing and the tween never scrubbed.
      const hero = root.current?.closest('.hero')
      if (hero) {
        gsap.to('.isle__scene', {
          yPercent: -16,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 },
        })
      }

      if (reduced) return

      // Water: two crests sliding at different rates, each travelling exactly
      // one wavelength multiple (1440 = 6 × WAVE_WL) so the loop has no seam.
      // Sliding alone reads as a sheet being dragged sideways, so each crest
      // also rises and falls on its own beat — that vertical beat is what
      // makes it read as swell.
      gsap.to('.isle__wave--back', { x: -1440, duration: 19, ease: 'none', repeat: -1 })
      gsap.to('.isle__wave--front', { x: -1440, duration: 11, ease: 'none', repeat: -1 })
      gsap.to('.isle__wave--back', {
        y: 7,
        duration: 4.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.isle__wave--front', {
        y: -9,
        duration: 3.1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.isle__glim', {
        opacity: 0.25,
        duration: 1.9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.22, from: 'random' },
      })

      // The float rides the same swell the front crest does.
      gsap.to('.isle__float', {
        y: -9,
        duration: 3.1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to('.isle__cloud', {
        x: (i) => 90 + i * 40,
        duration: (i) => 46 + i * 14,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Gulls: each on its own long circuit, wings on their own beat, so no
      // two of them are ever in the same place in the cycle.
      gsap.to('.isle__gull', {
        x: (i: number) => 170 + i * 46,
        y: (i: number) => -22 - i * 7,
        duration: (i: number) => 21 + i * 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 1.3,
      })
      gsap.to('.isle__gull-wing', {
        scaleY: 0.3,
        duration: (i: number) => 0.4 + (i % 3) * 0.07,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: '50% 100%',
        stagger: 0.06,
      })

      // Wind. Gusts, not a constant stream — each streak crosses, fades, and
      // leaves a gap before the next one.
      gsap.fromTo(
        '.isle__gust',
        { x: -300 },
        { x: 1780, duration: 7.5, ease: 'none', repeat: -1, stagger: 2.2 },
      )
      gsap.fromTo(
        '.isle__gust',
        { opacity: 0 },
        {
          opacity: 0.5,
          duration: 3.75,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 2.2,
        },
      )

      // Palm: the crown leans, each frond answers a beat later. Kept to a
      // light breeze — the wind streaks carry the movement now, so the tree
      // only has to agree with them.
      gsap.to('.isle__crown', {
        rotation: 1.2,
        duration: 5.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        svgOrigin: '1094 448',
      })
      // Relative, not absolute. Each frond is already laid out at its own
      // angle (rotate(-46), rotate(4)…), and GSAP decomposes that as its
      // starting rotation — so `rotation: 2` meant "sweep from -46° to 2°",
      // a 48° swing. `+=` keeps it a rustle around wherever the frond sits.
      gsap.to('.isle__frond', {
        rotation: (i: number) => (i % 2 ? '-=2' : '+=2'),
        duration: (i: number) => 3.6 + i * 0.26,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        svgOrigin: '1094 448',
        stagger: 0.22,
      })
      gsap.to('.isle__trunk', {
        rotation: 0.45,
        duration: 5.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        svgOrigin: '1052 636',
      })

      // The person: breathing, a head that keeps time, a hand on the keys.
      gsap.to('.dev__torso', {
        scaleY: 1.022,
        duration: 2.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        svgOrigin: '990 618',
      })
      gsap.to('.dev__head', {
        y: 0.9,
        rotation: 1.6,
        duration: 2.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        svgOrigin: '990 578',
      })
      gsap.to('.dev__hand', {
        y: -1.1,
        duration: 0.16,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.dev__glow', {
        opacity: 0.9,
        duration: 1.1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.dev__eye', {
        scaleY: 0.1,
        duration: 0.09,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 3.6,
        transformOrigin: '50% 50%',
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <svg
      ref={root}
      className="isle"
      viewBox="0 0 1440 900"
      /* Anchored bottom-right: on narrow screens the crop eats empty sky
         rather than the island. */
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="isleSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8d3ec" />
          <stop offset="52%" stopColor="#d8ecf7" />
          <stop offset="100%" stopColor="#fbeedb" />
        </linearGradient>
        {/* Both stops are re-tinted per scroll frame from water.ts, so the
            hero's sea is always the same colour as the canvas below it. */}
        <linearGradient id="isleWater" x1="0" y1="0" x2="0" y2="1">
          <stop className="isle__water-a" offset="0%" stopColor="#93c9e7" />
          <stop className="isle__water-b" offset="100%" stopColor="#bee2f3" />
        </linearGradient>
        <radialGradient id="isleSun">
          <stop offset="0%" stopColor="#fff4dd" />
          <stop offset="60%" stopColor="#fbe2b4" />
          <stop offset="100%" stopColor="#fbe2b4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="devGlow">
          <stop offset="0%" stopColor="#cfe9f5" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cfe9f5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="isle__scene">
        <rect x="0" y="0" width="1440" height="646" fill="url(#isleSky)" />
        <circle cx="1188" cy="208" r="120" fill="url(#isleSun)" />
        <circle cx="1188" cy="208" r="42" fill="#fdf1d6" />

        <g className="isle__cloud" opacity="0.85">
          <path
            d="M150 168q-26 0-26-20t26-20q6-24 34-24t34 22q24 0 24 21t-24 21z"
            fill="#fff"
          />
        </g>
        <g className="isle__cloud" opacity="0.6">
          <path d="M640 116q-20 0-20-15t20-15q5-18 26-18t26 17q18 0 18 16t-18 15z" fill="#fff" />
        </g>
        <g className="isle__cloud" opacity="0.5">
          <path d="M1010 300q-16 0-16-12t16-12q4-14 21-14t21 13q14 0 14 13t-14 12z" fill="#fff" />
        </g>

        {GULLS.map((g, i) => (
          <g key={i} transform={`translate(${g.x} ${g.y}) scale(${g.s})`} opacity={g.o}>
            <g className="isle__gull">
              <path className="isle__gull-wing" d="M0 0C4 -9 10 -9 13 -1" />
              <path className="isle__gull-wing" d="M13 -1C16 -9 22 -9 26 1" />
            </g>
          </g>
        ))}

        {GUSTS.map((g, i) => (
          <path
            key={i}
            className="isle__gust"
            d={`M0 ${g.y}q${g.len * 0.45} -${g.lift} ${g.len} -2q${g.len * 0.3} ${g.lift * 0.6} ${g.len * 0.5} 0`}
          />
        ))}

        {/* Water */}
        <rect x="0" y="640" width="1440" height="260" fill="url(#isleWater)" />

        {/* Island — drawn before the front crest so the water laps over its foot */}
        <g className="isle__land">
          <path d="M846 652q64-52 176-58 122-6 200 58z" fill="#e4cca3" />
          <path d="M846 652q64-52 176-58 60-3 110 12-92 14-286 46z" fill="#f2e2c3" />
          <ellipse className="isle__shade" cx="1040" cy="640" rx="118" ry="17" fill="#d7bd93" opacity="0.6" />
          <path d="M900 646q14-9 30-2-14 6-30 2z" fill="#d7bd93" />
        </g>

        {/* Palm */}
        <g className="isle__palm">
          <g className="isle__trunk">
            <path
              d="M1052 638C1058 572 1062 508 1092 452"
              stroke="#a67c52"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M1052 638C1058 572 1062 508 1092 452"
              stroke="#8b6540"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 13"
              fill="none"
            />
            <g className="isle__crown">
              {FRONDS.map((f, i) => (
                <g
                  key={i}
                  className="isle__frond"
                  transform={`translate(1094 448) rotate(${f.rot}) scale(${f.scale})`}
                >
                  <path d="M0 0Q38 -26 88 -14Q44 8 0 7Z" fill="#4f9e88" />
                  <path d="M0 2Q40 -18 86 -12" stroke="#3d8270" strokeWidth="2" fill="none" />
                </g>
              ))}
              <circle cx="1086" cy="460" r="8" fill="#8b6540" />
              <circle cx="1102" cy="464" r="7" fill="#7d5a38" />
              <circle cx="1094" cy="472" r="6.5" fill="#8b6540" />
            </g>
          </g>
        </g>

        {/* Rod planted in the sand, line out, float riding the surface */}
        <g className="isle__rod">
          <path d="M1166 648L1222 556" stroke="#8b6540" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M1176 632l-7 5" stroke="#6f4f30" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path className="isle__line" d="M1222 556q11 42 14 114" />
          <circle className="isle__float" cx="1236" cy="670" r="3.6" fill="#d1567e" />
        </g>

        {/* The one person on the island */}
        <g
          className="dev"
          role="button"
          tabIndex={0}
          aria-label="Acenar para o desenvolvedor na ilha"
          onClick={wave}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              wave()
            }
          }}
        >
          {/* Generous, invisible hit area */}
          <rect x="944" y="540" width="96" height="106" fill="transparent" />

          <g className="dev__bubble" opacity="0">
            <rect x="1010" y="524" width="72" height="30" rx="15" fill="#10293c" />
            <path d="M1030 552l-6 12 16-11z" fill="#10293c" />
            <text x="1046" y="544" textAnchor="middle" className="dev__bubble-txt">
              tchau!
            </text>
          </g>

          <ellipse cx="990" cy="640" rx="34" ry="7" fill="#cbae82" opacity="0.55" />

          {/* Far arm — the one that waves. Sleeved, with a bare hand. */}
          <g className="dev__arm-wave">
            <path
              d="M1002 598q13 6 10 20"
              stroke="#e2a63f"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="1012" cy="618" r="4.2" fill="#e8b58c" />
          </g>

          {/* Waders */}
          <path className="dev__legs" d="M962 640q-5-16 14-19h28q19 3 14 19z" fill="#4a6b5e" />
          <path className="dev__legs" d="M968 628h44" stroke="#3a564b" strokeWidth="2.5" fill="none" />

          {/* Oilskin */}
          <g className="dev__torso">
            <path d="M977 622q-3-30 13-32 16 2 13 32z" fill="#e2a63f" />
            <path d="M990 590q-8 1-11 8h22q-3-7-11-8z" fill="#f0bd5e" />
            <path d="M990 597v25" stroke="#b8791f" strokeWidth="1.5" fill="none" />
            <path d="M980 611h6M994 611h6" stroke="#b8791f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>

          <g className="dev__head">
            <rect x="986" y="580" width="8" height="8" fill="#e8b58c" />
            <circle cx="990" cy="578" r="13" fill="#e8b58c" />
            {/* Blond, with a bit of shadow where it falls — the hat sits back
                far enough to leave the fringe showing. */}
            <path d="M977 576q1-14 13-14t13 14q-6-7-13-6-7-1-13 6z" fill="#e8c46a" />
            <path d="M977 576q1-14 13-14 5 0 8 4-9 1-13 6-3 2-5 8z" fill="#f2d68c" />
            <circle className="dev__eye" cx="985" cy="578.5" r="1.5" fill="#3b2a1c" />
            <circle className="dev__eye" cx="995" cy="578.5" r="1.5" fill="#3b2a1c" />
            <g className="dev__specs">
              <circle cx="985" cy="578.5" r="4.2" />
              <circle cx="995" cy="578.5" r="4.2" />
              <path d="M989.2 578.5h1.6" />
              <path d="M980.8 577.5l-3.6-1.4" />
              <path d="M999.2 577.5l3.4-1.2" />
            </g>
            <path d="M986 586q4 3 8 0" stroke="#c98f66" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            {/* Sou'wester: crown, band, wide brim, and the flap down the back */}
            <g className="dev__hat">
              <path d="M974 568q-3 11 3 16 6-6 4-16z" fill="#c8912c" />
              <path d="M978 566q0-15 12-15t12 15z" fill="#e2a63f" />
              <ellipse cx="990" cy="566" rx="21" ry="5" fill="#f0bd5e" />
              <path d="M978 562h24" stroke="#b8791f" strokeWidth="2.2" fill="none" />
            </g>
          </g>

          <ellipse className="dev__glow" cx="990" cy="600" rx="26" ry="16" fill="url(#devGlow)" opacity="0.55" />

          {/* Laptop, seen from behind the lid */}
          <path d="M973 618h34l4 6h-42z" fill="#c3d4dd" />
          <path d="M975 618h30l-3-19h-24z" fill="#dbe8ef" />
          <path d="M975 618h30l-3-19h-24z" fill="none" stroke="#8fa9b8" strokeWidth="1.2" />
          <circle cx="990" cy="609" r="2.4" fill="#8fa9b8" />

          {/* Near arm — the one on the keys */}
          <path
            d="M978 598q-12 7-8 19"
            stroke="#e2a63f"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle className="dev__hand" cx="972" cy="617" r="4.5" fill="#e8b58c" />
        </g>

        {/* Sun glimmer on the water */}
        <g className="isle__glims" stroke="#fdf1d6" strokeWidth="4" strokeLinecap="round" opacity="0.75">
          <path className="isle__glim" d="M1150 690h44" />
          <path className="isle__glim" d="M1196 724h68" />
          <path className="isle__glim" d="M1128 762h52" />
          <path className="isle__glim" d="M1220 800h84" />
          <path className="isle__glim" d="M1102 844h60" />
        </g>

        {/* Two crests, each with a lit edge so the swell reads as swell and
            not as a change of colour. */}
        <g className="isle__wave--back">
          <path className="isle__wave-back-fill" d={wavePath(661, 11, 0)} fill="#a8d5ec" />
          <path className="isle__crest isle__crest--back" d={crestPath(661, 11, 0)} />
        </g>
        <g className="isle__wave--front">
          <path className="isle__wave-fill" d={wavePath(689, 15, 2.1)} fill="#bee2f3" />
          <path className="isle__crest" d={crestPath(689, 15, 2.1)} />
        </g>
      </g>
    </svg>
  )
}

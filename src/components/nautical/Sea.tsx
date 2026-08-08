import { useCallback, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../reactbits/usePrefersReducedMotion'
import { currentDepth, useDepth } from './useDepth'
import { css, dived, waterAtY } from './water'

/**
 * The water. A fixed field behind the whole site.
 *
 * Everything here is keyed to scroll depth: the tint darkens as you descend,
 * isobath contours crowd together the way they do where the floor drops away,
 * and bubbles keep climbing back toward the surface you left.
 *
 * The colour itself comes from water.ts, which the hero scene reads too — the
 * hero has to hand off to this canvas at the fold without a seam, at every
 * scroll position, not just at the top.
 *
 * Budget: one full-screen canvas at ~30fps, capped at 1.5× DPR, drawing only
 * fills and polylines.
 */
const CONTOURS = 9
const BUBBLES = 22
const FRAME_MS = 32 // ~30fps; nothing here moves fast enough to need more

// Deterministic jitter, so the chart is the same on every visit.
function noise(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

export default function Sea() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  const depthRef = useRef(0)
  const scrollRef = useRef(0)

  const onDepth = useCallback((d: number, y: number) => {
    depthRef.current = d
    scrollRef.current = y
  }, [])
  useDepth(onDepth)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    depthRef.current = currentDepth()

    const draw = (t: number) => {
      const d = depthRef.current
      const parallax = scrollRef.current * 0.045
      // How far past the dive we are — drives everything that reads as depth.
      const gone = dived(d)

      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, css(waterAtY(d, 0)))
      grad.addColorStop(1, css(waterAtY(d, 1)))
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Everything drawn on the water switches from ink to light as the water
      // goes dark, so the chart keeps reading either way.
      const mark = gone < 0.5 ? '18, 58, 86' : '214, 238, 248'
      const markA = 1 - Math.abs(gone - 0.5) * 0.4 // dimmest at the crossover

      // Isobaths. They tighten and darken with depth, the way contours crowd
      // where the sea floor drops away.
      const band = h / (CONTOURS - 1)
      ctx.lineWidth = 1
      for (let i = 0; i < CONTOURS; i++) {
        const seed = noise(i + 1)
        const span = h + band
        const base = (((i * band - parallax * (0.5 + seed * 0.9)) % span) + span) % span - band * 0.5
        const amp = 10 + seed * 26
        const freq = 0.0032 + seed * 0.0026
        const drift = t * (0.00006 + seed * 0.00009)
        const major = i % 3 === 0

        ctx.strokeStyle = `rgba(${mark}, ${((major ? 0.17 : 0.09) + gone * 0.06) * markA})`
        ctx.setLineDash(major ? [] : [7, 9])
        ctx.beginPath()
        for (let x = -20; x <= w + 20; x += 18) {
          const y =
            base +
            Math.sin(x * freq + drift + seed * 9) * amp +
            Math.sin(x * freq * 2.4 - drift * 1.7) * amp * 0.32
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.setLineDash([])

      // Bubbles, climbing back toward the surface you left.
      for (let i = 0; i < BUBBLES; i++) {
        const seed = noise(i * 2.9 + 4)
        const r = 1.4 + seed * 3.4
        const cycle = h + 120
        const bx = seed * w + Math.sin(t * 0.0004 + i) * 14
        const by =
          cycle -
          (((t * (0.014 + seed * 0.03) + parallax * 1.8 + seed * cycle) % cycle) + cycle) % cycle
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.22 + gone * 0.34})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(bx, by, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // The dark closes in from the edges once you are past the dive. Kept off
      // the middle of the frame, which is where everything is read.
      if (gone > 0.01) {
        const vig = ctx.createRadialGradient(
          w / 2, h / 2, Math.min(w, h) * 0.42,
          w / 2, h / 2, Math.max(w, h) * 0.88,
        )
        vig.addColorStop(0, 'rgba(4, 14, 26, 0)')
        vig.addColorStop(1, `rgba(4, 14, 26, ${(0.5 * gone).toFixed(3)})`)
        ctx.fillStyle = vig
        ctx.fillRect(0, 0, w, h)
      }
    }

    if (reduced) {
      const redraw = () => draw(0)
      redraw()
      window.addEventListener('resize', redraw)
      window.addEventListener('scroll', redraw, { passive: true })
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('resize', redraw)
        window.removeEventListener('scroll', redraw)
      }
    }

    // One frame in flight at a time, so a background/foreground round trip can
    // never leave two loops running against the same canvas.
    let frame = 0
    let last = -Infinity
    const loop = (t: number) => {
      frame = 0
      if (t - last >= FRAME_MS) {
        last = t
        draw(t)
      }
      if (!document.hidden) frame = requestAnimationFrame(loop)
    }
    const kick = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(loop)
    }

    draw(0) // paint once up front — a backgrounded tab still shows water
    kick()

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
      } else {
        kick()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="sea" aria-hidden="true" />
}

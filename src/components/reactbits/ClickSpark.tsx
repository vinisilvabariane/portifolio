import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Spark = { x: number; y: number; a: number; life: number }

// A quick burst of signal lines on every click — the "ping" micro-interaction.
export default function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let sparks: Spark[] = []
    let raf = 0

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      sparks = sparks.filter((s) => s.life > 0)
      for (const s of sparks) {
        s.life -= 0.045
        const dist = (1 - s.life) * 26
        const x = s.x + Math.cos(s.a) * dist
        const y = s.y + Math.sin(s.a) * dist
        const len = 9 * s.life
        ctx.strokeStyle = `rgba(42, 110, 240, ${Math.max(0, s.life)})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(s.a) * len, y + Math.sin(s.a) * len)
        ctx.stroke()
      }
      if (sparks.length) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }

    const onDown = (e: PointerEvent) => {
      const n = 10
      for (let i = 0; i < n; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, a: (i / n) * Math.PI * 2 + Math.random() * 0.4, life: 1 })
      }
      if (!raf) raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointerdown', onDown)

    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="click-spark" aria-hidden="true" />
}

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Oscilloscope trace: a continuously scrolling waveform with periodic ping spikes.
// The hero's live instrument. Canvas keeps it smooth; frozen on reduced motion.
export default function SignalTrace({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const render = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const mid = h * 0.5
      const time = t * 0.001

      // baseline
      ctx.strokeStyle = 'rgba(160, 160, 190, 0.12)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, mid)
      ctx.lineTo(w, mid)
      ctx.stroke()

      // waveform — a continuous, living telemetry signal
      const amp = Math.min(h * 0.13, 60)
      ctx.beginPath()
      for (let x = 0; x <= w; x += 2) {
        const p = x / w
        let y = Math.sin(p * 6 + time * 1.3) * amp
        y += Math.sin(p * 14 - time * 2.1) * (amp * 0.5)
        y += Math.sin(p * 33 + time * 1.7) * (amp * 0.22)
        // frequent, modest ping spikes travelling across the trace
        const raw = (p * 5 - time * 0.5) % 1
        const sp = raw < 0 ? raw + 1 : raw
        if (sp < 0.018) y -= Math.sin((sp / 0.018) * Math.PI) * (amp * 1.4)
        if (x === 0) ctx.moveTo(x, mid + y)
        else ctx.lineTo(x, mid + y)
      }
      ctx.strokeStyle = 'rgba(42, 110, 240, 0.9)'
      ctx.lineWidth = 1.6
      ctx.shadowColor = 'rgba(42, 110, 240, 0.5)'
      ctx.shadowBlur = 12
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    const loop = (t: number) => {
      render(t)
      raf = requestAnimationFrame(loop)
    }

    if (reduced) render(0)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced])

  return <canvas ref={canvasRef} className={`signal-trace ${className}`} aria-hidden="true" />
}

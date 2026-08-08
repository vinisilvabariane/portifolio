import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Crosshair reticle cursor with a live coordinate readout — the console's pointer.
// Fine-pointer devices only; disabled entirely under reduced motion.
export default function Reticle() {
  const reduced = usePrefersReducedMotion()
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const vRef = useRef<HTMLDivElement>(null)
  const hRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !enabled) return
    document.body.classList.add('reticle-on')

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let bx = tx
    let by = ty
    let raf = 0
    let hot = false

    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      const el = e.target as HTMLElement | null
      const interactive = !!el?.closest('a, button, [role="button"], input, .host, .magnet')
      if (interactive !== hot) {
        hot = interactive
        boxRef.current?.classList.toggle('is-hot', hot)
      }
    }
    const hide = () => document.body.classList.add('reticle-hidden')
    const show = () => document.body.classList.remove('reticle-hidden')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', hide)
    document.addEventListener('pointerenter', show)

    const loop = () => {
      bx += (tx - bx) * 0.28
      by += (ty - by) * 0.28
      if (vRef.current) vRef.current.style.transform = `translateX(${tx}px)`
      if (hRef.current) hRef.current.style.transform = `translateY(${ty}px)`
      if (boxRef.current) boxRef.current.style.transform = `translate(${bx}px, ${by}px) translate(-50%, -50%)`
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${bx + 16}px, ${by + 16}px)`
        labelRef.current.textContent = `x${Math.round(tx)} y${Math.round(ty)}`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', hide)
      document.removeEventListener('pointerenter', show)
      document.body.classList.remove('reticle-on', 'reticle-hidden')
    }
  }, [reduced, enabled])

  if (!enabled) return null
  return (
    <div className="reticle" aria-hidden="true">
      <div className="reticle__v" ref={vRef} />
      <div className="reticle__h" ref={hRef} />
      <div className="reticle__box" ref={boxRef} />
      <div className="reticle__label" ref={labelRef} />
    </div>
  )
}

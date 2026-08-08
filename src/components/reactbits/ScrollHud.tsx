import { useEffect, useRef } from 'react'

const SECTIONS = [
  { id: 'inicio', label: '01' },
  { id: 'direcao', label: '02' },
  { id: 'curriculo', label: '03' },
  { id: 'selecao', label: '04' },
  { id: 'stack', label: '05' },
  { id: 'contato', label: '06' },
]

// Drives the "sweep" readout: a scroll-progress percentage, the active module,
// and the nav's active state. One rAF-coalesced scroll listener + an observer;
// updates the DOM directly so scrolling never triggers a React re-render.
export default function ScrollHud() {
  const pctRef = useRef<HTMLSpanElement>(null)
  const modRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max = root.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        root.style.setProperty('--sweep', p.toFixed(4))
        if (pctRef.current) pctRef.current.textContent = `${Math.round(p * 100)}%`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    const links = new Map<string, HTMLElement>()
    document.querySelectorAll<HTMLElement>('.statusbar__nav a').forEach((a) => {
      const id = a.getAttribute('href')?.slice(1)
      if (id) links.set(id, a)
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const id = (e.target as HTMLElement).id
          links.forEach((l) => l.classList.remove('is-active'))
          links.get(id)?.classList.add('is-active')
          const m = SECTIONS.find((s) => s.id === id)
          if (m && modRef.current) modRef.current.textContent = `${m.label}/06`
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <span className="hud">
      SWEEP <span ref={pctRef} className="hud__pct">0%</span>
      <span className="statusbar__sep">·</span>
      <span ref={modRef}>01/06</span>
    </span>
  )
}

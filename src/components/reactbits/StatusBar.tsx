import { useEffect, useState, type ReactNode } from 'react'
import ScrollHud from './ScrollHud'

function fmt(n: number) {
  return n.toString().padStart(2, '0')
}

// Fixed console chrome: status LED, nav, a live scroll "sweep" readout + clock,
// and a scroll-progress bar along the bottom edge.
export default function StatusBar({ children }: { children?: ReactNode }) {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(`${fmt(now.getHours())}:${fmt(now.getMinutes())}:${fmt(now.getSeconds())}`)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="statusbar" role="banner">
      <div className="statusbar__id">
        <span className="led" data-state="online" />
        <strong>VB.SYS</strong>
        <span className="statusbar__sep">/</span>
        <span className="statusbar__ok">STATUS: ONLINE</span>
      </div>
      {children}
      <div className="statusbar__meta">
        <ScrollHud />
        <span className="statusbar__sep">/</span>
        <span>BRT {clock || '--:--:--'}</span>
      </div>
      <div className="statusbar__sweep-bar" aria-hidden="true" />
    </div>
  )
}

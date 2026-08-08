import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const LINES = [
  '> init vb.sys ................ ok',
  '> handshake -22.90 / -47.06 .. ok',
  '> mount modules [06] ......... ok',
  '> calibrate signal ........... ok',
  '> render interface ........... ok',
]

// The load moment: a boot handshake that types telemetry, fills a bar, then clears.
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const full = LINES.join('\n')
  const [shown, setShown] = useState(reduced ? full : '')
  const [leaving, setLeaving] = useState(false)
  const doneRef = useRef(onDone)

  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    if (reduced) {
      const id = window.setTimeout(() => doneRef.current(), 260)
      return () => window.clearTimeout(id)
    }
    let i = 0
    const timers: number[] = []
    const type = window.setInterval(() => {
      i += 2
      setShown(full.slice(0, i))
      if (i >= full.length) {
        window.clearInterval(type)
        timers.push(window.setTimeout(() => setLeaving(true), 480))
        timers.push(window.setTimeout(() => doneRef.current(), 480 + 700))
      }
    }, 20)
    return () => {
      window.clearInterval(type)
      timers.forEach(window.clearTimeout)
    }
  }, [reduced, full])

  const progress = Math.round((shown.length / full.length) * 100)

  return (
    <div className={`boot ${leaving ? 'boot--out' : ''}`} role="status" aria-label="Iniciando o sistema">
      <div className="boot__panel">
        <div className="boot__head">
          <span className="led" data-state="boot" />
          VB.SYS <i>//</i> BOOT SEQUENCE
        </div>
        <pre className="boot__log" aria-hidden="true">
          {shown}
          {!reduced && progress < 100 && <span className="boot__caret">▍</span>}
        </pre>
        <div className="boot__meter" aria-hidden="true">
          <div className="boot__meter-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="boot__pct">{progress.toString().padStart(3, '0')}%</div>
      </div>
    </div>
  )
}

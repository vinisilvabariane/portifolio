import { useRef, type ReactNode } from 'react'

export default function Magnet({ children, padding = 12 }: { children: ReactNode; padding?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  return <div ref={ref} className="magnet" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left - rect.width / 2) / rect.width; const y = (event.clientY - rect.top - rect.height / 2) / rect.height; event.currentTarget.style.transform = `translate(${x * padding}px, ${y * padding}px)` }} onPointerLeave={(event) => { event.currentTarget.style.transform = 'translate(0, 0)' }}>{children}</div>
}

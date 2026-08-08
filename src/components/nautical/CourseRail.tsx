import { useCallback, useRef } from 'react'
import { useDepth } from './useDepth'

type Waypoint = { id: string; label: string; at: number }

/**
 * The plotted course, drawn down the left margin. The track fills as you
 * sail it, waypoints light as you pass them, and the sounding at the foot
 * reads the water under the keel.
 */
export default function CourseRail({ waypoints }: { waypoints: Waypoint[] }) {
  const trackRef = useRef<HTMLSpanElement>(null)
  const depthRef = useRef<HTMLSpanElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  const onDepth = useCallback(
    (d: number) => {
      if (trackRef.current) trackRef.current.style.transform = `scaleY(${d})`
      if (depthRef.current) depthRef.current.textContent = `${Math.round(d * 240)} m`
      const marks = railRef.current?.querySelectorAll<HTMLElement>('.rail__wp')
      marks?.forEach((m, i) => m.classList.toggle('is-passed', d >= waypoints[i].at))
    },
    [waypoints],
  )
  useDepth(onDepth)

  return (
    <div className="rail" ref={railRef} aria-hidden="true">
      <span className="rail__line" />
      <span className="rail__track" ref={trackRef} />
      <ol className="rail__pts">
        {waypoints.map((w) => (
          <li key={w.id} className="rail__wp" style={{ top: `${w.at * 100}%` }}>
            <a href={`#${w.id}`} tabIndex={-1}>
              <span className="rail__diamond" />
              <span className="rail__label">{w.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <span className="rail__sound">
        <b ref={depthRef}>0 m</b>
        <i>prof.</i>
      </span>
    </div>
  )
}

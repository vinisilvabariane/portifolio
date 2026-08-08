/**
 * A vessel's wake. Deterministic per seed so each ship keeps its own track,
 * and drawn in by scroll (see .wake in App.css).
 */
function noise(n: number) {
  const s = Math.sin(n * 91.3 + 47.7) * 43758.5453
  return s - Math.floor(s)
}

export default function Wake({ seed, points = 22 }: { seed: number; points?: number }) {
  let d = 'M0 12'
  for (let i = 1; i <= points; i++) {
    const x = (i / points) * 120
    const y = 12 + Math.sin(i * 0.8 + seed) * (2 + noise(seed + i) * 5) * (i / points)
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return (
    <svg className="wake" viewBox="0 0 120 24" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

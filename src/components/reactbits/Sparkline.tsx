// Latency-style bar readout for a monitored host. Deterministic heights per seed so
// each project keeps a stable signature; the CSS makes the bars breathe.
export default function Sparkline({ seed = 1, bars = 12 }: { seed?: number; bars?: number }) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const n = Math.sin((i + 1) * (seed + 1) * 12.9898) * 43758.5453
    const v = n - Math.floor(n)
    return 22 + Math.round(v * 78)
  })
  return (
    <span className="spark" aria-hidden="true">
      {heights.map((h, i) => (
        <i key={i} style={{ height: `${h}%`, animationDelay: `${(i * 90) % 1400}ms` }} />
      ))}
    </span>
  )
}

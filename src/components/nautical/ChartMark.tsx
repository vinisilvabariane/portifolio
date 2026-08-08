/**
 * Chart symbols, drawn the way a chart draws them. Magenta is not a
 * decoration here — on a real chart it is reserved for lights and anything
 * that transmits, which is exactly what these four marks have in common.
 */
import type { ReactNode } from 'react'

export type MarkKind = 'boia' | 'sonda' | 'farol' | 'agulha'

const paths: Record<MarkKind, ReactNode> = {
  // Light buoy: floats, watches, reports — continuously.
  boia: (
    <>
      <path className="mark__ink" d="M24 40 L24 20" />
      <path className="mark__ink" d="M18 40 h12" />
      <circle className="mark__ink" cx="24" cy="16" r="4" />
      <path className="mark__lit" d="M31 11 a10 10 0 0 1 0 10" />
      <path className="mark__lit" d="M35 7 a16 16 0 0 1 0 18" />
      <path className="mark__wave" d="M10 44 q7 -4 14 0 t14 0" />
    </>
  ),
  // Sounding lead: dropped to the floor to read what is physically there.
  sonda: (
    <>
      <path className="mark__ink" d="M24 6 L24 32" strokeDasharray="3 3" />
      <path className="mark__ink" d="M20 32 h8 l-4 7 z" />
      <path className="mark__wave" d="M8 44 h32" />
      <path className="mark__wave" d="M12 44 l-3 4 M20 44 l-3 4 M28 44 l-3 4 M36 44 l-3 4" />
    </>
  ),
  // Lighthouse: takes the dark and returns a bearing you can steer by.
  farol: (
    <>
      <path className="mark__ink" d="M19 42 L21 18 h6 l2 24 z" />
      <path className="mark__ink" d="M21 24 h6" />
      <circle className="mark__lit mark__lit--fill" cx="24" cy="14" r="3" />
      <path className="mark__lit" d="M24 14 L6 6 M24 14 L42 6" />
      <path className="mark__wave" d="M10 44 h28" />
    </>
  ),
  // Compass needle: the instrument that turns everything else into a direction.
  agulha: (
    <>
      <circle className="mark__ink" cx="24" cy="24" r="16" />
      <path className="mark__ink" d="M24 8 v4 M24 36 v4 M8 24 h4 M36 24 h4" />
      <path className="mark__lit mark__lit--fill" d="M24 11 L28 24 L24 21 L20 24 z" />
      <path className="mark__ink mark__ink--fill" d="M24 37 L20 24 L24 27 L28 24 z" />
    </>
  ),
}

export default function ChartMark({ kind }: { kind: MarkKind }) {
  return (
    <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
      {paths[kind]}
    </svg>
  )
}

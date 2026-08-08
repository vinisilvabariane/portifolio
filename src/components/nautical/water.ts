import { diveRange } from './useDepth'

export type RGB = [number, number, number]

/**
 * The colour of the sea at a given depth — the single source of truth, shared
 * by the canvas that paints the water and by the hero scene that has to hand
 * off to it without a seam.
 *
 * Four anchors, not an even ramp, because the shape is tied to the page
 * rather than to a curve. SURFACE→SHALLOW is the sunlit run the hero and
 * §Rumo letter navy on. SHALLOW→DEEP is the dive, which happens entirely
 * inside the penumbra band, where no type rides open water — that is what
 * lets the water cross the range neither ink would survive. DEEP→FLOOR is the
 * long dark run below, lettered pale.
 */
const SURFACE: RGB = [190, 226, 243]
const SHALLOW: RGB = [138, 192, 223]
const DEEP: RGB = [34, 78, 112]
const FLOOR: RGB = [8, 26, 44]

const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
]

export const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t))
  return c * c * (3 - 2 * c)
}

/** How far through the dive a given depth is — 0 above it, 1 below. */
export function dived(depth: number) {
  const dive = diveRange()
  return smooth((depth - dive.start) / Math.max(0.0001, dive.end - dive.start))
}

export function water(depth: number): RGB {
  const dive = diveRange()
  if (depth <= dive.start) {
    return mix(SURFACE, SHALLOW, smooth(depth / Math.max(0.0001, dive.start)))
  }
  if (depth >= dive.end) {
    return mix(DEEP, FLOOR, smooth((depth - dive.end) / Math.max(0.0001, 1 - dive.end)))
  }
  return mix(SHALLOW, DEEP, smooth((depth - dive.start) / Math.max(0.0001, dive.end - dive.start)))
}

/**
 * The colour on screen at `yFrac` down the viewport. Light falls from above,
 * so the top of a frame holds a little more of it than the bottom — but only
 * a little: a steep in-frame gradient would put the top and bottom of one
 * screen at very different depths, and the descent is the scroll's job.
 */
export function waterAtY(depth: number, yFrac: number): RGB {
  return water(depth + (-0.03 + 0.09 * Math.min(1, Math.max(0, yFrac))))
}

export const css = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`

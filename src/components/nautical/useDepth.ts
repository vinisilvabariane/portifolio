import { useEffect } from 'react'

/**
 * Single scroll subscription for the whole site. Writes progress to
 * `--depth` (0 at the surface, 1 at the sea floor) on <html> so CSS can
 * react without React ever re-rendering, and notifies canvas listeners.
 */
const listeners = new Set<(depth: number, scrollY: number) => void>()
let raf = 0
let started = false
let current = 0

/**
 * The stretch of scroll where the light gives out. The water crosses from
 * "light enough for navy ink" to "dark enough for pale ink" here, and the
 * page carries no type over open water for its whole length — which is the
 * only reason the ink is allowed to change at all.
 */
let dive = { start: 0.38, end: 0.5 }

export function diveRange() {
  return dive
}

/** Layout read — only on resize, never per scroll frame. */
function measureDive() {
  const root = document.documentElement
  const band = document.getElementById('penumbra')
  const max = root.scrollHeight - window.innerHeight
  if (!band || max <= 0) return
  const start = band.offsetTop / max
  const end = (band.offsetTop + band.offsetHeight - window.innerHeight) / max
  dive = {
    start: Math.min(1, Math.max(0, start)),
    end: Math.min(1, Math.max(0, end > start ? end : start + 0.02)),
  }
}

function measure() {
  const root = document.documentElement
  const max = root.scrollHeight - window.innerHeight
  const d = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  current = d
  root.style.setProperty('--depth', d.toFixed(4))
  // Flip the ink halfway through the dive, where nothing is being read.
  root.dataset.zone = d >= (dive.start + dive.end) / 2 ? 'deep' : 'shallow'
  listeners.forEach((fn) => fn(d, window.scrollY))
}

function remeasure() {
  measureDive()
  measure()
}

function schedule() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    measure()
  })
}

function start() {
  if (started) return
  started = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', remeasure, { passive: true })
  // A tab restored at a scrolled position gets no scroll event, and the rAF
  // above never ran while it was hidden — re-measure on the way back in.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) schedule()
  })
  remeasure()
  // Fonts and images settle after first paint and move the band; re-read once.
  window.setTimeout(remeasure, 400)
  document.fonts?.ready.then(remeasure)
}

export function currentDepth() {
  return current
}

/** Subscribe to scroll depth. Returns the unsubscribe on unmount. */
export function useDepth(onDepth: (depth: number, scrollY: number) => void) {
  useEffect(() => {
    start()
    listeners.add(onDepth)
    onDepth(current, window.scrollY)
    return () => {
      listeners.delete(onDepth)
    }
  }, [onDepth])
}

/** Mount once to keep `--depth` live even with no canvas listeners. */
export function useDepthRoot() {
  useEffect(() => {
    start()
    schedule()
  }, [])
}

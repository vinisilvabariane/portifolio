import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  'input',
  'textarea',
  'select',
  'label',
  '[tabindex]:not([tabindex="-1"])',
  '.MuiButtonBase-root',
  '[data-cursor="interactive"]',
].join(', ')

const CURSOR_ROOT_CLASS = 'has-custom-cursor'

function hasPointerCursor(target: Element) {
  let current: Element | null = target

  while (current) {
    if (current.matches(INTERACTIVE_SELECTOR)) {
      return true
    }

    if (window.getComputedStyle(current).cursor === 'pointer') {
      return true
    }

    current = current.parentElement
  }

  return false
}

function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)
  const initializedRef = useRef(false)

  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const pointerQuery = window.matchMedia('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncAvailability = () => {
      setIsEnabled(pointerQuery.matches && !reducedMotionQuery.matches)
    }

    syncAvailability()
    pointerQuery.addEventListener('change', syncAvailability)
    reducedMotionQuery.addEventListener('change', syncAvailability)

    return () => {
      pointerQuery.removeEventListener('change', syncAvailability)
      reducedMotionQuery.removeEventListener('change', syncAvailability)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (!isEnabled) {
      root.classList.remove(CURSOR_ROOT_CLASS)
      setIsVisible(false)
      setIsInteractive(false)
      setIsPressed(false)
      initializedRef.current = false
      return
    }

    root.classList.add(CURSOR_ROOT_CLASS)

    const updateInteractiveState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setIsInteractive(false)
        return
      }

      setIsInteractive(hasPointerCursor(target))
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nextPoint = { x: event.clientX, y: event.clientY }
      targetRef.current = nextPoint

      if (!initializedRef.current) {
        currentRef.current = nextPoint
        initializedRef.current = true
      }

      setIsVisible(true)
      updateInteractiveState(event.target)
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
      setIsInteractive(false)
      setIsPressed(false)
    }

    const handlePointerDown = () => setIsPressed(true)
    const handlePointerUp = () => setIsPressed(false)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)
    document.addEventListener('pointerleave', handlePointerLeave)

    const animate = () => {
      const outer = outerRef.current
      const inner = innerRef.current

      if (outer && inner) {
        const current = currentRef.current
        const target = targetRef.current

        current.x += (target.x - current.x) * 0.18
        current.y += (target.y - current.y) * 0.18

        outer.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
        inner.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      }

      frameRef.current = window.requestAnimationFrame(animate)
    }

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      root.classList.remove(CURSOR_ROOT_CLASS)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
      document.removeEventListener('pointerleave', handlePointerLeave)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isEnabled])

  if (!isEnabled) {
    return null
  }

  return (
    <>
      <div
        ref={outerRef}
        className="custom-cursor custom-cursor--outer"
        data-visible={isVisible}
        data-interactive={isInteractive}
        data-pressed={isPressed}
      />
      <div
        ref={innerRef}
        className="custom-cursor custom-cursor--inner"
        data-visible={isVisible}
        data-interactive={isInteractive}
        data-pressed={isPressed}
      />
    </>
  )
}

export default CustomCursor

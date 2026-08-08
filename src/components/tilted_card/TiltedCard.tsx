import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Box, type Theme } from '@mui/material'
import type { SystemProps } from '@mui/system'

type TiltedCardProps = {
  children: ReactNode
  minHeight?: SystemProps<Theme>['minHeight']
  rotateAmplitude?: number
  scaleOnHover?: number
}

function TiltedCard({
  children,
  minHeight,
  rotateAmplitude = 15,
  scaleOnHover = 1.02,
}: TiltedCardProps) {
  const frameRef = useRef<number | null>(null)
  const pendingRotationRef = useRef({ x: 0, y: 0 })

  function applyRotation(element: HTMLDivElement) {
    const { x, y } = pendingRotationRef.current
    element.style.setProperty('--tilt-x', `${x}deg`)
    element.style.setProperty('--tilt-y', `${y}deg`)
    frameRef.current = null
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5

    pendingRotationRef.current = {
      x: offsetY * rotateAmplitude * -1.2,
      y: offsetX * rotateAmplitude,
    }
    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(() => applyRotation(event.currentTarget))
    }
  }

  function resetRotation(event: MouseEvent<HTMLDivElement>) {
    pendingRotationRef.current = { x: 0, y: 0 }
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    applyRotation(event.currentTarget)
  }

  return (
    <Box
      sx={{
        minWidth: 0,
        minHeight,
        perspective: '500px',
        '--tilt-x': '0deg',
        '--tilt-y': '0deg',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <Box
        sx={{
          minHeight: '100%',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(var(--tilt-x)) rotateY(var(--tilt-y))',
          transition: 'transform 120ms linear',
          willChange: 'transform',
          '@media (hover: hover)': {
            '&:hover': {
              transform: `rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(${scaleOnHover})`,
            },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default TiltedCard
  

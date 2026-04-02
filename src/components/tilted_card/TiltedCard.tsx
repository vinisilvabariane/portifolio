import { useState, type MouseEvent, type ReactNode } from 'react'
import { Box, type Theme } from '@mui/material'
import type { SystemProps } from '@mui/system'

type TiltedCardProps = {
  children: ReactNode
  minHeight?: SystemProps<Theme>['minHeight']
  rotateAmplitude?: number
  scaleOnHover?: number
}

type RotationState = {
  rotateX: number
  rotateY: number
}

const INITIAL_ROTATION: RotationState = {
  rotateX: 0,
  rotateY: 0,
}

function TiltedCard({
  children,
  minHeight,
  rotateAmplitude = 10,
  scaleOnHover = 1.02,
}: TiltedCardProps) {
  const [rotation, setRotation] = useState<RotationState>(INITIAL_ROTATION)

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5

    setRotation({
      rotateX: offsetY * rotateAmplitude * -1.2,
      rotateY: offsetX * rotateAmplitude,
    })
  }

  function resetRotation() {
    setRotation(INITIAL_ROTATION)
  }

  return (
    <Box
      sx={{
        minWidth: 0,
        minHeight,
        perspective: '500px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <Box
        sx={{
          minHeight: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
          transition:
            rotation.rotateX === 0 && rotation.rotateY === 0
              ? 'transform 220ms ease'
              : 'transform 80ms linear',
          willChange: 'transform',
          '@media (hover: hover)': {
            '&:hover': {
              transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) scale(${scaleOnHover})`,
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
  

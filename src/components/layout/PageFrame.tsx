import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import Orb from '../orb/Orb'
import SiteNav from './SiteNav'

interface PageFrameProps {
  children: ReactNode
}

function PageFrame({ children }: PageFrameProps) {
  return (
    <Box component="main" className="home-page">
      <Box className="home-page__background" aria-hidden="true">
        <Orb
          hue={22}
          hoverIntensity={0.5}
          rotateOnHover
          backgroundColor="#090d18"
        />
      </Box>

      <Typography
        component="span"
        sx={{
          position: 'absolute',
          top: { xs: 20, md: 28 },
          left: { xs: 20, md: 28 },
          zIndex: 3,
          px: 1.5,
          py: 0.75,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 999,
          color: 'primary.light',
          fontFamily: 'var(--mono)',
          fontSize: { xs: 16, md: 18 },
          letterSpacing: '0.08em',
          backgroundColor: 'rgba(10, 10, 14, 0.18)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {'</>'}
      </Typography>

      <Typography
        component="span"
        sx={{
          position: 'absolute',
          top: { xs: 24, md: 30 },
          right: { xs: 20, md: 28 },
          zIndex: 3,
          color: 'text.secondary',
          fontFamily: 'var(--mono)',
          fontSize: { xs: 18, md: 22 },
          letterSpacing: '0.16em',
        }}
      >
        _VB
      </Typography>

      {children}

      <SiteNav />
    </Box>
  )
}

export default PageFrame

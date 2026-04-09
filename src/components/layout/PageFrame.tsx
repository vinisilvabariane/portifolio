import { memo, useEffect, useMemo, useState, type ReactNode } from 'react'
import { alpha } from '@mui/material/styles'
import { Box, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material'
import type { Language } from '../../i18n/translations'
import { useI18n } from '../../i18n/useI18n'
import Orb from '../orb/Orb'
import SiteNav from './SiteNav'

interface PageFrameProps {
  children: ReactNode
}

const BackgroundLayer = memo(function BackgroundLayer() {
  return (
    <Box className="home-page__background" aria-hidden="true">
      <Orb
        hue={22}
        hoverIntensity={0.5}
        rotateOnHover
        backgroundColor="#090d18"
      />
    </Box>
  )
})

const ClockPanel = memo(function ClockPanel() {
  const theme = useTheme()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo',
      }),
    [],
  )

  return (
    <Box
      aria-label="Current time"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        minWidth: { xs: 112, md: 132 },
        px: { xs: 1.5, md: 2 },
        py: { xs: 1.1, md: 1.35 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 999,
        color: 'primary.light',
        backgroundColor: alpha(theme.palette.background.default, 0.42),
        backdropFilter: 'blur(12px)',
        boxShadow: `0 12px 30px ${alpha(theme.palette.background.default, 0.24)}`,
      }}
    >
      <Typography
        component="span"
        sx={{
          color: 'text.secondary',
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        Sao Paulo
      </Typography>

      <Typography
        component="span"
        sx={{
          color: 'primary.light',
          fontFamily: 'var(--mono)',
          fontSize: { xs: 18, md: 22 },
          fontWeight: 700,
          letterSpacing: '0.08em',
          lineHeight: 1.1,
        }}
      >
        {timeFormatter.format(now)}
      </Typography>
    </Box>
  )
})

function PageFrame({ children }: PageFrameProps) {
  const { language, setLanguage, t } = useI18n()
  const theme = useTheme()

  function handleLanguageChange(
    _event: React.MouseEvent<HTMLElement>,
    nextLanguage: Language | null,
  ) {
    if (nextLanguage) {
      setLanguage(nextLanguage)
    }
  }

  return (
    <Box component="main" className="home-page">
      <BackgroundLayer />

      <Typography
        component="span"
        sx={{
          position: 'absolute',
          left: { xs: 20, md: 28 },
          bottom: { xs: 20, md: 28 },
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
          backgroundColor: alpha(theme.palette.background.default, 0.18),
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
          display: 'inline-flex',
          alignItems: 'center',
          color: 'text.secondary',
          fontFamily: 'var(--mono)',
          fontSize: { xs: 18, md: 22 },
          letterSpacing: '0.16em',
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '4ch',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderRight: '2px solid',
            borderColor: 'primary.light',
            color: 'text.secondary',
            animation:
              'vb-type 3.2s steps(4, end) infinite, vb-caret 0.9s step-end infinite',
            '@keyframes vb-type': {
              '0%': { width: '0ch' },
              '20%': { width: '4ch' },
              '72%': { width: '4ch' },
              '100%': { width: '0ch' },
            },
            '@keyframes vb-caret': {
              '0%, 49%': { borderColor: 'transparent' },
              '50%, 100%': { borderColor: 'currentColor' },
            },
          }}
        >
          _VB
        </Box>
      </Typography>

      <Box
        sx={{
          position: 'absolute',
          top: { xs: 72, md: 84 },
          right: { xs: 20, md: 28 },
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        <Typography
          component="span"
          sx={{
            color: 'text.secondary',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          {t.languageSwitcherLabel}
        </Typography>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={language}
          onChange={handleLanguageChange}
          aria-label={t.languageSwitcherLabel}
          sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.38),
            backdropFilter: 'blur(12px)',
            borderRadius: 999,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            '& .MuiToggleButtonGroup-grouped': {
              border: 0,
              borderRadius: 0,
            },
          }}
        >
          {(['pt', 'en', 'es'] as const).map((option) => (
            <ToggleButton
              key={option}
              value={option}
              sx={{
                px: 1.4,
                py: 0.75,
                color: 'text.secondary',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                '&.Mui-selected': {
                  color: 'primary.light',
                  backgroundColor: alpha(theme.palette.primary.main, 0.18),
                },
              }}
            >
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {children}

      <Box
        sx={{
          position: 'absolute',
          right: { xs: 20, md: 28 },
          bottom: { xs: 20, md: 28 },
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        <ClockPanel />
      </Box>

      <SiteNav />
    </Box>
  )
}

export default PageFrame

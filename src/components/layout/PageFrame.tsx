import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import type { Language } from '../../i18n/translations'
import { useI18n } from '../../i18n/useI18n'
import Orb from '../orb/Orb'
import SiteNav from './SiteNav'

interface PageFrameProps {
  children: ReactNode
}

function PageFrame({ children }: PageFrameProps) {
  const { language, setLanguage, t } = useI18n()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const timeFormatter = useMemo(() => {
    const localeMap: Record<Language, string> = {
      pt: 'pt-BR',
      en: 'en-US',
      es: 'es-ES',
    }

    return new Intl.DateTimeFormat(localeMap[language], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Sao_Paulo',
    })
  }, [language])

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
            backgroundColor: 'rgba(10, 10, 14, 0.38)',
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
                  backgroundColor: 'rgba(111,124,255,0.18)',
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
        aria-label="Current time"
        sx={{
          position: 'absolute',
          right: { xs: 20, md: 28 },
          bottom: { xs: 20, md: 28 },
          zIndex: 3,
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
          backgroundColor: 'rgba(10, 10, 14, 0.42)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 12px 30px rgba(4, 8, 18, 0.24)',
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

      <SiteNav />
    </Box>
  )
}

export default PageFrame

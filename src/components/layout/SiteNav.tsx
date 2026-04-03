import { alpha } from '@mui/material/styles'
import { Box, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'

type NavItem = {
  label: string
  to: string
  end?: boolean
}

function SiteNav() {
  const { t } = useI18n()
  const theme = useTheme()

  const navItems = [
    { label: t.nav.home, to: '/', end: true },
    { label: t.nav.projects, to: '/projetos' },
    { label: t.nav.about, to: '/sobre' },
    { label: t.nav.contact, to: '/contato' },
  ] satisfies NavItem[]

  return (
    <Box
      sx={{
        position: 'fixed',
        left: { xs: 20, md: 28 },
        top: { xs: 20, md: 28 },
        zIndex: 3,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.35,
        px: { xs: 0.65, md: 0.8 },
        py: { xs: 0.8, md: 0.95 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 999,
        backgroundColor: alpha(theme.palette.background.default, 0.42),
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        transition: 'padding 220ms ease, border-color 220ms ease, background-color 220ms ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.45),
          backgroundColor: alpha(theme.palette.background.default, 0.82),
        },
      }}
    >
      {navItems.map((item) => (
        <Box
          key={item.label}
          component={NavLink}
          to={item.to}
          end={item.end}
          className="site-nav__item"
          sx={{
            maxWidth: 'none',
            opacity: 1,
            transform: 'translateX(0)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            borderRadius: 999,
            color: 'text.primary',
            textDecoration: 'none',
            fontFamily: 'var(--mono)',
            fontSize: 13,
            letterSpacing: '0.08em',
            transition:
              'max-width 240ms ease, opacity 180ms ease, transform 220ms ease, margin 220ms ease, padding 220ms ease, background-color 220ms ease, color 220ms ease',
            ml: 0,
            px: 1.35,
            py: 0.9,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.06)',
            },
            '&.active': {
              color: 'primary.light',
              backgroundColor: alpha(theme.palette.primary.main, 0.14),
            },
          }}
        >
          {item.label}
        </Box>
      ))}
    </Box>
  )
}

export default SiteNav

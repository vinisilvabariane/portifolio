import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'

type NavItem = {
  label: string
  to: string
  end?: boolean
}

function SiteNav() {
  const { t } = useI18n()

  const navItems = [
    { label: t.nav.home, to: '/', end: true },
    { label: t.nav.projects, to: '/projetos' },
    { label: t.nav.about, to: '/sobre' },
    { label: t.nav.contact, to: '/contato' },
  ] satisfies NavItem[]

  return (
    <Box
      sx={{
        position: 'absolute',
        left: { xs: 20, md: 28 },
        top: { xs: 20, md: 28 },
        zIndex: 3,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 1,
        py: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 999,
        backgroundColor: 'rgba(10, 10, 14, 0.42)',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        transition: 'padding 220ms ease, border-color 220ms ease, background-color 220ms ease',
        '&:hover': {
          borderColor: 'rgba(111, 124, 255, 0.45)',
          backgroundColor: 'rgba(13, 16, 31, 0.82)',
        },
        '&:hover .site-nav__item': {
          maxWidth: 160,
          opacity: 1,
          transform: 'translateX(0)',
          px: 1.5,
        },
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.85,
          flexShrink: 0,
          ml: 0.5,
        }}
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            boxShadow: '0 0 18px rgba(111,124,255,0.75)',
            flexShrink: 0,
          }}
        />

        <MenuRoundedIcon
          sx={{
            fontSize: 17,
            color: 'primary.light',
            opacity: 0.92,
            filter: 'drop-shadow(0 0 10px rgba(111,124,255,0.45))',
            transformOrigin: 'center',
            animation: 'site-nav-icon-float 2.4s ease-in-out infinite',
            '@keyframes site-nav-icon-float': {
              '0%, 100%': {
                transform: 'translateY(0)',
                opacity: 0.7,
              },
              '50%': {
                transform: 'translateY(-1px)',
                opacity: 1,
              },
            },
          }}
        />
      </Box>

      {navItems.map((item) => (
        <Box
          key={item.label}
          component={NavLink}
          to={item.to}
          end={item.end}
          className="site-nav__item"
          sx={{
            maxWidth: { xs: 120, md: 0 },
            opacity: { xs: 1, md: 0 },
            transform: { xs: 'translateX(0)', md: 'translateX(-8px)' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            borderRadius: 999,
            color: 'text.primary',
            textDecoration: 'none',
            fontFamily: 'var(--mono)',
            fontSize: 13,
            letterSpacing: '0.08em',
            transition:
              'max-width 240ms ease, opacity 180ms ease, transform 220ms ease, padding 220ms ease, background-color 220ms ease, color 220ms ease',
            px: { xs: 1.5, md: 0 },
            py: 0.9,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.06)',
            },
            '&.active': {
              color: 'primary.light',
              backgroundColor: 'rgba(111,124,255,0.14)',
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

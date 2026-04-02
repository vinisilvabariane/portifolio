import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'

type NavItem = {
  label: string
  to: string
  end?: boolean
}

const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
] satisfies NavItem[]

function SiteNav() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: { xs: 20, md: 28 },
        bottom: { xs: 20, md: 28 },
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
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: 'primary.main',
          boxShadow: '0 0 18px rgba(111,124,255,0.75)',
          flexShrink: 0,
          ml: 0.5,
        }}
      />

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

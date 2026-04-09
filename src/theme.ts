import { alpha, createTheme } from '@mui/material/styles'

type ThemePaletteSet = {
  primary: {
    main: string
    light: string
    dark: string
  }
  secondary: {
    main: string
  }
  background: {
    default: string
    paper: string
    elevated: string
  }
  text: {
    primary: string
    secondary: string
  }
  divider: string
  htmlBackground: string
  paperGradient: string
  shadow: string
}

const themePalette: ThemePaletteSet = {
  primary: {
    main: '#6f7cff',
    light: '#b7bfff',
    dark: '#4953c9',
  },
  secondary: {
    main: '#9f7aea',
  },
  background: {
    default: '#0a0c14',
    paper: 'rgba(12, 15, 28, 0.78)',
    elevated: '#101321',
  },
  text: {
    primary: '#f5f7ff',
    secondary: '#bcc3da',
  },
  divider: 'rgba(255, 255, 255, 0.14)',
  htmlBackground:
    'radial-gradient(circle at top, rgba(111, 124, 255, 0.18), transparent 35%), linear-gradient(180deg, #101321 0%, #0a0c14 100%)',
  paperGradient:
    'linear-gradient(135deg, rgba(9, 9, 11, 0.82), rgba(9, 9, 11, 0.6))',
  shadow: '0 24px 80px rgba(8, 6, 13, 0.28)',
}

export function getAppTheme() {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: themePalette.primary,
      secondary: themePalette.secondary,
      background: {
        default: themePalette.background.default,
        paper: themePalette.background.paper,
      },
      text: themePalette.text,
      divider: themePalette.divider,
    },
    shape: {
      borderRadius: 24,
    },
    typography: {
      fontFamily: "'Ubuntu', sans-serif",
      h1: {
        fontFamily: "'Ubuntu', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(3rem, 6vw, 5rem)',
        lineHeight: 0.95,
        letterSpacing: '-0.06em',
      },
      h2: {
        fontFamily: "'Ubuntu', sans-serif",
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            background: themePalette.htmlBackground,
          },
          body: {
            minWidth: 320,
            backgroundColor: themePalette.background.default,
          },
          '#root': {
            minHeight: '100svh',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(16px)',
            backgroundImage: themePalette.paperGradient,
            boxShadow: themePalette.shadow,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
    },
  })
}

export function getAccentStyles() {
  const theme = getAppTheme()

  return {
    tintSoft: alpha(theme.palette.primary.main, 0.08),
    tintMedium: alpha(theme.palette.primary.main, 0.12),
    tintStrong: alpha(theme.palette.primary.main, 0.18),
    borderSoft: alpha(theme.palette.primary.main, 0.2),
    borderMedium: alpha(theme.palette.primary.main, 0.28),
    borderStrong: alpha(theme.palette.primary.main, 0.42),
    shadow: alpha(theme.palette.background.default, 0.24),
    panelBg: alpha(theme.palette.background.default, 0.42),
    panelBgSoft: alpha(theme.palette.background.default, 0.18),
    panelBgMid: alpha(theme.palette.background.default, 0.38),
    panelBgHover: alpha(theme.palette.background.default, 0.82),
    cardGradient: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.62)})`,
  }
}

import { alpha, createTheme } from '@mui/material/styles'

export type AppThemeMode = 'orb' | 'threads' | 'galaxy'

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

const themePalettes: Record<AppThemeMode, ThemePaletteSet> = {
  orb: {
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
  },
  threads: {
    primary: {
      main: '#f48c45',
      light: '#ffd1ac',
      dark: '#bf5d1d',
    },
    secondary: {
      main: '#ffc166',
    },
    background: {
      default: '#160d08',
      paper: 'rgba(34, 20, 12, 0.76)',
      elevated: '#2a150d',
    },
    text: {
      primary: '#fff4ec',
      secondary: '#e2c4ae',
    },
    divider: 'rgba(255, 224, 198, 0.16)',
    htmlBackground:
      'radial-gradient(circle at top, rgba(244, 140, 69, 0.2), transparent 38%), linear-gradient(180deg, #2a150d 0%, #160d08 100%)',
    paperGradient:
      'linear-gradient(135deg, rgba(37, 21, 12, 0.84), rgba(22, 13, 8, 0.62))',
    shadow: '0 24px 80px rgba(19, 9, 5, 0.34)',
  },
  galaxy: {
    primary: {
      main: '#58f0b2',
      light: '#d8ffef',
      dark: '#1f8f68',
    },
    secondary: {
      main: '#7de1ff',
    },
    background: {
      default: '#05110f',
      paper: 'rgba(8, 28, 23, 0.8)',
      elevated: '#0b1d19',
    },
    text: {
      primary: '#ecfff7',
      secondary: '#9dcfc0',
    },
    divider: 'rgba(174, 255, 223, 0.14)',
    htmlBackground:
      'radial-gradient(circle at top, rgba(88, 240, 178, 0.14), transparent 34%), radial-gradient(circle at 20% 10%, rgba(125, 225, 255, 0.08), transparent 22%), linear-gradient(180deg, #0b1d19 0%, #05110f 100%)',
    paperGradient:
      'linear-gradient(135deg, rgba(8, 28, 23, 0.9), rgba(5, 17, 15, 0.68))',
    shadow: '0 24px 80px rgba(2, 10, 8, 0.36)',
  },
}

export function getAppTheme(mode: AppThemeMode) {
  const paletteSet = themePalettes[mode]

  return createTheme({
    palette: {
      mode: 'dark',
      primary: paletteSet.primary,
      secondary: paletteSet.secondary,
      background: {
        default: paletteSet.background.default,
        paper: paletteSet.background.paper,
      },
      text: paletteSet.text,
      divider: paletteSet.divider,
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
            background: paletteSet.htmlBackground,
          },
          body: {
            minWidth: 320,
            backgroundColor: paletteSet.background.default,
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
            backgroundImage: paletteSet.paperGradient,
            boxShadow: paletteSet.shadow,
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

export function getAccentStyles(mode: AppThemeMode) {
  const theme = getAppTheme(mode)

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

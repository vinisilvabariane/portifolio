import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
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
    },
    text: {
      primary: '#f5f7ff',
      secondary: '#bcc3da',
    },
    divider: 'rgba(255, 255, 255, 0.14)',
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
    h1: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontWeight: 600,
      fontSize: 'clamp(3rem, 6vw, 5rem)',
      lineHeight: 0.95,
      letterSpacing: '-0.06em',
    },
    h2: {
      fontFamily: "Georgia, 'Times New Roman', serif",
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
          background:
            'radial-gradient(circle at top, rgba(111, 124, 255, 0.18), transparent 35%), linear-gradient(180deg, #101321 0%, #0a0c14 100%)',
        },
        body: {
          minWidth: 320,
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
          backgroundImage:
            'linear-gradient(135deg, rgba(9, 9, 11, 0.82), rgba(9, 9, 11, 0.6))',
          boxShadow: '0 24px 80px rgba(8, 6, 13, 0.28)',
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

export default theme

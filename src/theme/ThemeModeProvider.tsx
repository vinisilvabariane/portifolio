import { useMemo, type ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getAppTheme } from '../theme'

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const theme = useMemo(() => getAppTheme(), [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

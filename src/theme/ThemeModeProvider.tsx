import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getAppTheme, type AppThemeMode } from '../theme'

type ThemeModeContextValue = {
  themeMode: AppThemeMode
  setThemeMode: (mode: AppThemeMode) => void
  toggleThemeMode: () => void
}

const STORAGE_KEY = 'portfolio-theme-mode'
const themeModes: AppThemeMode[] = ['orb', 'threads', 'galaxy']

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined)

function getInitialThemeMode(): AppThemeMode {
  if (typeof window === 'undefined') return 'orb'

  const storedThemeMode = window.localStorage.getItem(STORAGE_KEY)
  if (storedThemeMode === 'gradientblinds') return 'galaxy'
  return themeModes.includes(storedThemeMode as AppThemeMode)
    ? (storedThemeMode as AppThemeMode)
    : 'orb'
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<AppThemeMode>(getInitialThemeMode)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, themeMode)
  }, [themeMode])

  const theme = useMemo(() => getAppTheme(themeMode), [themeMode])

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      toggleThemeMode: () =>
        setThemeMode((current) => {
          const currentIndex = themeModes.indexOf(current)
          return themeModes[(currentIndex + 1) % themeModes.length]
        }),
    }),
    [themeMode],
  )

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext)

  if (!context) {
    throw new Error('useThemeMode must be used inside ThemeModeProvider')
  }

  return context
}

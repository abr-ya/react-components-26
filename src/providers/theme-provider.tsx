import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light' | 'system'
export type ResolvedTheme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: ResolvedTheme
  isDark: boolean
}

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const defaultStorageKey = 'component-lib-theme'
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme
}

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement

  root.classList.remove('dark', 'light')
  root.classList.add(theme)
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = defaultStorageKey,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    defaultTheme === 'light' ? 'light' : 'dark',
  )

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null

    if (storedTheme === 'dark' || storedTheme === 'light' || storedTheme === 'system') {
      setThemeState(storedTheme)
    }
  }, [storageKey])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const syncTheme = () => {
      const nextResolvedTheme = resolveTheme(theme)
      applyTheme(nextResolvedTheme)
      setResolvedTheme(nextResolvedTheme)
    }

    syncTheme()

    if (theme !== 'system') {
      return undefined
    }

    mediaQuery.addEventListener('change', syncTheme)
    return () => mediaQuery.removeEventListener('change', syncTheme)
  }, [theme])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return
      }

      const nextTheme = event.newValue as Theme | null

      if (nextTheme === 'dark' || nextTheme === 'light' || nextTheme === 'system') {
        setThemeState(nextTheme)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [storageKey])

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem(storageKey, nextTheme)
    setThemeState(nextTheme)
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, resolvedTheme, isDark: resolvedTheme === 'dark' }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

import { useEffect, useState } from 'react'
import { observeThemeColor } from '@/lib/theme-observer'

export type ResolvedTheme = 'light' | 'dark'

function resolveTheme(): ResolvedTheme {
  const root = document.documentElement
  if (root.classList.contains('dark')) return 'dark'
  if (root.classList.contains('light')) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useResolvedTheme(): ResolvedTheme {
  const [theme, setTheme] = useState<ResolvedTheme>(resolveTheme)

  useEffect(() => {
    const unobserve = observeThemeColor(() => setTheme(resolveTheme()))
    return unobserve
  }, [])

  return theme
}

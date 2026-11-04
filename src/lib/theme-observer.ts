export function readFillColor(colorVar: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(colorVar)
    .trim()
}

export function observeThemeColor(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleMediaChange = (): void => onChange()

  mediaQuery.addEventListener('change', handleMediaChange)

  const themeObserver = new MutationObserver(onChange)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  return () => {
    mediaQuery.removeEventListener('change', handleMediaChange)
    themeObserver.disconnect()
  }
}

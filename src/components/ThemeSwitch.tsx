import { useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  return stored ?? 'auto'
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  if (theme === 'light') root.classList.add('light')
  else if (theme === 'dark') root.classList.add('dark')
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const change = (next: Theme): void => {
    setTheme(next)
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const options: Array<{ value: Theme; icon: typeof Sun; label: string }> = [
    { value: 'auto', icon: Monitor, label: 'Browser preference' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'light', icon: Sun, label: 'Light' },
  ]

  return (
    <div className="bg-muted/40 flex items-center gap-0.5 rounded-md p-0.5">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => change(value)}
          aria-label={label}
          title={label}
          className={cn(
            'flex h-7 w-8 items-center justify-center rounded-sm transition-colors',
            theme === value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}

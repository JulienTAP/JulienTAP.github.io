import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ThemeSwitch } from '@/components/ThemeSwitch'

export interface NavItem {
  readonly id: string
  readonly label: string
}

interface HeaderProps {
  readonly items: ReadonlyArray<NavItem>
}

export function Header({ items }: HeaderProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el !== null) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ): void => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el !== null) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
    }
  }

  return (
    <header className="border-border/40 bg-background/70 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-4 py-3">
        <nav className="flex items-center gap-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'relative px-3 py-1.5 text-sm font-medium transition-colors',
                'text-muted-foreground hover:text-foreground',
                activeId === item.id && 'text-foreground',
              )}
            >
              {item.label}
              <span
                className={cn(
                  'bg-foreground absolute inset-x-3 -bottom-px h-px transition-opacity',
                  activeId === item.id ? 'opacity-100' : 'opacity-0',
                )}
              />
            </a>
          ))}
        </nav>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}

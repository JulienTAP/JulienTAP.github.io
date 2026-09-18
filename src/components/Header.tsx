import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)

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

  const scrollTo = (id: string): void => {
    const el = document.getElementById(id)
    if (el !== null) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
    }
  }

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ): void => {
    e.preventDefault()
    scrollTo(id)
  }

  const handleMobileNav = (id: string): void => {
    scrollTo(id)
    setMobileOpen(false)
  }

  return (
    <header className="border-border/40 bg-background/70 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-4 py-3">
        <nav className="hidden items-center gap-1 sm:flex">
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

        <div className="absolute top-1/2 right-4 hidden -translate-y-1/2 sm:block">
          <ThemeSwitch />
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="text-foreground hover:bg-muted/60 absolute top-1/2 right-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md transition-colors sm:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="bg-background/95 border-border/40 absolute inset-x-0 top-full border-b backdrop-blur-md sm:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col px-4 py-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleMobileNav(item.id)
                }}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                  activeId === item.id && 'text-foreground',
                )}
              >
                {item.label}
              </a>
            ))}
            <div className="border-border/40 mt-2 border-t pt-3">
              <ThemeSwitch />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

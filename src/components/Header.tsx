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
    <>
      <header className="border-border/40 bg-background/70 animate-in fade-in-0 slide-in-from-top-2 fill-mode-both fixed inset-x-0 top-0 z-50 hidden border-b backdrop-blur-md duration-700 sm:block">
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
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="text-foreground bg-background/70 animate-in fade-in-0 slide-in-from-top-2 hover:bg-muted/60 fill-mode-both fixed top-3 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-md backdrop-blur-md transition-colors duration-700 sm:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 sm:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="bg-background border-border/40 fixed top-0 right-0 z-50 flex h-svh w-72 flex-col border-l p-5 sm:hidden">
            <div className="flex items-center justify-between">
              <ThemeSwitch />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-foreground hover:bg-muted/60 flex h-8 w-8 items-center justify-center rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-2">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleMobileNav(item.id)
                  }}
                  className={cn(
                    'text-2xl font-semibold tracking-tight transition-colors',
                    'text-muted-foreground hover:text-foreground',
                    activeId === item.id && 'text-foreground',
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  )
}

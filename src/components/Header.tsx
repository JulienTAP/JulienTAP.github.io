import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { useResolvedTheme } from '@/hooks/useResolvedTheme'

export interface NavItem {
  readonly id: string
  readonly label: string
}

const GITHUB_URL = 'https://github.com/JulienTAP'

function IconLinks() {
  const theme = useResolvedTheme()
  const githubIcon =
    theme === 'dark'
      ? '/icons/git-branch-white.svg'
      : '/icons/git-branch-dark.svg'
  const resumeIcon =
    theme === 'dark' ? '/icons/download-white.svg' : '/icons/download-black.svg'

  return (
    <div className="bg-background/70 sm:bg-muted/40 flex items-center gap-0.5 rounded-md p-0.5 backdrop-blur-md sm:backdrop-blur-none">
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="flex h-7 items-center gap-1.5 rounded-sm px-2 text-xs font-medium opacity-70 transition-opacity hover:opacity-100"
      >
        <img src={githubIcon} alt="" className="size-4" />
        <span>GitHub</span>
      </a>
      <a
        href="/template.txt"
        download="template.txt"
        aria-label="Download resume"
        className="flex h-7 items-center gap-1.5 rounded-sm px-2 text-xs font-medium opacity-70 transition-opacity hover:opacity-100"
      >
        <img src={resumeIcon} alt="" className="size-4" />
        <span>Resume</span>
      </a>
    </div>
  )
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
      <header className="border-border/40 bg-background/70 animate-in fade-in-0 slide-in-from-top-2 fill-mode-both fixed inset-x-0 top-0 z-50 hidden border-b backdrop-blur-md duration-700 md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <IconLinks />
          <nav className="flex items-center gap-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'relative px-2 py-1.5 text-sm font-medium transition-colors lg:px-3',
                  'text-muted-foreground hover:text-foreground',
                  activeId === item.id && 'text-foreground',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'bg-foreground absolute inset-x-2 -bottom-px h-px transition-opacity lg:inset-x-3',
                    activeId === item.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </a>
            ))}
          </nav>
          <ThemeSwitch />
        </div>
      </header>

      <div className="fixed top-3 left-4 z-50 md:hidden">
        <IconLinks />
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="text-foreground bg-background/70 animate-in fade-in-0 slide-in-from-top-2 hover:bg-muted/60 fill-mode-both fixed top-3 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-md backdrop-blur-md transition-colors duration-700 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="bg-background border-border/40 fixed top-0 right-0 z-50 flex h-svh w-72 flex-col border-l p-5 md:hidden">
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
            <nav className="mt-10 flex flex-col gap-4">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleMobileNav(item.id)
                  }}
                  className={cn(
                    'text-3xl font-semibold tracking-tight transition-colors',
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

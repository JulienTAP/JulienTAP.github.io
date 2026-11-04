import { Heart } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { cn } from '@/lib/utils'

const SOCIALS = [
  { label: 'GitHub', href: '#', icon: FaGithub },
  { label: 'LinkedIn', href: '#', icon: FaLinkedin },
  { label: 'Instagram', href: '#', icon: FaInstagram },
]

export function Footer() {
  return (
    <footer className="border-border/40 absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 border-t pt-4 sm:inset-x-12">
      <div>
        <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
          Made with <Heart className="size-3.5 fill-current text-red-500" />
          by me, on earth
        </p>
        <p className="text-muted-foreground/70 mt-1 text-xs">
          © 2026 JulienTAP. All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-2">
        {SOCIALS.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            className={cn(
              'text-muted-foreground hover:bg-muted/60 hover:text-foreground flex h-9 w-9 items-center justify-center rounded-md transition-colors',
            )}
          >
            <Icon className="h-4.5 w-4.5" />
          </a>
        ))}
      </div>
    </footer>
  )
}

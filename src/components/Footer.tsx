import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-border/40 absolute inset-x-6 bottom-6 border-t pt-4 sm:inset-x-12">
      <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
        Made with <Heart className="size-3.5 fill-current text-red-500" /> by
        me, on earth
      </p>
      <p className="text-muted-foreground/70 mt-1 text-xs">
        © 2026 JulienTAP. All rights reserved.
      </p>
    </footer>
  )
}

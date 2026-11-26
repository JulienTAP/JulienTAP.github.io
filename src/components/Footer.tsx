import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-border/40 mt-auto flex w-full flex-col gap-1 border-t px-6 pt-4 pb-6 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:pb-8">
      <p className="text-muted-foreground flex items-center gap-1.5 text-xs sm:text-sm">
        Made with <Heart className="size-3.5 fill-current text-red-500" /> by
        me, on earth
      </p>
      <p className="text-muted-foreground/70 text-xs">
        © 2026 JulienTAP. All rights reserved.
      </p>
    </footer>
  )
}

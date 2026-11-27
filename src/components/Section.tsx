import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  readonly id: string
  readonly children: ReactNode
  readonly className?: string
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative isolate flex h-svh snap-start snap-always flex-col items-start justify-start overflow-hidden px-5 pt-6 pb-5 sm:px-10 md:px-12 md:pt-20 md:pb-8 lg:px-16',
        className,
      )}
    >
      {children}
    </section>
  )
}

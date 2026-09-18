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
        'flex h-svh snap-start snap-always flex-col items-center justify-center px-6',
        className,
      )}
    >
      {children}
    </section>
  )
}

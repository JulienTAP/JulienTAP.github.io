import { cn } from '@/lib/utils'

interface RotatingTitleProps {
  readonly titles: ReadonlyArray<string>
  readonly intervalMs?: number
  readonly className?: string
}

export function RotatingTitle({
  titles,
  intervalMs = 3000,
  className,
}: RotatingTitleProps) {
  const perTitle = intervalMs
  const duration = titles.length * perTitle

  return (
    <div
      className={cn(
        'rotate-title-container relative h-8 overflow-hidden',
        className,
      )}
      aria-label={titles[0]}
    >
      {titles.map((title, i) => (
        <span
          key={title}
          className="text-muted-foreground absolute inset-0 text-xl font-medium"
          style={{
            animation: `rotate-title ${duration}ms ease-in-out infinite`,
            animationDelay: `${i * perTitle - duration}ms`,
          }}
        >
          {title}
        </span>
      ))}
    </div>
  )
}

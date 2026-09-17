import { GameOfLifeBackground } from '@/components/GameOfLifeBackground'

function App() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <GameOfLifeBackground />
      <div className="space-y-3">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          JulienTAP
        </h1>
        <p className="text-muted-foreground text-lg">
          Portfolio under construction
        </p>
      </div>
    </div>
  )
}

export default App

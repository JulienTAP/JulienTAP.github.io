import { useRef } from 'react'
import { GameOfLifeBackground } from '@/components/GameOfLifeBackground'
import { Header, type NavItem } from '@/components/Header'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Work } from '@/sections/Work'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Contact } from '@/sections/Contact'

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const bgRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const el = e.currentTarget
    const sectionHeight = el.clientHeight
    const progress = el.scrollTop / sectionHeight
    const opacity = (1 - progress) ** 2
    if (bgRef.current !== null) {
      bgRef.current.style.opacity = String(opacity)
    }
  }

  return (
    <>
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <GameOfLifeBackground />
      </div>
      <Header items={NAV_ITEMS} />
      <main
        onScroll={handleScroll}
        className="no-scrollbar h-svh snap-y snap-mandatory overflow-y-scroll"
      >
        <About />
        <Skills />
        <Work />
        <Education />
        <Experience />
        <Contact />
      </main>
    </>
  )
}

export default App

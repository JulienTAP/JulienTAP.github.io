import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PortfolioReadyContext } from '@/context/portfolio-ready'
import { Header, type NavItem } from '@/components/Header'
import { Intro } from '@/sections/Intro'
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
  const [introDone, setIntroDone] = useState(false)

  return (
    <PortfolioReadyContext value={introDone}>
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}
      {introDone && <Header items={NAV_ITEMS} />}
      <main
        inert={!introDone}
        className={cn(
          'no-scrollbar h-svh snap-y snap-mandatory',
          introDone ? 'overflow-y-scroll' : 'overflow-hidden',
        )}
      >
        <About />
        <Skills />
        <Work />
        <Education />
        <Experience />
        <Contact />
      </main>
    </PortfolioReadyContext>
  )
}

export default App

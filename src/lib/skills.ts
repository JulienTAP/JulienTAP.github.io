import type { LucideIcon } from 'lucide-react'
import {
  SiDocker,
  SiGit,
  SiLinux,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import {
  BrainCircuit,
  ChartPie,
  Lightbulb,
  MessagesSquare,
  Network,
  ServerCog,
} from 'lucide-react'

export interface TechSkill {
  readonly name: string
  readonly icon: typeof SiReact
  readonly colorLight: string
  readonly colorDark: string
}

export interface AbstractSkill {
  readonly label: string
  readonly icon: LucideIcon
}

export const TECH_STACK: ReadonlyArray<TechSkill> = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
    colorLight: '#3178C6',
    colorDark: '#3178C6',
  },
  { name: 'React', icon: SiReact, colorLight: '#0E7490', colorDark: '#61DAFB' },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    colorLight: '#3C873A',
    colorDark: '#5FA04E',
  },
  {
    name: 'Python',
    icon: SiPython,
    colorLight: '#3776AB',
    colorDark: '#4B8BBE',
  },
  {
    name: 'Docker',
    icon: SiDocker,
    colorLight: '#2496ED',
    colorDark: '#2496ED',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    colorLight: '#4169E1',
    colorDark: '#4169E1',
  },
  { name: 'Git', icon: SiGit, colorLight: '#F05032', colorDark: '#F05032' },
  { name: 'Linux', icon: SiLinux, colorLight: '#B45309', colorDark: '#FCC624' },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    colorLight: '#0891B2',
    colorDark: '#38BDF8',
  },
]

export const ABSTRACT_SKILLS: ReadonlyArray<AbstractSkill> = [
  { label: 'Data visualisation', icon: ChartPie },
  { label: 'Machine Learning', icon: BrainCircuit },
  { label: 'Software architecture', icon: Network },
  { label: 'CI/CD & DevOps', icon: ServerCog },
  { label: 'Problem solving', icon: Lightbulb },
  { label: 'Technical communication', icon: MessagesSquare },
]

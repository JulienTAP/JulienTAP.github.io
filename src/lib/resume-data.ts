export interface EducationNode {
  readonly id: string
  readonly degree: string
  readonly institution: string
  readonly location: string
  readonly period: string
  readonly detail: string
  readonly current: boolean
}

export interface ExperienceItem {
  readonly id: string
  readonly role: string
  readonly organization: string
  readonly department: string
  readonly location: string
  readonly period: string
  readonly year: string
  readonly summary: string
  readonly details: string
  readonly stack: string
  readonly imageCaption: string
}

export interface SkillEntry {
  readonly name: string
  readonly context: string
}

export interface SkillDomain {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly summary: string
  readonly skills: ReadonlyArray<SkillEntry>
}

export interface SpokenLanguage {
  readonly name: string
  readonly levelLabel: string
  readonly level: 1 | 2 | 3 | 4
}

export const EDUCATION_ROADMAP: ReadonlyArray<EducationNode> = [
  {
    id: 'ntu-exchange',
    degree: 'Academic Exchange — Artificial Intelligence',
    institution: 'National Taiwan University (NTU)',
    location: 'Taipei, Taiwan',
    period: 'Sep. 2026 – Present',
    detail:
      'International exchange semester focusing on reinforcement learning, autonomous control, and deep learning.',
    current: true,
  },
  {
    id: 'polytech-meng',
    degree: 'M.Eng. in Computer Science & Mathematical Engineering',
    institution: 'Polytech Paris-Saclay',
    location: 'Orsay, France',
    period: 'Sep. 2024 – Present · Expected Sep. 2027',
    detail:
      'Engineering degree track in software architecture, distributed systems, and applied mathematics.',
    current: true,
  },
  {
    id: 'polytech-peip',
    degree: 'Integrated Engineering Preparatory Program (PeiP)',
    institution: 'Polytech Paris-Saclay',
    location: 'Orsay, France',
    period: 'Sep. 2022 – Jun. 2024',
    detail:
      'Two-year intensive scientific foundation in mathematical analysis, algebra, physics, and algorithms.',
    current: false,
  },
  {
    id: 'isc-bac',
    degree: 'French General Baccalaureate',
    institution: 'Institut du Sacré-Cœur',
    location: 'La Ville-du-Bois, France',
    period: '2022',
    detail: 'Mathematics & Physics specializations.',
    current: false,
  },
]

export const EXPERIENCES: ReadonlyArray<ExperienceItem> = [
  {
    id: 'jeulin-2026',
    role: 'Software Engineering Intern',
    organization: 'Jeulin',
    department: 'R&D Department',
    location: 'Évreux, France',
    period: 'Apr. – Aug. 2026',
    year: '2026',
    summary:
      "Designed and developed a hub concentrator box aggregating the company's existing hardware devices into a unified full-stack ecosystem.",
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    stack: 'Python (FastAPI) · MQTT (Mosquitto) · React · Docker · BLE',
    imageCaption: 'Image placeholder — Hardware hub & system architecture',
  },
  {
    id: 'lisn-2024',
    role: 'VR Development Intern',
    organization: 'LISN',
    department: 'Interdisciplinary Laboratory for Digital Sciences',
    location: 'Orsay, France',
    period: 'Jun. – Jul. 2024',
    year: '2024',
    summary:
      'Developed virtual reality musical instruments designed for medical therapy and motor rehabilitation workflows within a collaborative research team.',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    stack: 'C# · Unity · Blender · Git',
    imageCaption: 'Image placeholder — VR therapeutic environment',
  },
  {
    id: '3sp-2023',
    role: 'Industrial Placement',
    organization: '3SP Technologies',
    department: 'Photonics & Quality Assurance',
    location: 'Nozay, France',
    period: 'Jun. – Jul. 2023',
    year: '2023',
    summary:
      'Performed precision laser quality control under strict cleanroom standards, metrology protocols, and industrial traceability procedures.',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    stack: 'Laser Metrology · Optical Quality Control · Industrial Standards',
    imageCaption: 'Image placeholder — Laser metrology bench',
  },
]

export const SKILL_DOMAINS: ReadonlyArray<SkillDomain> = [
  {
    id: 'languages',
    index: '01',
    title: 'Languages',
    summary:
      'Core programming languages used across systems, AI, and full-stack software.',
    skills: [
      { name: 'Python', context: 'FastAPI (Jeulin) & RL (NTU)' },
      { name: 'C / C++', context: 'HeroRealms OOP & UML engine' },
      { name: 'TypeScript', context: 'React dashboards & UI (Jeulin)' },
      { name: 'Java', context: 'Zeldo 2D game & JavaFX GUI' },
      { name: 'Kotlin', context: 'SteamV2 distributed backend' },
      { name: 'C#', context: 'VR therapy tools in Unity (LISN)' },
      {
        name: 'Bash',
        context: 'Linux automation, build scripts & container workflows',
      },
    ],
  },
  {
    id: 'ai-robotics',
    index: '02',
    title: 'AI & Robotics',
    summary:
      'Reinforcement learning policies, continuous control, and physics simulation.',
    skills: [
      {
        name: 'PyTorch',
        context: 'Policy networks & RL experimentation (NTU)',
      },
      {
        name: 'Stable-Baselines3',
        context: 'PPO, SAC & DQN training pipelines (NTU)',
      },
      { name: 'MuJoCo', context: 'Inverted pendulum physics simulation (NTU)' },
      {
        name: 'Gymnasium',
        context: 'Custom RL control loop environments (NTU)',
      },
    ],
  },
  {
    id: 'web-ui',
    index: '03',
    title: 'Web & UI',
    summary:
      'Backend APIs paired with responsive desktop and browser interfaces.',
    skills: [
      {
        name: 'FastAPI',
        context: 'Hardware hub REST API & device orchestration (Jeulin)',
      },
      {
        name: 'React',
        context: 'Real-time hub dashboard (Jeulin) & portfolio',
      },
      { name: 'JavaFX', context: '2D multiplayer desktop interface (Zeldo)' },
    ],
  },
  {
    id: 'systems-iot',
    index: '04',
    title: 'Systems & IoT',
    summary:
      'Event-driven messaging, hardware connectivity, containers, and design.',
    skills: [
      { name: 'Docker', context: 'Containerized hub stack (Jeulin)' },
      { name: 'MQTT', context: 'Mosquitto broker (Jeulin)' },
      { name: 'BLE', context: 'Lab hardware hub (Jeulin)' },
      { name: 'Kafka', context: 'Event-driven Avro (SteamV2)' },
      { name: 'Git', context: 'Team workflows (LISN, Jeulin)' },
      { name: 'Figma', context: 'Interface wireframes & UI' },
    ],
  },
  {
    id: '3d-engines',
    index: '05',
    title: '3D & Engines',
    summary:
      'Interactive real-time 3D environments and custom geometric assets.',
    skills: [
      {
        name: 'Unity',
        context: 'VR musical therapy instruments (LISN)',
      },
      {
        name: 'Blender',
        context: '3D instrument modeling & scene assets (LISN)',
      },
    ],
  },
]

export const SPOKEN_LANGUAGES: ReadonlyArray<SpokenLanguage> = [
  { name: 'French', levelLabel: 'Native', level: 4 },
  { name: 'English', levelLabel: 'B2', level: 3 },
  { name: 'Spanish', levelLabel: 'A2', level: 1 },
  { name: 'Mandarin', levelLabel: 'A1', level: 1 },
]

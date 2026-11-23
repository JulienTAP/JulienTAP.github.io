import type { LucideIcon } from 'lucide-react'
import { Mail } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

export const CONTACT_EMAIL = 'contact@julientap.dev'

export const GITHUB_URL = 'https://github.com/JulienTAP'

export interface ContactChannel {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly icon: IconType | LucideIcon
  readonly external?: boolean
}

export const CONTACT_CHANNELS: ReadonlyArray<ContactChannel> = [
  {
    id: 'email',
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: GITHUB_URL,
    icon: FaGithub,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: '#',
    icon: FaLinkedin,
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: '#',
    icon: FaInstagram,
    external: true,
  },
]

import type { Project, SocialLink, Equipment } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Cosmic Quest',
    studio: 'Cosmic Quest Studios',
    role: 'Kivo',
    status: 'UPCOMING',
  },
  {
    id: '2',
    title: 'Danganronpa: False Hope',
    studio: '-',
    role: 'Bianca Solace',
    status: 'IN PROGRESS',
  },
  {
    id: '3',
    title: 'NEW GAME Z',
    studio: 'JakeandMason',
    role: 'Yua Sato, Asher',
    status: 'UPCOMING',
  },
  {
    id: '4',
    title: "playlands n' sanity",
    studio: '-',
    role: 'Grace',
    status: 'IN PROGRESS',
  },
  {
    id: '5',
    title: 'PROJECT_VEIL',
    studio: '-',
    role: 'Mira',
    status: 'IN PROGRESS',
  },
  {
    id: '6',
    title: 'Rogue Lineage The Animation',
    studio: 'doc7090',
    role: 'Aziah',
    status: 'IN PROGRESS',
  },
  {
    id: '7',
    title: 'Seasons',
    studio: 'FairFox',
    role: 'Tuesday',
    status: 'IN PROGRESS',
  },
  {
    id: '8',
    title: 'See You Soon',
    studio: 'illvson',
    role: 'Amari Kim',
    status: 'UPCOMING',
  },
  {
    id: '9',
    title: 'World Genesis',
    studio: '{0} Ideas Production',
    role: 'Kiarra Voss',
    status: 'UPCOMING',
  },
];

export const studios: string[] = [
  'Cosmic Quest Studios',
  'FairFox Studios',
  '1Drink Productions',
  'Secretum Studios',
  '+ more',
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'YouTube',
    handle: '@yanbieva',
    url: 'https://youtube.com/@yanbieva',
    icon: 'youtube',
  },
  {
    platform: 'Casting Call',
    handle: '@yanbie',
    url: '#',
    icon: 'mic',
  },
  {
    platform: 'Discord',
    handle: '@yanbieva',
    url: '#',
    icon: 'message-circle',
  },
  {
    platform: 'TikTok',
    handle: '@yanbieva',
    url: 'https://tiktok.com/@yanbieva',
    icon: 'music',
  },
];

export const equipment: Equipment[] = [
  {
    category: 'Microphone',
    items: ['Rode NT1 (5th Gen)'],
  },
  {
    category: 'Interface',
    items: ['Focusrite Scarlett Solo (4th Gen)'],
  },
  {
    category: 'Software',
    items: ['Audacity (DAW)'],
  },
  {
    category: 'Studio',
    items: ['Home Studio Treated with Blankets + Acoustic Panels'],
  },
];

export const characterArchetypes = [
  { name: 'Villains', color: 'bg-purple-100 text-purple-700' },
  { name: 'Bubbly + Energetic', color: 'bg-pink-100 text-pink-700' },
  { name: 'Mean + Bratty', color: 'bg-orange-100 text-orange-700' },
];

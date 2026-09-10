export type TeamRoleKey = 'host' | 'editor' | 'aiCreator';

export interface TeamMember {
  id: string;
  roleKey: TeamRoleKey;
  name: string;
  social: { label: string; url: string };
}

// Placeholder names and links — replace with the real team before launch.
export const team: TeamMember[] = [
  { id: 'host', roleKey: 'host', name: 'Имя Фамилия', social: { label: '@instagram', url: 'https://instagram.com/' } },
  { id: 'editor', roleKey: 'editor', name: 'Имя Фамилия', social: { label: '@instagram', url: 'https://instagram.com/' } },
  { id: 'ai-creator', roleKey: 'aiCreator', name: 'Имя Фамилия', social: { label: '@instagram', url: 'https://instagram.com/' } },
];

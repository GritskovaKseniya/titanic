import { saveDoc, seedCollection, useLiveCollection } from './liveCollection';

export type TeamRoleKey = 'host' | 'editor' | 'aiCreator';

export interface TeamMember {
  id: string;
  roleKey: TeamRoleKey;
  name: string;
  social: { label: string; url: string };
  /** Public Storage URL of a portrait, once uploaded via /admin. */
  photoUrl?: string;
}

// Placeholder names and links — replace with the real team via /admin.
export const defaultTeam: TeamMember[] = [
  { id: 'host', roleKey: 'host', name: 'Имя Фамилия', social: { label: '@instagram', url: 'https://instagram.com/' } },
  { id: 'editor', roleKey: 'editor', name: 'Имя Фамилия', social: { label: '@instagram', url: 'https://instagram.com/' } },
  { id: 'ai-creator', roleKey: 'aiCreator', name: 'Имя Фамилия', social: { label: '@instagram', url: 'https://instagram.com/' } },
];

export const useTeam = (): TeamMember[] => useLiveCollection<TeamMember>('team', defaultTeam);

export const saveTeamMember = (member: TeamMember): Promise<void> => saveDoc('team', member.id, member);

export const seedTeam = (): Promise<void> =>
  seedCollection(
    'team',
    defaultTeam.map((m) => ({ id: m.id, data: m })),
  );

import { saveDoc, seedCollection, useLiveCollection } from './liveCollection';

export type TeamRoleKey = 'producer' | 'director' | 'editor' | 'aiFilmmaker';

export interface TeamMember {
  id: string;
  roleKey: TeamRoleKey;
  name: string;
  /** Omitted until a real handle is known — no placeholder social links on real names. */
  social?: { label: string; url: string };
  /** Public Storage URL of a portrait, once uploaded via /admin. */
  photoUrl?: string;
}

// Real credits, from the episode 6 poster.
export const defaultTeam: TeamMember[] = [
  { id: 'producer', roleKey: 'producer', name: 'Tata Feodoridi' },
  { id: 'director', roleKey: 'director', name: 'Konstantin Frolov' },
  { id: 'editor', roleKey: 'editor', name: 'Anastasia Arsentieva' },
  { id: 'ai-filmmaker-1', roleKey: 'aiFilmmaker', name: 'Volha Chyzh' },
  { id: 'ai-filmmaker-2', roleKey: 'aiFilmmaker', name: 'Aleksandra Novikova' },
];

export const useTeam = (): TeamMember[] => useLiveCollection<TeamMember>('team', defaultTeam);

export const saveTeamMember = (member: TeamMember): Promise<void> => saveDoc('team', member.id, member);

export const seedTeam = (): Promise<void> =>
  seedCollection(
    'team',
    defaultTeam.map((m) => ({ id: m.id, data: m })),
  );

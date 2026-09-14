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

// Real credits, from the episode 6 poster plus the full AI-filmmaker roster.
// AI filmmakers are kept alphabetical by first name.
export const defaultTeam: TeamMember[] = [
  { id: 'producer', roleKey: 'producer', name: 'Tata Feodoridi' },
  { id: 'director', roleKey: 'director', name: 'Konstantin Frolov' },
  { id: 'editor', roleKey: 'editor', name: 'Anastasia Arsentieva' },
  { id: 'ai-filmmaker-1', roleKey: 'aiFilmmaker', name: 'Aleksandra Novikova' },
  { id: 'ai-filmmaker-2', roleKey: 'aiFilmmaker', name: 'Elena Frolova' },
  { id: 'ai-filmmaker-3', roleKey: 'aiFilmmaker', name: 'Kseniia Hrytskova' },
  { id: 'ai-filmmaker-4', roleKey: 'aiFilmmaker', name: 'Larisa Mocan' },
  { id: 'ai-filmmaker-5', roleKey: 'aiFilmmaker', name: 'Maria Ermolina' },
  { id: 'ai-filmmaker-6', roleKey: 'aiFilmmaker', name: 'Volha Chyzh' },
];

export const useTeam = (): TeamMember[] => useLiveCollection<TeamMember>('team', defaultTeam);

export const saveTeamMember = (member: TeamMember): Promise<void> => saveDoc('team', member.id, member);

export const seedTeam = (): Promise<void> =>
  seedCollection(
    'team',
    defaultTeam.map((m) => ({ id: m.id, data: m })),
  );

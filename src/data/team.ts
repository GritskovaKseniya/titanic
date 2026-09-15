import { saveDoc, seedCollection, useLiveCollection } from './liveCollection';

export type TeamRoleKey = 'producer' | 'director' | 'editor' | 'aiFilmmaker';

export interface TeamMember {
  id: string;
  roleKey: TeamRoleKey;
  name: string;
  /** Omitted until a real handle is known — no placeholder social links on real names. */
  social?: { label: string; url: string };
  /** Path under public/team/ (or a full URL) of a portrait, once set via /admin. */
  photoUrl?: string;
  /** Display order — Firestore doesn't otherwise guarantee document order. */
  order: number;
}

// Real credits, from the episode 6 poster plus the full AI-filmmaker roster.
// AI filmmakers are kept alphabetical by last name.
export const defaultTeam: TeamMember[] = [
  { id: 'producer', roleKey: 'producer', name: 'Tata Feodoridi', order: 0 },
  { id: 'director', roleKey: 'director', name: 'Konstantin Frolov', order: 1 },
  { id: 'editor', roleKey: 'editor', name: 'Anastasia Arsentieva', order: 2 },
  { id: 'ai-filmmaker-1', roleKey: 'aiFilmmaker', name: 'Volha Chyzh', order: 3 },
  { id: 'ai-filmmaker-2', roleKey: 'aiFilmmaker', name: 'Maria Ermolina', order: 4 },
  { id: 'ai-filmmaker-3', roleKey: 'aiFilmmaker', name: 'Elena Frolova', order: 5 },
  { id: 'ai-filmmaker-4', roleKey: 'aiFilmmaker', name: 'Kseniia Hrytskova', order: 6 },
  { id: 'ai-filmmaker-5', roleKey: 'aiFilmmaker', name: 'Larisa Mocan', order: 7 },
  { id: 'ai-filmmaker-6', roleKey: 'aiFilmmaker', name: 'Aleksandra Novikova', order: 8 },
];

export const useTeam = (): TeamMember[] => useLiveCollection<TeamMember>('team', defaultTeam, 'order');

export const saveTeamMember = (member: TeamMember): Promise<void> => saveDoc('team', member.id, member);

export const seedTeam = (): Promise<void> =>
  seedCollection(
    'team',
    defaultTeam.map((m) => ({ id: m.id, data: m })),
  );

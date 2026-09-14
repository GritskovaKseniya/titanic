import { saveDoc, seedCollection, useLiveCollection } from './liveCollection';
import posterMargaretBrown from '../assets/posters/06-margaret-brown.jpg';
import posterWilliamStead from '../assets/posters/02-william-thomas-stead.jpg';

export interface Episode {
  number: number;
  title: { ru: string; en: string };
  /** One-line role/class descriptor shown under the name — no outcome, that's the episode's to tell. */
  role: { ru: string; en: string };
  description: { ru: string; en: string };
  /** Vimeo video id or private-hash URL. Empty until the episode is published. */
  vimeoId: string;
  /**
   * Public URL of this episode's poster (Firebase Storage, once uploaded via
   * /admin). Empty until supplied — the episode row then falls back to a
   * plain timecode numeral instead of a broken image.
   */
  posterUrl: string;
}

// The season's real roster. The synopsis only sets up who they were and how
// they came to be on the ship — how they acted that night, and whether they
// survived, is what the episode itself tells, so it's deliberately left out
// here. Fill `vimeoId`/`posterUrl` as episodes are cut and their posters are
// ready (or do it through /admin).
export const defaultEpisodes: Episode[] = [
  {
    number: 1,
    title: { ru: 'Томас Эндрюс', en: 'Thomas Andrews' },
    role: { ru: 'Корабельный архитектор', en: "Ship's architect" },
    description: {
      ru: 'Главный конструктор «Титаника» от верфи Harland & Wolff — в первом рейсе, чтобы своими глазами увидеть, как ведёт себя в море его корабль.',
      en: "The Titanic's own naval architect from Harland & Wolff, sailing on her maiden voyage to see his design at sea for the first time.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 2,
    title: { ru: 'Уильям Томас Стед', en: 'William Thomas Stead' },
    role: { ru: 'Журналист, первый класс', en: 'Journalist, first class' },
    description: {
      ru: 'Один из самых известных журналистов Британии, пионер «нового журнализма» и борец за социальные реформы. Плыл в Нью-Йорк по личному приглашению президента Тафта — выступить на конгрессе мира в Карнеги-холле.',
      en: "One of Britain's best-known journalists, a pioneer of investigative \"New Journalism\" and social reform. He was sailing to New York at President Taft's personal invitation, to speak at a peace congress in Carnegie Hall.",
    },
    vimeoId: '',
    posterUrl: posterWilliamStead,
  },
  {
    number: 3,
    title: { ru: 'Вайолетт Констанс Джессоп', en: 'Violet Constance Jessop' },
    role: { ru: 'Стюардесса', en: 'Stewardess' },
    description: {
      ru: 'Ирландская эмигрантка, устроившаяся стюардессой ради заработка, — уже пережившая столкновение «Олимпика», систершипа «Титаника».',
      en: "An Irish emigrant working as a stewardess to earn a living — who had already survived a collision aboard the Titanic's sister ship Olympic.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 4,
    title: { ru: 'Джон Джейкоб Астор', en: 'John Jacob Astor' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Один из богатейших людей мира, возвращался в Нью-Йорк с молодой женой Мэдлин после скандального для общества второго брака — их медовый месяц по Европе и Египту подходил к концу.',
      en: "One of the richest men alive, sailing home to New York with his young second wife Madeleine after a marriage society had gossiped about — their honeymoon through Europe and Egypt was ending.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 5,
    title: { ru: 'Нешан Крекорян', en: 'Neshan Krekorian' },
    role: { ru: 'Третий класс', en: 'Third class' },
    description: {
      ru: 'Молодой армянин из города Кеги в Османской империи, плыл третьим классом в Канаду — к брату, уже обосновавшемуся в Брантфорде, Онтарио.',
      en: 'A young Armenian from Keghi in the Ottoman Empire, sailing third class to Canada — to a brother already settled in Brantford, Ontario.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 6,
    title: { ru: 'Маргарет Браун', en: 'Margaret Brown' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Жена разбогатевшего на серебряных рудниках шахтёра, так и не принятая высшим обществом Денвера. На «Титаник» она поднялась в Шербуре, возвращаясь домой из путешествия по Европе.',
      en: 'Wife of a miner who struck it rich in silver, never quite accepted by Denver society. She boarded at Cherbourg, on her way home from a trip through Europe.',
    },
    vimeoId: '',
    posterUrl: posterMargaretBrown,
  },
  {
    number: 7,
    title: { ru: 'Бенджамин Гуггенхайм', en: 'Benjamin Guggenheim' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Наследник горнодобывающего состояния Гуггенхаймов, бизнесмен. Возвращался в Нью-Йорк из Парижа вместе со своим секретарём и слугой.',
      en: 'Heir to the Guggenheim mining fortune and a businessman in his own right, sailing home to New York from Paris with his secretary and valet.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 8,
    title: { ru: 'Ева Харт', en: 'Eva Hart' },
    role: { ru: 'Второй класс, 7 лет', en: 'Second class, age 7' },
    description: {
      ru: 'Семилетняя англичанка, плыла вторым классом с родителями — семья эмигрировала в Виннипег, Канада, начинать новую жизнь.',
      en: 'A seven-year-old English girl, sailing second class with her parents — the family was emigrating to Winnipeg, Canada, for a fresh start.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 9,
    title: { ru: 'Арчибальд Батт', en: 'Archibald Butt' },
    role: { ru: 'Военный советник президента США', en: 'Military aide to the U.S. President' },
    description: {
      ru: 'Майор американской армии, личный военный адъютант президента Тафта. Возвращался в Вашингтон после отпуска в Европе, во время которого был принят папой римским в Риме.',
      en: "A U.S. Army major serving as President Taft's personal military aide, returning to Washington after a European trip that included an audience with the Pope in Rome.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 10,
    title: { ru: 'Изидор и Ида Штраус', en: 'Isidor and Ida Straus' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Совладелец универмага Macy’s и его жена — вместе больше сорока лет. Возвращались домой в Нью-Йорк после традиционной зимней поездки в Европу.',
      en: "The co-owner of Macy's and his wife of more than forty years, sailing home to New York after their usual winter trip to Europe.",
    },
    vimeoId: '',
    posterUrl: '',
  },
];

/** Live episode list from Firestore, falling back to `defaultEpisodes`. */
export const useEpisodes = (): Episode[] => useLiveCollection<Episode>('episodes', defaultEpisodes, 'number');

export const saveEpisode = (episode: Episode): Promise<void> =>
  saveDoc('episodes', String(episode.number), episode);

/** One-time (idempotent) load of the starter roster into Firestore. */
export const seedEpisodes = (): Promise<void> =>
  seedCollection(
    'episodes',
    defaultEpisodes.map((e) => ({ id: String(e.number), data: e })),
  );

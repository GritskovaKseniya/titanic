import { saveDoc, seedCollection, useLiveCollection } from './liveCollection';

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

// Ten placeholder episodes for the single season. Each follows one real
// person aboard the Titanic. The synopsis only sets up who they were and how
// they came to be on the ship — how they acted that night, and whether they
// survived, is what the episode itself tells, so it's deliberately left out
// here. Replace the copy with the show's own research and fill
// `vimeoId`/`posterUrl` as episodes are cut and their posters are ready.
export const defaultEpisodes: Episode[] = [
  {
    number: 1,
    title: { ru: 'Маргарет «Молли» Браун', en: 'Margaret "Molly" Brown' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Жена разбогатевшего на серебряных рудниках шахтёра, так и не принятая высшим обществом Денвера. На «Титаник» она поднялась в Шербуре, возвращаясь домой из путешествия по Европе.',
      en: 'Wife of a miner who struck it rich in silver, never quite accepted by Denver society. She boarded at Cherbourg, on her way home from a trip through Europe.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 2,
    title: { ru: 'Джон Джейкоб Астор IV', en: 'John Jacob Astor IV' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Один из богатейших людей мира, возвращался в Нью-Йорк с молодой женой Мэдлин после скандального для общества второго брака — их медовый месяц по Европе и Египту подходил к концу.',
      en: "One of the richest men alive, sailing home to New York with his young second wife Madeleine after a marriage society had gossiped about — their honeymoon through Europe and Egypt was ending.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 3,
    title: { ru: 'Изидор и Ида Штраус', en: 'Isidor and Ida Straus' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Совладелец универмага Macy’s и его жена — вместе больше сорока лет. Возвращались домой в Нью-Йорк после традиционной зимней поездки в Европу.',
      en: "The co-owner of Macy's and his wife of more than forty years, sailing home to New York after their usual winter trip to Europe.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 4,
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
    number: 5,
    title: { ru: 'Эдвард Джон Смит', en: 'Edward John Smith' },
    role: { ru: 'Капитан', en: 'Captain' },
    description: {
      ru: 'Самый опытный капитан White Star Line — этот рейс должен был стать последним перед его отставкой.',
      en: 'White Star Line’s most senior captain, due to retire after this one final crossing.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 6,
    title: { ru: 'Вайолет Джессоп', en: 'Violet Jessop' },
    role: { ru: 'Стюардесса', en: 'Stewardess' },
    description: {
      ru: 'Ирландская эмигрантка, устроившаяся стюардессой ради заработка, — уже пережившая столкновение «Олимпика», систершипа «Титаника».',
      en: "An Irish emigrant working as a stewardess to earn a living — who had already survived a collision aboard the Titanic's sister ship Olympic.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 7,
    title: { ru: 'Уоллес Хартли', en: 'Wallace Hartley' },
    role: { ru: 'Капельмейстер оркестра', en: 'Bandmaster' },
    description: {
      ru: 'Руководитель судового оркестра — за несколько недель до рейса он сделал предложение невесте.',
      en: 'Leader of the ship’s band, who had proposed to his fiancée just weeks before sailing.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 8,
    title: { ru: 'Джозеф Брюс Исмей', en: 'J. Bruce Ismay' },
    role: { ru: 'Управляющий директор White Star Line', en: 'White Star Line chairman' },
    description: {
      ru: 'Глава компании-владельца «Титаника» — шёл на борту как пассажир, чтобы лично увидеть в деле новый флагман.',
      en: 'Head of the company that owned the Titanic, sailing as a passenger to watch his new flagship perform.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 9,
    title: { ru: 'Джек Филлипс', en: 'Jack Phillips' },
    role: { ru: 'Старший радист', en: 'Senior wireless operator' },
    description: {
      ru: 'Радист компании Marconi — весь вечер разбирал скопившиеся личные телеграммы пассажиров.',
      en: "The Marconi Company's senior operator, spending the evening clearing a backlog of passengers' private telegrams.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 10,
    title: { ru: 'Юджин Дейли', en: 'Eugene Daly' },
    role: { ru: 'Третий класс', en: 'Third class' },
    description: {
      ru: 'Ирландский эмигрант из графства Голуэй, плывший в Америку в поисках работы, — на палубе он играл на волынке, прощаясь с берегом.',
      en: 'An Irish emigrant from County Galway sailing to America for work — he played his pipes on deck as the coastline slipped away.',
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

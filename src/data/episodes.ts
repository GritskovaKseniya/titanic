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
   * This episode's poster: a path relative to public/ (e.g.
   * "posters/06-margaret-brown.jpg" — upload the file via GitHub's web UI)
   * or a full external URL. Empty until supplied — the episode row then
   * falls back to a plain timecode numeral instead of a broken image.
   */
  posterUrl: string;
  /**
   * Vertical crop anchor (0–100, % from top) for the 16:9 thumbnail — posters
   * are portrait with the face above center, and each artist places it a bit
   * differently, so this is tunable per episode instead of one global guess.
   * Defaults to 25 (fits both current posters) when unset.
   */
  posterFocusY?: number;
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
      ru: 'Родился в 1873 году в Комбере (Ирландия), в семье судостроителей. В 1889 году поступил учеником на верфь Harland & Wolff в Белфасте и дослужился до управляющего директора и главы чертёжного отдела — под его руководством спроектировали «Титаник». В первый рейс он взошёл, чтобы своими глазами увидеть, как ведёт себя в море его корабль.',
      en: 'Born in 1873 in Comber, Ireland, into a family of shipbuilders. He joined the Harland & Wolff yard in Belfast as an apprentice in 1889 and rose to managing director and head of the drafting department — his team designed the Titanic. He boarded her maiden voyage to see for himself how his ship performed at sea.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 2,
    title: { ru: 'Уильям Томас Стед', en: 'William Thomas Stead' },
    role: { ru: 'Журналист, первый класс', en: 'Journalist, first class' },
    description: {
      ru: 'Родился в 1849 году в Англии, один из основателей британской журналистики расследований. В 1892 году прогремел разоблачением детской проституции в Лондоне — и ненадолго угодил за решётку за эту публикацию. Редактировал Pall Mall Gazette и Review of Reviews. В 1912 году отправился в Нью-Йорк выступить на конгрессе мира — обратный билет первым классом был на «Титаник».',
      en: "Born in 1849 in England, one of the founders of British investigative journalism. His 1892 exposé of child prostitution in London made headlines — and briefly put him in jail. He edited the Pall Mall Gazette and the Review of Reviews. In 1912 he sailed to New York to speak at a peace congress; his first-class return ticket was booked on the Titanic.",
    },
    vimeoId: '',
    posterUrl: 'posters/02-william-thomas-stead.jpg',
  },
  {
    number: 3,
    title: { ru: 'Вайолетт Констанс Джессоп', en: 'Violet Constance Jessop' },
    role: { ru: 'Стюардесса', en: 'Stewardess' },
    description: {
      ru: 'Родилась в 1887 году в Аргентине в семье ирландских эмигрантов, выросла в Англии. С 1908 года работала стюардессой на лайнерах Royal Mail Line, включая «Олимпик» — систершип «Титаника». В 1912 году её пригласили в команду первого рейса «Титаника».',
      en: "Born in 1887 in Argentina to Irish immigrant parents, raised mostly in England. From 1908 she worked as a stewardess for the Royal Mail Line, serving aboard liners including the Olympic — the Titanic's sister ship. In 1912 she was recruited for the Titanic's maiden voyage.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 4,
    title: { ru: 'Джон Джейкоб Астор', en: 'John Jacob Astor' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Родился в 1864 году в семье Асторов, разбогатевшей на пушной торговле и недвижимости; сам построил отель Astor и участвовал в застройке Бродвея. Возвращался в Нью-Йорк с молодой второй женой Мэдлин после скандального для общества брака — их медовый месяц по Европе и Египту подходил к концу.',
      en: 'Born in 1864 into the Astor family fortune, built on fur trading and real estate; he added to it himself, developing the Astor Hotel and stretches of Broadway. He was sailing home to New York with his young second wife, Madeleine, after a marriage society had gossiped about — their honeymoon through Europe and Egypt was ending.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 5,
    title: { ru: 'Нешан Крекорян', en: 'Neshan Krekorian' },
    role: { ru: 'Третий класс', en: 'Third class' },
    description: {
      ru: 'Родился в 1887 году в Таласе (Османская империя), армянин, фермер. В 1912 году поднялся на «Титаник» в Шербуре пассажиром третьего класса — плыл в Америку, чтобы начать новую жизнь.',
      en: 'Born in 1887 in Talas, in the Ottoman Empire, an Armenian farmer. In 1912 he boarded the Titanic at Cherbourg as a third-class passenger, sailing to America for a fresh start.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 6,
    title: { ru: 'Маргарет Браун', en: 'Margaret Brown' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Родилась в 1867 году в Миссури в семье ирландских эмигрантов, перепробовала множество профессий, пока не вышла замуж за Джей Джея Брауна, разбогатевшего на добыче серебра. В 1912 году «Молли» Браун возвращалась в Америку первым классом вместе с дочерью после путешествия по Египту и Европе.',
      en: 'Born in 1867 in Missouri to Irish immigrant parents, she worked a string of jobs before marrying J.J. Brown, who struck it rich in mining. In 1912 "Molly" Brown was sailing home to America in first class with her daughter, after touring Egypt and Europe.',
    },
    vimeoId: '',
    posterUrl: 'posters/06-margaret-brown.jpg',
    posterFocusY: 50,
  },
  {
    number: 7,
    title: { ru: 'Бенджамин Гуггенхайм', en: 'Benjamin Guggenheim' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Родился в 1865 году в состоятельной семье, сам расширил дело в горнодобыче и металлургии, вложился в железные дороги и судоходные линии. В 1912 году поднялся на «Титаник» в Шербуре с личным камердинером, путешествуя первым классом.',
      en: 'Born in 1865 into a wealthy mining family, he built on it himself in mining and smelting, and expanded into railroads and steamship lines. In 1912 he boarded the Titanic at Cherbourg with his valet, traveling first class.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 8,
    title: { ru: 'Ева Харт', en: 'Eva Hart' },
    role: { ru: 'Второй класс, 7 лет', en: 'Second class, age 7' },
    description: {
      ru: 'Родилась 31 января 1905 года в Илфорде (Англия). В свои неполные семь лет плыла вторым классом с родителями, Эстер и Бенджамином Харт, — семья эмигрировала в Канаду в поисках лучшей жизни.',
      en: 'Born on 31 January 1905 in Ilford, England. Not yet seven, she was sailing second class with her parents, Esther and Benjamin Hart — the family was emigrating to Canada for a better life.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 9,
    title: { ru: 'Арчибальд Батт', en: 'Archibald Butt' },
    role: { ru: 'Военный советник президента США', en: 'Military aide to the U.S. President' },
    description: {
      ru: 'Родился в 1865 году в Огасте (Джорджия). Служил в испано-американской войне, работал журналистом, затем стал адъютантом президентов Теодора Рузвельта и Уильяма Тафта. В 1912 году возвращался в Америку после шестинедельного отпуска в Европе — билет первого класса был на «Титаник».',
      en: 'Born in 1865 in Augusta, Georgia. He served in the Spanish-American War, worked as a journalist, then became an aide to Presidents Theodore Roosevelt and William Howard Taft. In 1912 he was returning to America after a six-week vacation in Europe — his first-class ticket was on the Titanic.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 10,
    title: { ru: 'Изидор и Ида Штраус', en: 'Isidor and Ida Straus' },
    role: { ru: 'Первый класс', en: 'First class' },
    description: {
      ru: 'Немецко-американский бизнесмен, совладелец универмага Macy’s, и его жена, соучредительница благотворительного фонда Straus Foundation, — вместе больше сорока лет. В 1912 году поднялись на «Титаник» в Саутгемптоне первым классом, возвращаясь домой в Нью-Йорк после отпуска в Европе.',
      en: "A German-American businessman, co-owner of Macy's department store, and his wife, co-founder of the Straus Foundation — married more than forty years. In 1912 they boarded the Titanic at Southampton in first class, on their way home to New York after a European holiday.",
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

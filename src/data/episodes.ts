import { Language } from '../i18n/translations';
import { saveDoc, seedCollection, useLiveCollection } from './liveCollection';

type LocalizedText = Record<Language, string>;

export interface Episode {
  number: number;
  title: LocalizedText;
  /** One-line role/class descriptor shown under the name — no outcome, that's the episode's to tell. */
  role: LocalizedText;
  description: LocalizedText;
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
    title: {
      en: 'Thomas Andrews',
      ru: 'Томас Эндрюс',
      fr: 'Thomas Andrews',
      es: 'Thomas Andrews',
      de: 'Thomas Andrews',
      it: 'Thomas Andrews',
    },
    role: {
      en: "Ship's architect",
      ru: 'Корабельный архитектор',
      fr: 'Architecte du navire',
      es: 'Arquitecto del barco',
      de: 'Schiffsarchitekt',
      it: 'Architetto della nave',
    },
    description: {
      en: 'Born in 1873 in Comber, Ireland, into a family of shipbuilders. He joined the Harland & Wolff yard in Belfast as an apprentice in 1889 and rose to managing director and head of the drafting department — his team designed the Titanic. He boarded her maiden voyage to see for himself how his ship performed at sea.',
      ru: 'Родился в 1873 году в Комбере (Ирландия), в семье судостроителей. В 1889 году поступил учеником на верфь Harland & Wolff в Белфасте и дослужился до управляющего директора и главы чертёжного отдела — под его руководством спроектировали «Титаник». В первый рейс он взошёл, чтобы своими глазами увидеть, как ведёт себя в море его корабль.',
      fr: "Né en 1873 à Comber, en Irlande, dans une famille de constructeurs navals. Il entre comme apprenti au chantier Harland & Wolff de Belfast en 1889 et devient directeur général et chef du bureau d'études — son équipe a conçu le Titanic. Il embarque pour le voyage inaugural afin de voir de ses propres yeux comment son navire se comporte en mer.",
      es: 'Nacido en 1873 en Comber, Irlanda, en una familia de constructores navales. Ingresó como aprendiz en el astillero Harland & Wolff de Belfast en 1889 y llegó a ser director gerente y jefe del departamento de diseño — su equipo diseñó el Titanic. Embarcó en el viaje inaugural para ver con sus propios ojos cómo se comportaba su barco en el mar.',
      de: 'Geboren 1873 in Comber, Irland, in eine Familie von Schiffbauern. 1889 begann er als Lehrling auf der Werft Harland & Wolff in Belfast und stieg zum Geschäftsführer und Leiter der Konstruktionsabteilung auf — sein Team entwarf die Titanic. Er ging auf die Jungfernfahrt, um mit eigenen Augen zu sehen, wie sich sein Schiff auf See verhielt.',
      it: 'Nato nel 1873 a Comber, in Irlanda, in una famiglia di costruttori navali. Nel 1889 entrò come apprendista nel cantiere Harland & Wolff di Belfast e arrivò a diventare amministratore delegato e capo dell\'ufficio progettazione — il suo team progettò il Titanic. Salì a bordo per il viaggio inaugurale per vedere con i propri occhi come si comportava la sua nave in mare.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 2,
    title: {
      en: 'William Thomas Stead',
      ru: 'Уильям Томас Стед',
      fr: 'William Thomas Stead',
      es: 'William Thomas Stead',
      de: 'William Thomas Stead',
      it: 'William Thomas Stead',
    },
    role: {
      en: 'Journalist, first class',
      ru: 'Журналист, первый класс',
      fr: 'Journaliste, première classe',
      es: 'Periodista, primera clase',
      de: 'Journalist, Erste Klasse',
      it: 'Giornalista, prima classe',
    },
    description: {
      en: "Born in 1849 in England, one of the founders of British investigative journalism. His 1892 exposé of child prostitution in London made headlines — and briefly put him in jail. He edited the Pall Mall Gazette and the Review of Reviews. In 1912 he sailed to New York to speak at a peace congress; his first-class return ticket was booked on the Titanic.",
      ru: 'Родился в 1849 году в Англии, один из основателей британской журналистики расследований. В 1892 году прогремел разоблачением детской проституции в Лондоне — и ненадолго угодил за решётку за эту публикацию. Редактировал Pall Mall Gazette и Review of Reviews. В 1912 году отправился в Нью-Йорк выступить на конгрессе мира — обратный билет первым классом был на «Титаник».',
      fr: "Né en 1849 en Angleterre, l'un des fondateurs du journalisme d'investigation britannique. Son reportage de 1892 sur la prostitution enfantine à Londres a fait la une — et l'a brièvement envoyé en prison. Il a dirigé la Pall Mall Gazette et la Review of Reviews. En 1912, il se rend à New York pour prendre la parole à un congrès pour la paix ; son billet de retour en première classe était réservé sur le Titanic.",
      es: 'Nacido en 1849 en Inglaterra, uno de los fundadores del periodismo de investigación británico. Su reportaje de 1892 sobre la prostitución infantil en Londres fue noticia — y lo llevó brevemente a la cárcel. Dirigió la Pall Mall Gazette y la Review of Reviews. En 1912 viajó a Nueva York para hablar en un congreso por la paz; su billete de vuelta en primera clase estaba reservado en el Titanic.',
      de: 'Geboren 1849 in England, einer der Begründer des britischen investigativen Journalismus. Seine Enthüllung der Kinderprostitution in London im Jahr 1892 sorgte für Schlagzeilen — und brachte ihn kurzzeitig ins Gefängnis. Er war Redakteur der Pall Mall Gazette und der Review of Reviews. 1912 reiste er nach New York, um auf einem Friedenskongress zu sprechen; sein Rückfahrschein erster Klasse war für die Titanic gebucht.',
      it: "Nato nel 1849 in Inghilterra, uno dei fondatori del giornalismo investigativo britannico. La sua inchiesta del 1892 sulla prostituzione minorile a Londra fece scalpore — e lo portò brevemente in prigione. Diresse la Pall Mall Gazette e la Review of Reviews. Nel 1912 salpò per New York per parlare a un congresso per la pace; il suo biglietto di ritorno in prima classe era prenotato sul Titanic.",
    },
    vimeoId: '',
    posterUrl: 'posters/02-william-thomas-stead.jpg',
  },
  {
    number: 3,
    title: {
      en: 'Violet Constance Jessop',
      ru: 'Вайолетт Констанс Джессоп',
      fr: 'Violet Constance Jessop',
      es: 'Violet Constance Jessop',
      de: 'Violet Constance Jessop',
      it: 'Violet Constance Jessop',
    },
    role: {
      en: 'Stewardess',
      ru: 'Стюардесса',
      fr: 'Hôtesse de bord',
      es: 'Camarera de a bordo',
      de: 'Stewardess',
      it: 'Assistente di bordo',
    },
    description: {
      en: "Born in 1887 in Argentina to Irish immigrant parents, raised mostly in England. From 1908 she worked as a stewardess for the Royal Mail Line, serving aboard liners including the Olympic — the Titanic's sister ship. In 1912 she was recruited for the Titanic's maiden voyage.",
      ru: 'Родилась в 1887 году в Аргентине в семье ирландских эмигрантов, выросла в Англии. С 1908 года работала стюардессой на лайнерах Royal Mail Line, включая «Олимпик» — систершип «Титаника». В 1912 году её пригласили в команду первого рейса «Титаника».',
      fr: "Née en 1887 en Argentine de parents immigrés irlandais, elle grandit surtout en Angleterre. Dès 1908, elle travaille comme hôtesse de bord pour la Royal Mail Line, servant notamment sur l'Olympic — le navire jumeau du Titanic. En 1912, elle est recrutée pour le voyage inaugural du Titanic.",
      es: 'Nacida en 1887 en Argentina, hija de inmigrantes irlandeses, se crió principalmente en Inglaterra. Desde 1908 trabajó como camarera de a bordo para la Royal Mail Line, sirviendo en transatlánticos como el Olympic — el barco gemelo del Titanic. En 1912 fue reclutada para el viaje inaugural del Titanic.',
      de: 'Geboren 1887 in Argentinien als Tochter irischer Einwanderer, aufgewachsen größtenteils in England. Ab 1908 arbeitete sie als Stewardess für die Royal Mail Line und diente unter anderem auf der Olympic — dem Schwesterschiff der Titanic. 1912 wurde sie für die Jungfernfahrt der Titanic angeworben.',
      it: "Nata nel 1887 in Argentina da genitori immigrati irlandesi, crebbe principalmente in Inghilterra. Dal 1908 lavorò come assistente di bordo per la Royal Mail Line, prestando servizio su transatlantici tra cui l'Olympic — la nave gemella del Titanic. Nel 1912 fu reclutata per il viaggio inaugurale del Titanic.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 4,
    title: {
      en: 'John Jacob Astor',
      ru: 'Джон Джейкоб Астор',
      fr: 'John Jacob Astor',
      es: 'John Jacob Astor',
      de: 'John Jacob Astor',
      it: 'John Jacob Astor',
    },
    role: {
      en: 'First class',
      ru: 'Первый класс',
      fr: 'Première classe',
      es: 'Primera clase',
      de: 'Erste Klasse',
      it: 'Prima classe',
    },
    description: {
      en: 'Born in 1864 into the Astor family fortune, built on fur trading and real estate; he added to it himself, developing the Astor Hotel and stretches of Broadway. He was sailing home to New York with his young second wife, Madeleine, after a marriage society had gossiped about — their honeymoon through Europe and Egypt was ending.',
      ru: 'Родился в 1864 году в семье Асторов, разбогатевшей на пушной торговле и недвижимости; сам построил отель Astor и участвовал в застройке Бродвея. Возвращался в Нью-Йорк с молодой второй женой Мэдлин после скандального для общества брака — их медовый месяц по Европе и Египту подходил к концу.',
      fr: "Né en 1864 dans la fortune familiale des Astor, bâtie sur le commerce des fourrures et l'immobilier ; il l'a lui-même accrue, développant l'hôtel Astor et des portions de Broadway. Il rentrait à New York avec sa jeune seconde épouse, Madeleine, après un mariage dont la haute société avait fait des gorges chaudes — leur lune de miel à travers l'Europe et l'Égypte touchait à sa fin.",
      es: 'Nacido en 1864 en el seno de la fortuna familiar Astor, construida sobre el comercio de pieles y bienes raíces; él mismo la amplió, desarrollando el Hotel Astor y tramos de Broadway. Regresaba a Nueva York con su joven segunda esposa, Madeleine, tras un matrimonio del que la alta sociedad había murmurado — su luna de miel por Europa y Egipto llegaba a su fin.',
      de: 'Geboren 1864 in die Vermögensdynastie der Astors, die auf Pelzhandel und Immobilien gegründet war; er selbst baute sie weiter aus und entwickelte das Astor Hotel sowie Abschnitte des Broadway. Er war auf dem Heimweg nach New York mit seiner jungen zweiten Frau Madeleine, nach einer Ehe, über die die Gesellschaft getratscht hatte — ihre Flitterwochen durch Europa und Ägypten neigten sich dem Ende zu.',
      it: "Nato nel 1864 nella fortuna di famiglia degli Astor, costruita sul commercio di pellicce e sul settore immobiliare; la ampliò lui stesso, sviluppando l'Astor Hotel e tratti di Broadway. Stava tornando a New York con la sua giovane seconda moglie, Madeleine, dopo un matrimonio di cui l'alta società aveva chiacchierato — la loro luna di miele attraverso Europa ed Egitto stava per finire.",
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 5,
    title: {
      en: 'Neshan Krekorian',
      ru: 'Нешан Крекорян',
      fr: 'Neshan Krekorian',
      es: 'Neshan Krekorian',
      de: 'Neshan Krekorian',
      it: 'Neshan Krekorian',
    },
    role: {
      en: 'Third class',
      ru: 'Третий класс',
      fr: 'Troisième classe',
      es: 'Tercera clase',
      de: 'Dritte Klasse',
      it: 'Terza classe',
    },
    description: {
      en: 'Born in 1887 in Talas, in the Ottoman Empire, an Armenian farmer. In 1912 he boarded the Titanic at Cherbourg as a third-class passenger, sailing to America for a fresh start.',
      ru: 'Родился в 1887 году в Таласе (Османская империя), армянин, фермер. В 1912 году поднялся на «Титаник» в Шербуре пассажиром третьего класса — плыл в Америку, чтобы начать новую жизнь.',
      fr: "Né en 1887 à Talas, dans l'Empire ottoman, fermier arménien. En 1912, il embarque sur le Titanic à Cherbourg en tant que passager de troisième classe, en route vers l'Amérique pour prendre un nouveau départ.",
      es: 'Nacido en 1887 en Talas, en el Imperio otomano, agricultor armenio. En 1912 embarcó en el Titanic en Cherburgo como pasajero de tercera clase, rumbo a América en busca de un nuevo comienzo.',
      de: 'Geboren 1887 in Talas, im Osmanischen Reich, armenischer Bauer. 1912 ging er in Cherbourg als Passagier der dritten Klasse an Bord der Titanic, auf dem Weg nach Amerika für einen Neuanfang.',
      it: 'Nato nel 1887 a Talas, nell\'Impero ottomano, contadino armeno. Nel 1912 salì a bordo del Titanic a Cherbourg come passeggero di terza classe, diretto in America per iniziare una nuova vita.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 6,
    title: {
      en: 'Margaret Brown',
      ru: 'Маргарет Браун',
      fr: 'Margaret Brown',
      es: 'Margaret Brown',
      de: 'Margaret Brown',
      it: 'Margaret Brown',
    },
    role: {
      en: 'First class',
      ru: 'Первый класс',
      fr: 'Première classe',
      es: 'Primera clase',
      de: 'Erste Klasse',
      it: 'Prima classe',
    },
    description: {
      en: '"Molly" Brown was born in 1867 in Missouri to Irish immigrant parents, she worked a string of jobs before marrying J.J. Brown, who struck it rich in mining. In 1912 she was sailing home to America in first class with her daughter, after touring Egypt and Europe.',
      ru: 'Родилась в 1867 году в Миссури в семье ирландских эмигрантов, перепробовала множество профессий, пока не вышла замуж за Джей Джея Брауна, разбогатевшего на добыче серебра. В 1912 году «Молли» Браун возвращалась в Америку первым классом вместе с дочерью после путешествия по Египту и Европе.',
      fr: "Née en 1867 dans le Missouri de parents immigrés irlandais, elle enchaîne les petits boulots avant d'épouser J.J. Brown, qui fait fortune dans les mines. En 1912, « Molly » Brown rentre en Amérique en première classe avec sa fille, après un voyage en Égypte et en Europe.",
      es: 'Nacida en 1867 en Misuri, hija de inmigrantes irlandeses, tuvo una sucesión de empleos antes de casarse con J.J. Brown, quien hizo fortuna en la minería. En 1912, «Molly» Brown regresaba a Estados Unidos en primera clase con su hija, tras recorrer Egipto y Europa.',
      de: 'Geboren 1867 in Missouri als Tochter irischer Einwanderer, arbeitete sie in verschiedenen Jobs, bevor sie J.J. Brown heiratete, der im Bergbau zu Reichtum kam. 1912 kehrte „Molly" Brown nach einer Reise durch Ägypten und Europa in der ersten Klasse mit ihrer Tochter nach Amerika zurück.',
      it: 'Nata nel 1867 nel Missouri da genitori immigrati irlandesi, svolse diversi lavori prima di sposare J.J. Brown, arricchitosi con l\'attività mineraria. Nel 1912 "Molly" Brown stava tornando in America in prima classe con la figlia, dopo un viaggio in Egitto e in Europa.',
    },
    vimeoId: '',
    posterUrl: 'posters/06-margaret-brown.jpg',
    posterFocusY: 50,
  },
  {
    number: 7,
    title: {
      en: 'Benjamin Guggenheim',
      ru: 'Бенджамин Гуггенхайм',
      fr: 'Benjamin Guggenheim',
      es: 'Benjamin Guggenheim',
      de: 'Benjamin Guggenheim',
      it: 'Benjamin Guggenheim',
    },
    role: {
      en: 'First class',
      ru: 'Первый класс',
      fr: 'Première classe',
      es: 'Primera clase',
      de: 'Erste Klasse',
      it: 'Prima classe',
    },
    description: {
      en: 'Born in 1865 into a wealthy mining family, he built on it himself in mining and smelting, and expanded into railroads and steamship lines. In 1912 he boarded the Titanic at Cherbourg with his valet, traveling first class.',
      ru: 'Родился в 1865 году в состоятельной семье, сам расширил дело в горнодобыче и металлургии, вложился в железные дороги и судоходные линии. В 1912 году поднялся на «Титаник» в Шербуре с личным камердинером, путешествуя первым классом.',
      fr: "Né en 1865 dans une riche famille de l'industrie minière, il développe lui-même ses affaires dans les mines et la fonderie, puis s'étend aux chemins de fer et aux lignes de paquebots. En 1912, il embarque sur le Titanic à Cherbourg avec son valet, voyageant en première classe.",
      es: 'Nacido en 1865 en una acaudalada familia minera, él mismo amplió el negocio en minería y fundición, y se expandió hacia los ferrocarriles y las líneas de vapores. En 1912 embarcó en el Titanic en Cherburgo con su ayuda de cámara, viajando en primera clase.',
      de: 'Geboren 1865 in eine wohlhabende Bergbaufamilie, baute er das Geschäft selbst in Bergbau und Hüttenwesen aus und expandierte in Eisenbahnen und Dampfschifflinien. 1912 ging er in Cherbourg mit seinem Kammerdiener an Bord der Titanic und reiste erster Klasse.',
      it: 'Nato nel 1865 in una ricca famiglia di industriali minerari, ampliò lui stesso l\'attività nel settore minerario e della fusione, espandendosi poi nelle ferrovie e nelle linee di piroscafi. Nel 1912 salì a bordo del Titanic a Cherbourg con il suo valletto, viaggiando in prima classe.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 8,
    title: {
      en: 'Eva Hart',
      ru: 'Ева Харт',
      fr: 'Eva Hart',
      es: 'Eva Hart',
      de: 'Eva Hart',
      it: 'Eva Hart',
    },
    role: {
      en: 'Second class, age 7',
      ru: 'Второй класс, 7 лет',
      fr: 'Deuxième classe, 7 ans',
      es: 'Segunda clase, 7 años',
      de: 'Zweite Klasse, 7 Jahre',
      it: 'Seconda classe, 7 anni',
    },
    description: {
      en: 'Born on 31 January 1905 in Ilford, England. Not yet seven, she was sailing second class with her parents, Esther and Benjamin Hart — the family was emigrating to Canada for a better life.',
      ru: 'Родилась 31 января 1905 года в Илфорде (Англия). В свои неполные семь лет плыла вторым классом с родителями, Эстер и Бенджамином Харт, — семья эмигрировала в Канаду в поисках лучшей жизни.',
      fr: "Née le 31 janvier 1905 à Ilford, en Angleterre. Âgée de moins de sept ans, elle voyage en deuxième classe avec ses parents, Esther et Benjamin Hart — la famille émigre au Canada pour une vie meilleure.",
      es: 'Nacida el 31 de enero de 1905 en Ilford, Inglaterra. Con menos de siete años, viajaba en segunda clase con sus padres, Esther y Benjamin Hart — la familia emigraba a Canadá en busca de una vida mejor.',
      de: 'Geboren am 31. Januar 1905 in Ilford, England. Noch nicht sieben Jahre alt, reiste sie in der zweiten Klasse mit ihren Eltern Esther und Benjamin Hart — die Familie wanderte für ein besseres Leben nach Kanada aus.',
      it: 'Nata il 31 gennaio 1905 a Ilford, in Inghilterra. Non ancora settenne, viaggiava in seconda classe con i genitori, Esther e Benjamin Hart — la famiglia stava emigrando in Canada in cerca di una vita migliore.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 9,
    title: {
      en: 'Archibald Butt',
      ru: 'Арчибальд Батт',
      fr: 'Archibald Butt',
      es: 'Archibald Butt',
      de: 'Archibald Butt',
      it: 'Archibald Butt',
    },
    role: {
      en: 'Military aide to the U.S. President',
      ru: 'Военный советник президента США',
      fr: 'Aide militaire du président des États-Unis',
      es: 'Ayudante militar del presidente de EE. UU.',
      de: 'Militärischer Berater des US-Präsidenten',
      it: 'Aiutante militare del presidente degli Stati Uniti',
    },
    description: {
      en: 'Born in 1865 in Augusta, Georgia. He served in the Spanish-American War, worked as a journalist, then became an aide to Presidents Theodore Roosevelt and William Howard Taft. In 1912 he was returning to America after a six-week vacation in Europe — his first-class ticket was on the Titanic.',
      ru: 'Родился в 1865 году в Огасте (Джорджия). Служил в испано-американской войне, работал журналистом, затем стал адъютантом президентов Теодора Рузвельта и Уильяма Тафта. В 1912 году возвращался в Америку после шестинедельного отпуска в Европе — билет первого класса был на «Титаник».',
      fr: "Né en 1865 à Augusta, en Géorgie. Il sert pendant la guerre hispano-américaine, travaille comme journaliste, puis devient aide de camp des présidents Theodore Roosevelt et William Howard Taft. En 1912, il rentre en Amérique après six semaines de vacances en Europe — son billet de première classe était sur le Titanic.",
      es: 'Nacido en 1865 en Augusta, Georgia. Sirvió en la guerra hispano-estadounidense, trabajó como periodista y luego se convirtió en ayudante de los presidentes Theodore Roosevelt y William Howard Taft. En 1912 regresaba a Estados Unidos tras seis semanas de vacaciones en Europa — su billete de primera clase era en el Titanic.',
      de: 'Geboren 1865 in Augusta, Georgia. Er diente im Spanisch-Amerikanischen Krieg, arbeitete als Journalist und wurde dann Adjutant der Präsidenten Theodore Roosevelt und William Howard Taft. 1912 kehrte er nach einem sechswöchigen Urlaub in Europa nach Amerika zurück — sein Ticket erster Klasse war für die Titanic.',
      it: 'Nato nel 1865 ad Augusta, in Georgia. Prestò servizio nella guerra ispano-americana, lavorò come giornalista e in seguito divenne aiutante dei presidenti Theodore Roosevelt e William Howard Taft. Nel 1912 stava tornando in America dopo sei settimane di vacanza in Europa — il suo biglietto di prima classe era sul Titanic.',
    },
    vimeoId: '',
    posterUrl: '',
  },
  {
    number: 10,
    title: {
      en: 'Isidor and Ida Straus',
      ru: 'Изидор и Ида Штраус',
      fr: 'Isidor et Ida Straus',
      es: 'Isidor e Ida Straus',
      de: 'Isidor und Ida Straus',
      it: 'Isidor e Ida Straus',
    },
    role: {
      en: 'First class',
      ru: 'Первый класс',
      fr: 'Première classe',
      es: 'Primera clase',
      de: 'Erste Klasse',
      it: 'Prima classe',
    },
    description: {
      en: "A German-American businessman, co-owner of Macy's department store, and his wife, co-founder of the Straus Foundation — married more than forty years. In 1912 they boarded the Titanic at Southampton in first class, on their way home to New York after a European holiday.",
      ru: 'Немецко-американский бизнесмен, совладелец универмага Macy’s, и его жена, соучредительница благотворительного фонда Straus Foundation, — вместе больше сорока лет. В 1912 году поднялись на «Титаник» в Саутгемптоне первым классом, возвращаясь домой в Нью-Йорк после отпуска в Европе.',
      fr: "Un homme d'affaires germano-américain, copropriétaire du grand magasin Macy's, et son épouse, cofondatrice de la Straus Foundation — mariés depuis plus de quarante ans. En 1912, ils embarquent sur le Titanic à Southampton en première classe, sur le chemin du retour vers New York après des vacances en Europe.",
      es: 'Un empresario germano-estadounidense, copropietario de los grandes almacenes Macy\'s, y su esposa, cofundadora de la Straus Foundation — casados desde hacía más de cuarenta años. En 1912 embarcaron en el Titanic en Southampton en primera clase, de regreso a Nueva York tras unas vacaciones en Europa.',
      de: 'Ein deutsch-amerikanischer Geschäftsmann, Miteigentümer des Kaufhauses Macy\'s, und seine Frau, Mitbegründerin der Straus Foundation — seit über vierzig Jahren verheiratet. 1912 gingen sie in Southampton erster Klasse an Bord der Titanic, auf dem Heimweg nach New York nach einem Europaurlaub.',
      it: 'Un uomo d\'affari tedesco-americano, comproprietario dei grandi magazzini Macy\'s, e sua moglie, cofondatrice della Straus Foundation — sposati da oltre quarant\'anni. Nel 1912 salirono a bordo del Titanic a Southampton in prima classe, di ritorno a New York dopo una vacanza in Europa.',
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

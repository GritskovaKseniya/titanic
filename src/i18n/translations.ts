export type Language = 'en' | 'ru' | 'fr' | 'es' | 'de' | 'it';

/** Language switcher options, in display order. */
export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
];

export interface TranslationsShape {
  meta: { eyebrowLeft: string; eyebrowRight: string; year: string; genre: string; runtime: string };
  nav: { episodes: string; details: string };
  hero: {
    title: string;
    pitch: string;
    cta: string;
    subline: string;
    share: string;
    shared: string;
    jumpLabel: string;
  };
  episodes: {
    label: string;
    heading: string;
    description: string;
    watch: string;
    comingSoon: string;
    season: string;
    readMore: string;
    readLess: string;
  };
  team: {
    roles: { producer: string; director: string; editor: string; aiFilmmaker: string };
  };
  about: { label: string; heading: string; paragraph1: string; paragraph2: string };
  details: { label: string; heading: string; description: string };
  footer: { tagline: string; rights: string; contact: string };
}

export const translations: Record<Language, TranslationsShape> = {
  en: {
    meta: {
      eyebrowLeft: 'Documentary TV series in the AI era',
      eyebrowRight: 'Season 1',
      year: '2026',
      genre: 'Documentary',
      runtime: '25–30 min',
    },
    nav: {
      episodes: 'Episodes',
      details: 'Details',
    },
    hero: {
      title: 'Titanic: Ship of Legends',
      pitch:
        "The real record of the Titanic's last voyage — and what the film never kept. Part of every episode is rebuilt by AI: faces, cabins, final minutes no archive footage survived to show.",
      cta: 'Watch the episodes',
      subline: 'archive · reconstruction · memory',
      share: 'Share',
      shared: 'Link copied',
      jumpLabel: 'Jump to',
    },
    episodes: {
      label: 'Episodes',
      heading: 'Ten passengers, one night',
      description:
        'Every episode follows one person aboard: who they were before the Titanic, how they came to be on her, how they acted that night — and whether they survived.',
      watch: 'Watch',
      comingSoon: 'Coming soon on Vimeo',
      season: 'Season 1',
      readMore: 'Read more',
      readLess: 'Show less',
    },
    team: {
      roles: {
        producer: 'Executive Producer',
        director: 'Director',
        editor: 'Editor',
        aiFilmmaker: 'Associate Producer & AI Filmmaker',
      },
    },
    about: {
      label: 'About',
      heading: 'One ship, ten lives',
      paragraph1:
        'On the night of 14–15 April 1912, ten very different lives converged aboard the same ship — a shipbuilder, a journalist, a stewardess, a child among them. Titanic: Ship of Legends follows each of them back to where their story really began, long before the iceberg.',
      paragraph2:
        "Archival research carries every episode as far as the record allows — and where it runs out, AI reconstruction picks up the thread, rebuilding the faces, the rooms, and the final hours no camera was there to capture.",
    },
    details: {
      label: 'Details',
      heading: 'The team',
      description: "The people rebuilding the Titanic's stories through archives and AI.",
    },
    footer: {
      tagline: 'A documentary series about the Titanic: archive and AI reconstruction.',
      rights: 'All rights reserved.',
      contact: 'Get in touch',
    },
  },
  ru: {
    meta: {
      eyebrowLeft: 'Документальный сериал в эпоху ИИ',
      eyebrowRight: '1 сезон',
      year: '2026',
      genre: 'Документальный',
      runtime: '25–30 мин',
    },
    nav: {
      episodes: 'Серии',
      details: 'Детали',
    },
    hero: {
      title: 'Титаник: Корабль легенд',
      pitch:
        'Реальная хроника гибели «Титаника» — и то, чего плёнка не сохранила. Часть каждой серии восстановлена нейросетями: лица, каюты, последние минуты, которых не осталось на архивных кадрах.',
      cta: 'Смотреть серии',
      subline: 'архив · реконструкция · память',
      share: 'Поделиться',
      shared: 'Ссылка скопирована',
      jumpLabel: 'Быстрый переход',
    },
    episodes: {
      label: 'Серии',
      heading: 'Десять пассажиров, одна ночь',
      description:
        'Каждая серия — это один человек на борту: кем он был до «Титаника», как оказался на корабле, как повёл себя в ту ночь — и выжил ли.',
      watch: 'Смотреть',
      comingSoon: 'Скоро на Vimeo',
      season: 'Сезон 1',
      readMore: 'Читать дальше',
      readLess: 'Свернуть',
    },
    team: {
      roles: {
        producer: 'Исполнительный продюсер',
        director: 'Режиссёр',
        editor: 'Монтажёр',
        aiFilmmaker: 'Ассоциированный продюсер и ИИ-режиссёр',
      },
    },
    about: {
      label: 'О проекте',
      heading: 'Один корабль, десять судеб',
      paragraph1:
        'В ночь на 15 апреля 1912 года на борту одного корабля сошлись десять совсем разных судеб — кораблестроитель, журналист, стюардесса, ребёнок. «Титаник: Корабль легенд» возвращается к каждому из них туда, где их история началась по-настоящему, — задолго до айсберга.',
      paragraph2:
        'Архивные свидетельства ведут каждую серию до тех пор, пока хватает записей, — а там, где они обрываются, в дело вступает ИИ-реконструкция, восстанавливая лица, каюты и последние часы, которых не сохранила ни одна камера.',
    },
    details: {
      label: 'Детали',
      heading: 'Команда проекта',
      description: 'Люди, которые восстанавливают истории «Титаника» с помощью архивов и ИИ.',
    },
    footer: {
      tagline: 'Документальный сериал о «Титанике»: архив и ИИ-реконструкция.',
      rights: 'Все права защищены.',
      contact: 'Написать нам',
    },
  },
  fr: {
    meta: {
      eyebrowLeft: "Série documentaire à l'ère de l'IA",
      eyebrowRight: 'Saison 1',
      year: '2026',
      genre: 'Documentaire',
      runtime: '25 à 30 min',
    },
    nav: {
      episodes: 'Épisodes',
      details: 'Détails',
    },
    hero: {
      title: 'Titanic : Le Navire des légendes',
      pitch:
        "La véritable histoire du dernier voyage du Titanic — et ce que la pellicule n'a jamais gardé. Une partie de chaque épisode est reconstituée par l'IA : visages, cabines, derniers instants qu'aucune archive n'a pu montrer.",
      cta: 'Voir les épisodes',
      subline: 'archives · reconstitution · mémoire',
      share: 'Partager',
      shared: 'Lien copié',
      jumpLabel: 'Aller à',
    },
    episodes: {
      label: 'Épisodes',
      heading: 'Dix passagers, une seule nuit',
      description:
        "Chaque épisode suit une personne à bord : qui elle était avant le Titanic, comment elle s'est retrouvée à bord, comment elle a agi cette nuit-là — et si elle a survécu.",
      watch: 'Regarder',
      comingSoon: 'Bientôt sur Vimeo',
      season: 'Saison 1',
      readMore: 'Lire la suite',
      readLess: 'Réduire',
    },
    team: {
      roles: {
        producer: 'Producteur exécutif',
        director: 'Réalisateur',
        editor: 'Monteur',
        aiFilmmaker: 'Producteur associé et réalisateur IA',
      },
    },
    about: {
      label: 'À propos',
      heading: 'Un navire, dix destins',
      paragraph1:
        "Dans la nuit du 14 au 15 avril 1912, dix destins bien différents se sont croisés à bord du même navire — un architecte naval, un journaliste, une hôtesse de bord, une enfant parmi eux. « Titanic : Le Navire des légendes » remonte le fil de chacune de ces vies, bien avant l'iceberg.",
      paragraph2:
        "La recherche d'archives porte chaque épisode aussi loin que les documents le permettent — et là où ils s'arrêtent, la reconstitution par IA prend le relais, recréant les visages, les cabines et les dernières heures qu'aucune caméra n'a pu saisir.",
    },
    details: {
      label: 'Détails',
      heading: "L'équipe",
      description: "Les personnes qui reconstituent les histoires du Titanic à travers les archives et l'IA.",
    },
    footer: {
      tagline: 'Une série documentaire sur le Titanic : archives et reconstitution par IA.',
      rights: 'Tous droits réservés.',
      contact: 'Nous contacter',
    },
  },
  es: {
    meta: {
      eyebrowLeft: 'Serie documental en la era de la IA',
      eyebrowRight: 'Temporada 1',
      year: '2026',
      genre: 'Documental',
      runtime: '25–30 min',
    },
    nav: {
      episodes: 'Episodios',
      details: 'Detalles',
    },
    hero: {
      title: 'Titanic: El barco de las leyendas',
      pitch:
        'La crónica real del último viaje del Titanic — y lo que la película nunca conservó. Parte de cada episodio está reconstruida por IA: rostros, camarotes, los últimos minutos que ningún archivo logró mostrar.',
      cta: 'Ver los episodios',
      subline: 'archivo · reconstrucción · memoria',
      share: 'Compartir',
      shared: 'Enlace copiado',
      jumpLabel: 'Ir a',
    },
    episodes: {
      label: 'Episodios',
      heading: 'Diez pasajeros, una noche',
      description:
        'Cada episodio sigue a una persona a bordo: quién era antes del Titanic, cómo llegó a embarcar, cómo actuó esa noche — y si sobrevivió.',
      watch: 'Ver',
      comingSoon: 'Próximamente en Vimeo',
      season: 'Temporada 1',
      readMore: 'Leer más',
      readLess: 'Mostrar menos',
    },
    team: {
      roles: {
        producer: 'Productor ejecutivo',
        director: 'Director',
        editor: 'Editor',
        aiFilmmaker: 'Productor asociado y cineasta de IA',
      },
    },
    about: {
      label: 'Acerca de',
      heading: 'Un barco, diez destinos',
      paragraph1:
        'En la noche del 14 al 15 de abril de 1912, diez vidas muy distintas confluyeron a bordo del mismo barco — un arquitecto naval, un periodista, una camarera, una niña entre ellos. Titanic: El barco de las leyendas vuelve a cada una de esas historias mucho antes del iceberg.',
      paragraph2:
        'La investigación de archivo sostiene cada episodio hasta donde alcanzan los documentos — y donde se agotan, la reconstrucción con IA toma el relevo, recreando los rostros, los camarotes y las últimas horas que ninguna cámara pudo captar.',
    },
    details: {
      label: 'Detalles',
      heading: 'El equipo',
      description: 'Las personas que reconstruyen las historias del Titanic a través de archivos e IA.',
    },
    footer: {
      tagline: 'Una serie documental sobre el Titanic: archivo y reconstrucción con IA.',
      rights: 'Todos los derechos reservados.',
      contact: 'Contáctanos',
    },
  },
  de: {
    meta: {
      eyebrowLeft: 'Dokuserie im Zeitalter der KI',
      eyebrowRight: 'Staffel 1',
      year: '2026',
      genre: 'Dokumentation',
      runtime: '25–30 Min.',
    },
    nav: {
      episodes: 'Folgen',
      details: 'Details',
    },
    hero: {
      title: 'Titanic: Schiff der Legenden',
      pitch:
        'Die wahre Geschichte der letzten Fahrt der Titanic — und das, was der Film nie festgehalten hat. Ein Teil jeder Folge wird von KI rekonstruiert: Gesichter, Kabinen, letzte Minuten, die kein Archivmaterial zeigen konnte.',
      cta: 'Folgen ansehen',
      subline: 'Archiv · Rekonstruktion · Erinnerung',
      share: 'Teilen',
      shared: 'Link kopiert',
      jumpLabel: 'Springe zu',
    },
    episodes: {
      label: 'Folgen',
      heading: 'Zehn Passagiere, eine Nacht',
      description:
        'Jede Folge begleitet eine Person an Bord: wer sie vor der Titanic war, wie sie an Bord kam, wie sie sich in jener Nacht verhielt — und ob sie überlebte.',
      watch: 'Ansehen',
      comingSoon: 'Demnächst auf Vimeo',
      season: 'Staffel 1',
      readMore: 'Weiterlesen',
      readLess: 'Weniger anzeigen',
    },
    team: {
      roles: {
        producer: 'Ausführender Produzent',
        director: 'Regisseur',
        editor: 'Cutter',
        aiFilmmaker: 'Assoziierter Produzent und KI-Regisseur',
      },
    },
    about: {
      label: 'Über das Projekt',
      heading: 'Ein Schiff, zehn Schicksale',
      paragraph1:
        'In der Nacht vom 14. auf den 15. April 1912 trafen an Bord desselben Schiffs zehn ganz unterschiedliche Leben aufeinander — ein Schiffsarchitekt, ein Journalist, eine Stewardess, ein Kind unter ihnen. Titanic: Schiff der Legenden erzählt jede dieser Geschichten von Anfang an, lange vor dem Eisberg.',
      paragraph2:
        'Archivrecherche trägt jede Folge so weit, wie die Aufzeichnungen reichen — und wo sie enden, übernimmt die KI-Rekonstruktion: Sie erschafft die Gesichter, Kabinen und letzten Stunden neu, die keine Kamera festhalten konnte.',
    },
    details: {
      label: 'Details',
      heading: 'Das Team',
      description: 'Die Menschen, die die Geschichten der Titanic mithilfe von Archiven und KI rekonstruieren.',
    },
    footer: {
      tagline: 'Eine Dokumentarserie über die Titanic: Archiv und KI-Rekonstruktion.',
      rights: 'Alle Rechte vorbehalten.',
      contact: 'Kontakt aufnehmen',
    },
  },
  it: {
    meta: {
      eyebrowLeft: "Serie documentaria nell'era dell'IA",
      eyebrowRight: 'Stagione 1',
      year: '2026',
      genre: 'Documentario',
      runtime: '25–30 min',
    },
    nav: {
      episodes: 'Episodi',
      details: 'Dettagli',
    },
    hero: {
      title: 'Titanic: La nave delle leggende',
      pitch:
        "La cronaca reale dell'ultimo viaggio del Titanic — e ciò che la pellicola non ha mai conservato. Parte di ogni episodio è ricostruita dall'IA: volti, cabine, gli ultimi minuti che nessun archivio è riuscito a mostrare.",
      cta: 'Guarda gli episodi',
      subline: 'archivio · ricostruzione · memoria',
      share: 'Condividi',
      shared: 'Link copiato',
      jumpLabel: 'Vai a',
    },
    episodes: {
      label: 'Episodi',
      heading: 'Dieci passeggeri, una notte',
      description:
        'Ogni episodio segue una persona a bordo: chi era prima del Titanic, come è arrivata a imbarcarsi, come si è comportata quella notte — e se è sopravvissuta.',
      watch: 'Guarda',
      comingSoon: 'Presto su Vimeo',
      season: 'Stagione 1',
      readMore: 'Continua a leggere',
      readLess: 'Mostra meno',
    },
    team: {
      roles: {
        producer: 'Produttore esecutivo',
        director: 'Regista',
        editor: 'Montatore',
        aiFilmmaker: 'Produttore associato e regista IA',
      },
    },
    about: {
      label: 'Chi siamo',
      heading: 'Una nave, dieci destini',
      paragraph1:
        'Nella notte tra il 14 e il 15 aprile 1912, dieci vite molto diverse si incrociarono a bordo della stessa nave — un architetto navale, un giornalista, una assistente di bordo, una bambina tra loro. Titanic: La nave delle leggende ripercorre ciascuna di queste storie da molto prima dell\'iceberg.',
      paragraph2:
        "La ricerca d'archivio accompagna ogni episodio fin dove arrivano i documenti — e dove si fermano, subentra la ricostruzione con l'IA, che ricrea i volti, le cabine e le ultime ore che nessuna cinepresa ha potuto catturare.",
    },
    details: {
      label: 'Dettagli',
      heading: 'La squadra',
      description: 'Le persone che ricostruiscono le storie del Titanic attraverso archivi e IA.',
    },
    footer: {
      tagline: 'Una serie documentaria sul Titanic: archivio e ricostruzione IA.',
      rights: 'Tutti i diritti riservati.',
      contact: 'Contattaci',
    },
  },
};

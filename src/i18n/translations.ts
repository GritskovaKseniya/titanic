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
  nav: { episodes: string; gallery: string; details: string };
  hero: {
    title: string;
    pitch: string;
    cta: string;
    subline: string;
    share: string;
    shared: string;
    jumpLabel: string;
    tabs: { overview: string; episodes: string; gallery: string; details: string };
  };
  badges: { archival: string; synth: string };
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
  gallery: { label: string; heading: string; description: string };
  team: {
    roles: { producer: string; director: string; editor: string; aiFilmmaker: string };
  };
  details: { label: string; heading: string; description: string };
  footer: { tagline: string; rights: string; contact: string };
}

export const translations: Record<Language, TranslationsShape> = {
  en: {
    meta: {
      eyebrowLeft: 'A documentary series',
      eyebrowRight: 'Season 1',
      year: '2026',
      genre: 'Documentary',
      runtime: '25–30 min',
    },
    nav: {
      episodes: 'Episodes',
      gallery: 'Gallery',
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
      tabs: { overview: 'Overview', episodes: 'Episodes', gallery: 'Gallery', details: 'Details' },
    },
    badges: {
      archival: 'Archive',
      synth: 'AI reconstruction',
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
    gallery: {
      label: 'Gallery',
      heading: 'Frames that never existed',
      description:
        'AI rebuilds what time erased: interiors, faces, wreckage on the seabed. Every still is captioned with the episode it belongs to and what it shows.',
    },
    team: {
      roles: {
        producer: 'Executive Producer',
        director: 'Director',
        editor: 'Editor',
        aiFilmmaker: 'AI Filmmaker',
      },
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
      eyebrowLeft: 'Документальный сериал',
      eyebrowRight: '1 сезон',
      year: '2026',
      genre: 'Документальный',
      runtime: '25–30 мин',
    },
    nav: {
      episodes: 'Серии',
      gallery: 'Галерея',
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
      tabs: { overview: 'Обзор', episodes: 'Серии', gallery: 'Галерея', details: 'Детали' },
    },
    badges: {
      archival: 'Архив',
      synth: 'ИИ-реконструкция',
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
    gallery: {
      label: 'Галерея',
      heading: 'Кадры, которых не было',
      description:
        'Нейросеть достраивает то, что время стёрло: интерьеры, лица, обломки на дне. Каждый кадр подписан — какой серии он принадлежит и что на нём изображено.',
    },
    team: {
      roles: {
        producer: 'Исполнительный продюсер',
        director: 'Режиссёр',
        editor: 'Монтажёр',
        aiFilmmaker: 'ИИ-режиссёр',
      },
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
      eyebrowLeft: 'Une série documentaire',
      eyebrowRight: 'Saison 1',
      year: '2026',
      genre: 'Documentaire',
      runtime: '25 à 30 min',
    },
    nav: {
      episodes: 'Épisodes',
      gallery: 'Galerie',
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
      tabs: { overview: 'Aperçu', episodes: 'Épisodes', gallery: 'Galerie', details: 'Détails' },
    },
    badges: {
      archival: 'Archives',
      synth: 'Reconstitution IA',
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
    gallery: {
      label: 'Galerie',
      heading: "Des images qui n'ont jamais existé",
      description:
        "L'IA reconstitue ce que le temps a effacé : intérieurs, visages, épave au fond de l'océan. Chaque image est légendée avec l'épisode auquel elle appartient et ce qu'elle montre.",
    },
    team: {
      roles: {
        producer: 'Producteur exécutif',
        director: 'Réalisateur',
        editor: 'Monteur',
        aiFilmmaker: 'Réalisateur IA',
      },
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
      eyebrowLeft: 'Una serie documental',
      eyebrowRight: 'Temporada 1',
      year: '2026',
      genre: 'Documental',
      runtime: '25–30 min',
    },
    nav: {
      episodes: 'Episodios',
      gallery: 'Galería',
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
      tabs: { overview: 'Resumen', episodes: 'Episodios', gallery: 'Galería', details: 'Detalles' },
    },
    badges: {
      archival: 'Archivo',
      synth: 'Reconstrucción con IA',
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
    gallery: {
      label: 'Galería',
      heading: 'Imágenes que nunca existieron',
      description:
        'La IA reconstruye lo que el tiempo borró: interiores, rostros, restos en el fondo del mar. Cada imagen indica el episodio al que pertenece y lo que muestra.',
    },
    team: {
      roles: {
        producer: 'Productor ejecutivo',
        director: 'Director',
        editor: 'Editor',
        aiFilmmaker: 'Cineasta de IA',
      },
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
      eyebrowLeft: 'Eine Dokumentarserie',
      eyebrowRight: 'Staffel 1',
      year: '2026',
      genre: 'Dokumentation',
      runtime: '25–30 Min.',
    },
    nav: {
      episodes: 'Folgen',
      gallery: 'Galerie',
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
      tabs: { overview: 'Überblick', episodes: 'Folgen', gallery: 'Galerie', details: 'Details' },
    },
    badges: {
      archival: 'Archiv',
      synth: 'KI-Rekonstruktion',
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
    gallery: {
      label: 'Galerie',
      heading: 'Bilder, die es nie gab',
      description:
        'KI rekonstruiert, was die Zeit ausgelöscht hat: Innenräume, Gesichter, Wrackteile auf dem Meeresgrund. Jedes Bild ist mit der zugehörigen Folge und seinem Motiv beschriftet.',
    },
    team: {
      roles: {
        producer: 'Ausführender Produzent',
        director: 'Regisseur',
        editor: 'Cutter',
        aiFilmmaker: 'KI-Regisseur',
      },
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
      eyebrowLeft: 'Una serie documentaria',
      eyebrowRight: 'Stagione 1',
      year: '2026',
      genre: 'Documentario',
      runtime: '25–30 min',
    },
    nav: {
      episodes: 'Episodi',
      gallery: 'Galleria',
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
      tabs: { overview: 'Panoramica', episodes: 'Episodi', gallery: 'Galleria', details: 'Dettagli' },
    },
    badges: {
      archival: 'Archivio',
      synth: 'Ricostruzione IA',
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
    gallery: {
      label: 'Galleria',
      heading: 'Immagini che non sono mai esistite',
      description:
        "L'IA ricostruisce ciò che il tempo ha cancellato: interni, volti, relitti sul fondale marino. Ogni immagine è didascalizzata con l'episodio a cui appartiene e ciò che mostra.",
    },
    team: {
      roles: {
        producer: 'Produttore esecutivo',
        director: 'Regista',
        editor: 'Montatore',
        aiFilmmaker: 'Regista IA',
      },
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

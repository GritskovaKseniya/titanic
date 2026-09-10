export type Language = 'ru' | 'en';

export interface TranslationsShape {
  meta: { eyebrowLeft: string; eyebrowRight: string };
  nav: { episodes: string; gallery: string; team: string };
  hero: { title: string; pitch: string; cta: string; subline: string };
  badges: { archival: string; synth: string };
  episodes: { label: string; heading: string; description: string; watch: string; comingSoon: string; season: string };
  gallery: { label: string; heading: string; description: string };
  team: {
    label: string;
    heading: string;
    description: string;
    roles: { host: string; editor: string; aiCreator: string };
  };
  footer: { tagline: string; rights: string; contact: string };
}

export const translations: Record<Language, TranslationsShape> = {
  ru: {
    meta: {
      eyebrowLeft: 'Документальный сериал',
      eyebrowRight: 'RU/EN · 1 сезон',
    },
    nav: {
      episodes: 'Серии',
      gallery: 'Галерея',
      team: 'Команда',
    },
    hero: {
      title: 'Титаник: Корабль легенд',
      pitch:
        'Реальная хроника гибели «Титаника» — и то, чего плёнка не сохранила. Часть каждой серии восстановлена нейросетями: лица, каюты, последние минуты, которых не осталось на архивных кадрах.',
      cta: 'Смотреть серии',
      subline: 'архив · реконструкция · память',
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
    },
    gallery: {
      label: 'Галерея',
      heading: 'Кадры, которых не было',
      description:
        'Нейросеть достраивает то, что время стёрло: интерьеры, лица, обломки на дне. Каждый кадр подписан — какой серии он принадлежит и что на нём изображено.',
    },
    team: {
      label: 'Команда',
      heading: 'Кто это делает',
      description: 'Три человека и нейросети между ними.',
      roles: {
        host: 'Ведущая',
        editor: 'Монтажёр',
        aiCreator: 'ИИ-креатор',
      },
    },
    footer: {
      tagline: 'Документальный сериал о «Титанике»: архив и ИИ-реконструкция.',
      rights: 'Все права защищены.',
      contact: 'Написать нам',
    },
  },
  en: {
    meta: {
      eyebrowLeft: 'A documentary series',
      eyebrowRight: 'RU/EN · Season 1',
    },
    nav: {
      episodes: 'Episodes',
      gallery: 'Gallery',
      team: 'Team',
    },
    hero: {
      title: 'Titanic: Ship of Legends',
      pitch:
        "The real record of the Titanic's last voyage — and what the film never kept. Part of every episode is rebuilt by AI: faces, cabins, final minutes no archive footage survived to show.",
      cta: 'Watch the episodes',
      subline: 'archive · reconstruction · memory',
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
    },
    gallery: {
      label: 'Gallery',
      heading: 'Frames that never existed',
      description:
        'AI rebuilds what time erased: interiors, faces, wreckage on the seabed. Every still is captioned with the episode it belongs to and what it shows.',
    },
    team: {
      label: 'Team',
      heading: 'Who makes this',
      description: 'Three people, and the models between them.',
      roles: {
        host: 'Host',
        editor: 'Editor',
        aiCreator: 'AI creator',
      },
    },
    footer: {
      tagline: 'A documentary series about the Titanic: archive and AI reconstruction.',
      rights: 'All rights reserved.',
      contact: 'Get in touch',
    },
  },
};

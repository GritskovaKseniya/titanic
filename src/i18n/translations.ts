export type Language = 'ru' | 'en';

export interface TranslationsShape {
  meta: { eyebrowLeft: string; eyebrowRight: string; year: string; genre: string };
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
  episodes: { label: string; heading: string; description: string; watch: string; comingSoon: string; season: string };
  gallery: { label: string; heading: string; description: string };
  team: {
    roles: { producer: string; director: string; editor: string; aiFilmmaker: string };
  };
  details: { label: string; heading: string; description: string; castLabel: string; teamLabel: string };
  footer: { tagline: string; rights: string; contact: string };
}

export const translations: Record<Language, TranslationsShape> = {
  ru: {
    meta: {
      eyebrowLeft: 'Документальный сериал',
      eyebrowRight: 'RU/EN · 1 сезон',
      year: '2026',
      genre: 'Документальный',
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
      heading: 'Кто есть кто',
      description: 'Пассажиры, чьи истории рассказаны в сериале, и команда, которая их восстанавливает.',
      castLabel: 'Пассажиры',
      teamLabel: 'Команда проекта',
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
      year: '2026',
      genre: 'Documentary',
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
      heading: 'Who\'s who',
      description: 'The passengers whose stories the series tells, and the team rebuilding them.',
      castLabel: 'Passengers',
      teamLabel: 'The team',
    },
    footer: {
      tagline: 'A documentary series about the Titanic: archive and AI reconstruction.',
      rights: 'All rights reserved.',
      contact: 'Get in touch',
    },
  },
};

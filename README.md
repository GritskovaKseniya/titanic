# Титаник: Корабль легенд

Промо-сайт документального сериала о «Титанике»: один сезон, десять серий,
часть каждой — ИИ-реконструкция утраченных сцен. Vite + React + TypeScript,
без бэкенда — контент серий, галереи и команды лежит в `src/data/`.

## Разработка

```bash
npm install
npm run dev
```

## Сборка и деплой

Сайт публикуется на GitHub Pages из `dist/` через
`.github/workflows/deploy.yml` при пуше в `main`. Один раз нужно включить
Pages в настройках репозитория: **Settings → Pages → Source: GitHub
Actions**.

Локальная сборка:

```bash
npm run build
npm run preview
```

`vite.config.ts` уже настроен на путь проекта GitHub Pages (`base:
'/titanic/'`) — если репозиторий переименуют, поменяйте `base` вместе с ним.

## Что нужно подставить перед запуском

- **Серии** (`src/data/episodes.ts`) — реальные тексты, `vimeoId` (id или
  приватная ссылка на Vimeo) и `posterUrl` (путь к постеру серии в
  `public/posters/`, например `/posters/01.jpg`) для каждой из 10 серий.
  Без постера строка серии просто показывает номер вместо превью — ничего
  не ломается.
- **Галерея** (`src/data/gallery.ts`) — сейчас плейсхолдеры-градиенты вместо
  реальных ИИ-кадров; добавьте файлы в `public/gallery/` и замените блок
  `HUE_GRADIENT` в `Gallery.tsx` на `<img>`.
- **Команда** (`src/data/team.ts`) — имена и ссылки на соцсети.
- Тексты на русском и английском — `src/i18n/translations.ts`.

## Структура

```
src/
  components/   Header, Hero, Episodes, Gallery, Team, Footer
  data/         контент серий, галереи, команды
  i18n/         переводы RU/EN + языковой контекст (тумблер, не роутинг)
  utils/video.ts  парсинг Vimeo-ссылок в embed-URL
```

# Титаник: Корабль легенд

Промо-сайт документального сериала о «Титанике»: один сезон, десять серий,
часть каждой — ИИ-реконструкция утраченных сцен. Vite + React + TypeScript,
статический хостинг на GitHub Pages. Контент (серии, галерея, команда,
соцсети/контакты) живёт в Firebase (Firestore + Storage) и редактируется
через скрытую страницу `/admin` — без Firebase сайт просто показывает
плейсхолдер-контент из `src/data/`.

## Разработка

```bash
npm install
cp .env.example .env.local   # заполнить после настройки Firebase, см. ниже
npm run dev
```

## Настройка Firebase (один раз)

1. **Создать проект** — [console.firebase.google.com](https://console.firebase.google.com) → Add project. Отдельный новый проект, не тот, что у one-two-film-academy.
2. **Authentication** → Sign-in method → включить **Email/Password**. Затем на вкладке **Users** → Add user — создать один аккаунт на всю команду (email + пароль), это и есть логин в `/admin`.
3. **Firestore Database** → Create database → любой регион, production mode.
4. **Storage** → Get started (тоже production mode).
5. **Правила доступа** — вкладка Rules в Firestore и в Storage: вставить содержимое `firestore.rules` и `storage.rules` из этого репозитория и Publish. Иначе по умолчанию Firebase блокирует всё, включая публичное чтение сайта.
6. **Веб-конфиг** — Project settings (шестерёнка) → General → Your apps → Add app → Web. Скопировать значения `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
7. Эти шесть значений: локально — в `.env.local` (см. `.env.example`); для деплоя — в **Settings → Secrets and variables → Actions** репозитория, с теми же именами (`VITE_FIREBASE_API_KEY` и т.д.). `.github/workflows/deploy.yml` уже их подхватывает.
8. Открыть `/admin` на сайте, войти под созданным аккаунтом, на каждой вкладке нажать **«Заполнить стартовыми данными»** — это одноразово (и без риска задвоить при повторном нажатии) заливает текущий плейсхолдер-контент в Firestore, дальше редактируется уже там.

Firebase-конфиг из шага 6 не секрет — он только называет проект, доступ на запись регулирует `firestore.rules`/`storage.rules`, а не секретность ключа.

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

## Админка (`/admin`)

После входа доступны четыре раздела:

- **Серии** — имя, класс/роль, синопсис (RU/EN), ссылка на Vimeo, постер.
- **Галерея** — подпись (RU/EN), номер серии, кадр; можно добавлять и удалять.
- **Команда** — имя, соцсеть, фото для ведущей/монтажёра/ИИ-креатора.
- **Соцсети и контакты** — контактный email и список соцсетей в футере.

Один общий логин на команду — `/admin` не разделяет, кто что редактировал.

## Что подставить, если не через админку

Данные можно редактировать и напрямую в коде — Firestore тогда не нужен,
сайт просто использует значения из `src/data/`:

- **Серии** (`src/data/episodes.ts`) — `defaultEpisodes`.
- **Галерея** (`src/data/gallery.ts`) — `defaultGalleryItems`.
- **Команда** (`src/data/team.ts`) — `defaultTeam`.
- **Соцсети/контакты** (`src/data/siteSettings.ts`) — `defaultSiteSettings`.
- Тексты интерфейса на русском и английском — `src/i18n/translations.ts`.

## Структура

```
src/
  components/   Header, Hero, Episodes, Gallery, Team, Footer — публичный сайт
  admin/        AdminApp, формы для серий/галереи/команды/настроек, авторизация
  data/         Firestore-хуки + дефолтные данные (fallback, они же "стартовые")
  i18n/         переводы RU/EN + языковой контекст (тумблер, не роутинг)
  firebase.ts   инициализация Firebase (auth/db/storage), из VITE_FIREBASE_*
  utils/video.ts  парсинг Vimeo-ссылок в embed-URL
firestore.rules, storage.rules   правила доступа — вставить в консоль Firebase
```

# tools/

Ручные утилиты для разработки — не часть сборки и не попадают на сайт.

Все работают через Playwright (в зависимости проекта не входит):

```
npm i --no-save playwright && npx playwright install chromium
```

Если Chromium уже установлен в другом месте — `CHROMIUM_PATH=/путь/к/chromium`.

Скрипты, которым нужен запущенный сайт (`check`, `shot`, `measure`), ждут его
на `http://localhost:4173/titanic/` — сначала `npm run build && npm run preview`
в отдельном терминале. Другой адрес — `SITE_URL=...`.

| Команда | Что делает |
|---|---|
| `npm run check` | Проверки после изменений по всем темам из переключателя: нет ошибок в консоли и горизонтального скролла, нет полосы на стыке hero и следующей секции, `/reconstructions` открывается и меню ведёт обратно, иконки/манифесты каждой темы на 6 языках на месте. Завершается с ошибкой, если что-то сломано. |
| `npm run shot` | Скриншоты в `screenshots/`. `--widths 390,768,1280 --themes gold,classic --lang ru --route reconstructions --scroll "#details" --full --scale 2` |
| `npm run measure -- "#top"` | Размеры и позиции элементов на разных ширинах. `--natural` — ещё и высота без `min-height`. `--widths`, `--theme`, `--lang`, `--route` |
| `npm run icons -- gold` | Генерирует иконки вкладки и домашнего экрана + манифесты для набора темы (`--all` — все). Новая тема — см. комментарий в начале `generate-theme-icons.mjs`. |

Общий код (запуск браузера, открытие сайта с темой/языком, список видимых
тем из `ThemeSwitcher.tsx`) — в `lib/browser.mjs`.

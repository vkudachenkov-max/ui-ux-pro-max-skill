# MobiAds — сайт агентства мобильного маркетинга

Одностраничный сайт для **MobiAds** (АО «МОБИАДС») — *«топливо для мобильных
приложений»*. Собран по фирменному брендбуку: фиолетово-синий градиент,
ультраширокая типографика, 3D-анимация и отдельная неоновая секция **MobiAds
Gaming**.

Построен на **Next.js 14 (App Router) + TypeScript + Tailwind CSS** в структуре
**shadcn/ui**, с 3D на **React Three Fiber (Three.js)**.

## Стек

| Слой | Технология |
|------|-----------|
| Фреймворк | Next.js 14 (App Router, RSC) |
| Язык | TypeScript (strict) |
| Стили | Tailwind CSS + CSS-переменные (shadcn-токены) |
| Компоненты | структура shadcn/ui (`components/ui`, `@/` алиас, `components.json`) |
| 3D | `three` + `@react-three/fiber` (герой-волна из точек) |
| Анимация | `framer-motion` (reveal, магнитные кнопки), CSS marquee |
| Тема | `next-themes` (светлая = маркетинг, тёмная = gaming-секция) |
| Иконки | `lucide-react` |
| Шрифты | self-hosted через `@fontsource-variable` — **Unbounded** (≈ Druk Wide, полная кириллица) + **Montserrat** |

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
# сборка
npm run build && npm run start
```

Требуется Node 18+.

## Структура

```
app/
  layout.tsx         # шрифты, метаданные, ThemeProvider
  page.tsx           # композиция секций
  globals.css        # бренд-токены, типо-классы, утилиты
components/
  ui/
    dotted-surface.tsx  # 3D-волна из точек (R3F), фирменный градиент
    button.tsx          # shadcn-кнопка с брендовыми вариантами
    card-fan-carousel.tsx # анимированный fan-carousel кейсов (drag / стрелки / клавиши)
  sections/          # site-header, hero, marquee, services, cases, showcase, gaming, contact, site-footer
public/showcase/     # SVG-карточки кейсов (сгенерированы, легко заменить)
  brand.tsx          # логотип, ракета, спарк
  magnetic.tsx       # магнитный hover (respects reduced-motion)
  reveal.tsx         # scroll-reveal + stagger
  theme-provider.tsx
lib/utils.ts         # cn()
tailwind.config.ts   # брендовая палитра (brand.* / gaming.*), градиенты, анимации
```

## Брендовые токены

Палитра из брендбука вынесена в `tailwind.config.ts`:

- **Marketing** — `brand.purple #691E9A`, `brand.magenta #9A12AF`, `brand.lilac #C97DF3`, `brand.violet #DE6BFF`, `brand.mist #F4E9FF`, `brand.fog #DCE6F3`
- **Gaming** — `gaming.indigo #342EBB`, `gaming.blue #5B54F2`, `gaming.sky #6EA1FF`, `gaming.cyan #6EDBFF`, `gaming.pink #FB0CD2`
- Фирменные градиенты: `bg-brand-grad`, `bg-brand-grad-soft`, `bg-gaming-grad`

## Шрифты

Заголовки набраны **Unbounded** — широкий геометрический гротеск с полной
кириллицей, максимально близкий к брендовому **Druk Wide Cy**. Шрифты
self-hosted (без запроса к Google Fonts).

**Чтобы поставить оригинальный Druk Wide Cy** (лицензионный): положите файлы в
`app/fonts/`, добавьте `@font-face` в `globals.css` и поменяйте одну строку:

```css
:root {
  --font-display: 'Druk Wide Cy', 'Unbounded Variable', sans-serif;
}
```

Всё остальное подхватится автоматически.

## Карусель кейсов (fan-carousel)

Секция «Портфолио» использует `components/ui/card-fan-carousel.tsx` — веерную
колоду карточек-кейсов: центральная карточка активна, соседние развёрнуты веером.
Листается перетаскиванием центральной карточки, стрелками ←/→, точками-индикаторами
и с клавиатуры (Tab на карусель → стрелки). Учитывает `prefers-reduced-motion`.

Карточки заданы в `components/sections/showcase.tsx` — это **реальные кейсы**
(Магнит Плюс, Много Лосося, ВкусВилл, Подружка + карточка «Награды»), собранные
из структурированных данных в бренд-стиле (`CaseCardFace`). Компонент карусели
универсальный — принимает `items: { key, label, content }[]`, где `content` —
любой React-узел, поэтому добавить/изменить кейс = отредактировать массив
`CASES` в `showcase.tsx`:

```tsx
const CASES = [
  {
    brand: 'Название клиента', category: 'E-commerce',
    title: 'Что делали', grad: 'linear-gradient(150deg,#691E9A,#9A12AF)',
    primary: { value: '20.000+', label: 'продаж в месяц', sub: 'средний 5.336' },
    metrics: [{ label: 'CR', value: '4,57%' }, { label: 'CAC', value: '800 ₽' }],
  },
];
```

Если нужны фото/скриншоты приложений — можно рендерить внутри `content`
`<img>`/`next/image` (домен `images.unsplash.com` уже разрешён в `next.config.mjs`).

## Что доработать под прод

- **Форма заявки** (`components/sections/contact.tsx`) сейчас с демо-обработчиком
  (`setSent(true)`). Подключите свой API-route / CRM в `onSubmit`.
- **Изображения.** Дизайн намеренно построен на градиентных плашках и типографике
  (как в брендбуке), фотографии не используются. Если нужны реальные фото кейсов —
  добавьте `next/image` в карточки `cases.tsx` (домены под Unsplash уже разрешены
  в `next.config.mjs`).
- **next** — стоит выполнить `npm update next` до последнего патча 14.2.x
  (в момент сборки npm показывает security-advisory для 14.2.15).

## Реализованные требования дизайн-качества

- 3D-материалы (React Three Fiber), фирменный градиент точек
- Ультраширокая типографика (Unbounded ≈ Druk Wide) + Montserrat
- Магнитные кнопки, scroll-reveal, stagger, бегущая строка
- Обе темы (светлая маркетинг / тёмная gaming), контраст AA
- `prefers-reduced-motion` учитывается (3D замирает, анимации гасятся)
- Адаптив: проверено на 390 / 768 / 1440
- Доступность: лейблы форм, focus-ring, aria на иконках-кнопках, семантика

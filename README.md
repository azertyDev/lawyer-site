# Lawyer Site — Сайт-визитка юриста

Production-ready сайт-визитка для юриста по экономическим и гражданским спорам.

## Технологический стек

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui (Radix)
- **Forms**: TanStack Form + Zod
- **HTTP Client**: Axios
- **Icons**: @iconify/react
- **Linting**: Biome
- **Testing**: Vitest + Testing Library
- **SEO**: next-sitemap, JSON-LD

## Архитектура

Проект построен по методологии Feature-Sliced Design (FSD):

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (формы)
│   ├── services/          # Страницы услуг
│   └── ...                # Остальные страницы
├── widgets/               # Крупные секции страниц
│   ├── header/
│   ├── footer/
│   ├── hero/
│   ├── services/
│   ├── faq/
│   └── ...
├── features/              # Бизнес-функции
│   ├── lead-form/         # Форма "Оценить перспективу"
│   └── consultation-form/ # Форма "Записаться на консультацию"
├── entities/              # Доменные сущности
│   ├── service/
│   ├── case/
│   └── faq/
└── shared/                # Переиспользуемый код
    ├── ui/                # UI компоненты
    ├── lib/               # Утилиты, HTTP-клиент, аналитика
    └── config/            # Конфигурация, env
```

## Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Настройка окружения

```bash
cp .env.example .env.local
```

Отредактируйте `.env.local` и заполните необходимые переменные.

### Запуск в режиме разработки

```bash
npm run dev
```

Сайт будет доступен по адресу http://localhost:3000

### Сборка для production

```bash
npm run build
npm start
```

### Запуск тестов

```bash
npm test
npm run test:coverage
```

### Линтинг и форматирование

```bash
npm run lint
npm run lint:fix
npm run format
```

## Переменные окружения

### Обязательные

| Переменная | Описание | Пример |
|------------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL сайта | `https://example.com` |
| `NEXT_PUBLIC_SITE_NAME` | Название практики | `Юридическая практика` |
| `NEXT_PUBLIC_PHONE` | Телефон | `+7 (999) 123-45-67` |
| `NEXT_PUBLIC_EMAIL` | Email | `info@example.com` |
| `NEXT_PUBLIC_ADDRESS` | Адрес | `г. Москва, ул. Примерная, 1` |
| `LEADS_EMAIL` | Email для заявок | `leads@example.com` |

### Email провайдер (один из вариантов)

#### Вариант 1: Resend

| Переменная | Описание |
|------------|----------|
| `RESEND_API_KEY` | API ключ Resend |

#### Вариант 2: SMTP

| Переменная | Описание |
|------------|----------|
| `SMTP_HOST` | SMTP сервер |
| `SMTP_PORT` | Порт (587 или 465) |
| `SMTP_USER` | Логин |
| `SMTP_PASS` | Пароль |
| `SMTP_FROM` | Email отправителя |

### Опциональные

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_TELEGRAM_USERNAME` | Username Telegram |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Номер WhatsApp |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile (клиент) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile (сервер) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_YM_ID` | Яндекс.Метрика ID |

## Страницы

| URL | Описание |
|-----|----------|
| `/` | Главная |
| `/services` | Услуги (хаб) |
| `/services/[slug]` | Страница услуги |
| `/practice` | Практика/кейсы |
| `/about` | О юристе |
| `/fees` | Стоимость |
| `/faq` | FAQ |
| `/contacts` | Контакты |
| `/privacy` | Политика конфиденциальности |
| `/data-processing-consent` | Согласие на обработку данных |

## Формы

### Оценить перспективу дела

Полная форма с полями:
- Тип клиента (юрлицо/физлицо)
- Тип спора
- Стадия (до суда/суд/исполнение)
- Описание ситуации
- Сумма спора (опционально)
- Контактные данные
- Предпочтительный канал связи
- Согласие на обработку данных

### Записаться на консультацию

Короткая форма:
- Имя
- Телефон
- Комментарий (опционально)
- Канал связи
- Согласие

### Антиспам

- **Honeypot**: скрытое поле, заполнение которого ботами блокирует отправку
- **Time gate**: минимальное время заполнения формы (3 секунды)
- **Turnstile**: опциональная интеграция с Cloudflare Turnstile

## SEO

- Уникальные meta теги на каждой странице
- Open Graph / Twitter Cards
- JSON-LD разметка (Organization, BreadcrumbList, FAQPage, Service)
- Автоматическая генерация sitemap.xml и robots.txt
- Семантическая структура заголовков (H1/H2/H3)

## Аналитика

Единый слой трекинга в `shared/lib/analytics` с поддержкой:
- Google Analytics 4
- Яндекс.Метрика

### События

- `view_service_page` — просмотр страницы услуги
- `click_primary_cta` — клик по основному CTA
- `click_secondary_cta` — клик по вторичному CTA
- `click_phone` — клик по телефону
- `click_messenger_tg` — клик по Telegram
- `click_messenger_wa` — клик по WhatsApp
- `form_submit_attempt` — попытка отправки формы
- `form_submit_success` — успешная отправка
- `form_submit_error` — ошибка отправки

## Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках проекта
3. Deploy

### Docker

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Лицензия

MIT

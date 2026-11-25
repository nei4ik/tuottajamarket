# Backend: Prisma 7 + PostgreSQL

Команды выполняй из папки `backend`. Установлена Prisma 7.10.1; повторный `prisma init` не нужен.

## Текущее состояние

Подключение к PostgreSQL работает. Схема проверена, клиент перегенерирован, чтение через `prisma.product.findMany({ take: 1 })` выполнено успешно без изменения данных.

Модель `Product` соответствует существующей таблице `public.Product`: `id`, `title`, `description`, `price`, `category`, `imageUrl`, `createdAt`, `updatedAt`, `featured`. Поля `imageUrl` и `featured` допускают `NULL`, остальные обязательны. Название товара хранится в `title`, не в `name`.

Для `updatedAt` настроено обновление времени на уровне Prisma Client через `@updatedAt`; это не триггер PostgreSQL. При записи напрямую через SQL время нужно задавать отдельно. Описание атрибута: https://www.prisma.io/docs/orm/v7/reference/prisma-schema-reference

## Запуск

```bash
npm run db:check
npm run db:studio
```

После `npm run db:studio` вручную открой http://localhost:5555 в браузере. Терминал должен оставаться открытым; остановить сервер можно через Ctrl+C.

Команда использует `scripts/studio.js`: запускает установленную Prisma в том же процессе Node, без дочерней оболочки и автоматического открытия браузера. На Windows служебное состояние Studio хранится в игнорируемой папке `node_modules/.cache/prisma-studio`, а не в пользовательской AppData. Системные переменные Windows не меняются, таблицы базы не затрагиваются.

Этот запуск проверен в течение 20 секунд: интерфейс и статические ресурсы отвечали HTTP 200, запрос `SELECT 1` через API Studio прошёл успешно. Для другого порта: `npm run db:studio -- --port 5556`.

## Команды

| Команда | Для чего |
| --- | --- |
| `npm run db:validate` | Проверить схему |
| `npm run db:generate` | Перегенерировать клиент после изменения схемы |
| `npm run db:check` | Проверить подключение без изменения данных |
| `npm run db:studio` | Открыть интерфейс базы |
| `npm start` | Запустить существующий Express-сервер |
| `npm run dev` | Запустить Express с перезапуском при изменениях |

Таблица Product уже существует: создавать её заново не нужно. Локальная история миграций сейчас отсутствует, хотя в базе есть `_prisma_migrations`. Не запускай `migrate dev`, `db push` или reset наугад: сначала нужно восстановить или согласовать историю миграций. Данные при исправлении схемы не менялись.

## Использование в серверном коде

```js
import { prisma } from "./db.js";

const products = await prisma.product.findMany();
```

`db.js` содержит готовый экземпляр клиента с PostgreSQL-адаптером. Не называй этот файл `prisma.js` в корне backend: при запуске `npx prisma ...` на Windows такой файл может перехватывать команду и открываться через Windows Script Host. Файл переименован, импорт в проверке подключения обновлён; `npx prisma studio --help` проходит с кодом 0. Текущий `/products` в `server.js` пока возвращает тестовый массив и не был изменён.

`generated/prisma/` содержит сгенерированный клиент: его не редактируй. Используется `prisma-client` с `.ts`-импортами и установленный Node.js 26.11.1. Документация генератора: https://www.prisma.io/docs/orm/v7/prisma-schema/overview/generators

Настройки подключения находятся в `backend/.env`; не публикуй пароль и не добавляй `.env` в Git. При возвращении ошибки `28P01` проверь учётные данные: PostgreSQL обозначает этим кодом `invalid_password`: https://www.postgresql.org/docs/current/errcodes-appendix.html

# Backend

## О проекте

Здесь находится серверная часть приложения на Node.js и TypeScript. Всё для работы с пользователями, статьями и базой данных.

## Быстрый старт

- `npm run start:dev` — обычный запуск в режиме разработки
- `npm run start:prod` — запуск собранного проекта для продакшена
- `npm run build` — сборка проекта (TypeScript → JavaScript)
- `npm run migration:create` — создать новую миграцию для базы
- `npm run migration:run` — применить миграции
- `npm run migration:undo` — откатить миграцию

Примеры запуска:
```bash
npm run start:dev
npm run build
npm run migration:create -- create-articles
```
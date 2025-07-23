# Knowledge Base API

REST API для управления статьями базы знаний с контролем доступа.

## Стек

- Node.js + TypeScript
- Express.js
- Sequelize (PostgreSQL)
- JWT авторизация
- Docker + Docker Compose

**Порты по умолчанию:**
- backend: http://localhost:3001/api
---

# Подготовка переменных окружения

Перед запуском переименуйте файл `.env.example` в `.env` в корне и в папке backend:

```sh
cp .env.example в .env
cp backend/.env.example в backend/.env
```
---

# Запуск backend в production

1. **Соберите контейнер и запустите backend:**
   ```sh
   npm run start:prod
   ```

2. **Выполните миграции:**
   ```sh
   npm run migration:run
   ```

3. **Выполните запрос:**
   ```sh
   GET http://localhost:3001/api/articles
   ```

---

- Для разработки используйте аналогичные команды с `:dev`
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Копируем js-миграции в стандартную папку
RUN mkdir -p /app/migrations && cp -r ./src/db/migrations/* /app/migrations/

FROM node:20 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY ./database.config.js ./database.config.js
COPY --from=build /app/migrations ./migrations

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]

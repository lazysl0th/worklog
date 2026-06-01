FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN npm ci --ignore-scripts

COPY backend/tsconfig.json ./backend/
COPY backend/src ./backend/src

RUN npm run build -w backend


FROM node:26-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/src/infrastructure/services/i18n/locales ./backend/dist/infrastructure/services/i18n/locales

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Запуск приложения из корня
CMD ["node", "backend/dist/index.js"]
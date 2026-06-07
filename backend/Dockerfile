FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN npm ci --ignore-scripts

COPY backend/tsconfig.json ./backend/
COPY backend/prisma.config.ts ./backend/
COPY backend/src ./backend/src

RUN npm run build -w backend


FROM node:26-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN npm ci --ignore-scripts

COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/src/infrastructure/services/i18n/locales ./backend/dist/infrastructure/services/i18n/locales
COPY --from=builder /app/backend/prisma.config.ts ./backend/
COPY --from=builder /app/backend/src/infrastructure/persistence/prisma ./backend/src/infrastructure/persistence/prisma

RUN npx prisma generate --schema=./backend/src/infrastructure/persistence/prisma/schema.prisma

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["sh", "-c", "DATABASE_URL=$DATABASE_URL npx prisma migrate deploy --config=./backend/prisma.config.ts && npm run db:seed --config=./backend/prisma.config.ts && node backend/dist/index.js"]
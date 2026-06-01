FROM node:26-alpine AS runner

WORKDIR /app/backend

RUN mkdir -p dist && \
    echo 'console.log("🚀 Бэкенд-заглушка на корневом контексте запущена!"); setInterval(() => {}, 1000);' > dist/index.js

EXPOSE 5000

CMD ["node", "dist/index.js"]
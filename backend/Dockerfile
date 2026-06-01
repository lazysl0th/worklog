FROM node:26-alpine AS runner

WORKDIR /app/backend

RUN mkdir -p dist && echo 'const http = require("http"); \
const server = http.createServer((req, res) => { \
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" }); \
  res.end("🚀 Бэкенд-заглушка на Render работает и слушает порт!"); \
}); \
const port = process.env.PORT || 5000; \
server.listen(port, () => { \
  console.log(`🚀 Сервер запущен на порту ${port}`); \
});' > dist/index.js

EXPOSE 5000

CMD ["node", "dist/index.js"]
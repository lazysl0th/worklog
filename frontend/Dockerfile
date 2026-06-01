FROM nginx:alpine

# Создаем базовую страницу прямо на этапе сборки контейнера
RUN echo "<h1>Frontend Container Stub is Running</h1>" > /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
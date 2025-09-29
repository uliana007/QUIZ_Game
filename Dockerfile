# Этап сборки React-приложения
FROM node:18-alpine AS build
WORKDIR /app
# Копируем файлы зависимостей
COPY package*.json ./
# Устанавливаем зависимости
RUN npm ci
# Копируем весь проект
COPY . .
# Выполняем сборку
RUN npm run build

# Этап запуска с Nginx
FROM nginx:alpine
# Копируем собранные файлы в директорию Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Копируем кастомный конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Открываем порт 80
EXPOSE 80
# Запускаем Nginx в режиме foreground
CMD ["nginx", "-g", "daemon off;"]

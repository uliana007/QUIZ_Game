# Этап сборки React-приложения
FROM node:18-alpine AS build
WORKDIR /app

# Проверяем сеть перед установкой
RUN ping -c 4 google.com && nslookup registry.npmmirror.com

# Устанавливаем стабильный реестр npm и очищаем кэш
RUN npm config set registry https://registry.npmmirror.com \
    && npm cache clean --force

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости с оптимизацией и таймаутом
RUN npm ci --omit=dev --no-audit --progress=false --prefer-offline --network-timeout=60000

# Копируем весь проект
COPY . .

# Выполняем сборку
RUN npm run build

# Этап запуска с Nginx
FROM nginx:alpine

# Копируем собранные файлы из этапа сборки
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Проверяем конфигурацию Nginx
RUN nginx -t

# Открываем порт 80
EXPOSE 80

# Логирование для диагностики
ENV NGINX_LOG_LEVEL=info

# Запускаем Nginx в режиме foreground
CMD ["nginx", "-g", "daemon off;"]

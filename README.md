руководство к запуску проекта (React):
cd - корневая папка
npm start

Проверьте статус репозитория:

bash
Copy
git status
Это покажет, какие файлы были изменены, добавлены или удалены.

Добавьте изменения в индекс (staging area):

bash
Copy
git add .
(или добавьте конкретные файлы, например, git add file1.txt file2.txt).

Создайте коммит:

bash
Copy
git commit -m "Ваше сообщение о изменениях"
Запушьте изменения в удалённый репозиторий (например, на GitHub):

bash
Copy
git push origin main

чтобы задеплоидить: ?npm run deploy?



миграция вопросов в бд:

пароль логин:

const email = "aenoapolt243@gmail.com";
const password = "AdminAwnopolt876";



КОМАНДЫ ДЛЯ КОНСОЛИ:

cd (папку бд)
node migrateData.js


КОНФИГУРАЦИЯ RULES DATABASES FIREBASE ДЛЯ ЗАГРУЗКИ ДАННЫХ:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Временно разрешить чтение и запись для всех пользователей
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

Важно
После завершения миграции данных, не забудьте вернуть правила безопасности к более строгим настройкам, чтобы защитить вашу базу данных от неавторизованного доступа. Пример обновленных правил безопасности:


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Разрешить чтение и запись только аутентифицированным пользователям
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}


ЗАГРУЗКА НА ХОСТИНГ

npm run build





черновик:
"homepage": "https://uliana007.github.io/QUIZ_Game/"

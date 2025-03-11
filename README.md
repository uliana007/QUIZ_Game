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
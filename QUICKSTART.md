# Быстрый старт

## Запуск с Docker Compose (рекомендуется)

1. Убедитесь, что Docker и Docker Compose установлены
2. Выполните команду:
```bash
docker-compose up -d
```

3. Откройте в браузере:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

4. Для остановки:
```bash
docker-compose down
```

## Локальный запуск (для разработки)

### Backend

1. Установите Java 17 и Gradle
2. Перейдите в директорию backend:
```bash
cd backend
```

3. Для первого запуска создайте wrapper (если нужно):
```bash
gradle wrapper
```

4. Запустите с H2 базой данных (для разработки):
```bash
./gradlew bootRun --args='--spring.profiles.active=dev'
```

Или с PostgreSQL:
```bash
./gradlew bootRun
```

### Frontend

1. Установите Node.js 18+
2. Перейдите в директорию frontend:
```bash
cd frontend
```

3. Установите зависимости:
```bash
npm install
```

4. Запустите dev сервер:
```bash
npm run dev
```

## Первые шаги

1. Создайте тему в разделе "Темы"
2. Добавьте вопросы в разделе "Вопросы" или загрузите из файла (см. example_questions.txt)
3. Начните повторение в разделе "Повторение"

## Формат файла для загрузки

```
Q: Текст вопроса
A: Правильный ответ
O: Вариант ответа 1
O: Вариант ответа 2

Q: Следующий вопрос
A: Правильный ответ
...
```

См. example_questions.txt для примера.


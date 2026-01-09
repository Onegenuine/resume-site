# Flashcard App - Приложение для повторения материала

Приложение для эффективного повторения материала с использованием методики интервального повторения (Spaced Repetition).

## Технологический стек

- **Backend**: Spring Boot 3.2.0, Java 17
- **Frontend**: React 18, Vite
- **База данных**: PostgreSQL
- **Сборка**: Gradle
- **Контейнеризация**: Docker, Docker Compose
- **Логирование**: Logback

## Функционал

### Темы
- Создание, редактирование и удаление тем
- Просмотр всех тем с количеством вопросов

### Вопросы
- Добавление вопросов с вариантами ответов
- Редактирование и удаление вопросов
- Фильтрация вопросов по темам
- Загрузка вопросов из файла

### Повторение
- Интервальное повторение на основе алгоритма SM-2
- Оценка качества ответа (0-5)
- Автоматический расчет следующего времени повторения
- Статистика повторений

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

## Запуск приложения

### С помощью Docker Compose (рекомендуется)

```bash
docker-compose up -d
```

Приложение будет доступно:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- PostgreSQL: localhost:5432

### Локальный запуск

#### Backend

```bash
cd backend
./gradlew bootRun
```

Или с использованием H2 базы данных для разработки:
```bash
./gradlew bootRun --args='--spring.profiles.active=dev'
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Структура проекта

```
.
├── backend/                 # Spring Boot приложение
│   ├── src/
│   │   └── main/
│   │       ├── java/com/flashcard/
│   │       │   ├── model/      # Модели данных
│   │       │   ├── repository/ # Репозитории
│   │       │   ├── service/    # Бизнес-логика
│   │       │   ├── controller/ # REST контроллеры
│   │       │   └── dto/         # Data Transfer Objects
│   │       └── resources/
│   │           └── application.yml
│   ├── build.gradle
│   └── Dockerfile
├── frontend/               # React приложение
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── services/       # API сервисы
│   │   └── App.jsx
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## API Endpoints

### Темы
- `GET /api/topics` - Получить все темы
- `GET /api/topics/{id}` - Получить тему по ID
- `POST /api/topics` - Создать тему
- `PUT /api/topics/{id}` - Обновить тему
- `DELETE /api/topics/{id}` - Удалить тему

### Вопросы
- `GET /api/questions` - Получить все вопросы (опционально ?topicId=)
- `GET /api/questions/review` - Получить вопросы для повторения
- `GET /api/questions/{id}` - Получить вопрос по ID
- `POST /api/questions` - Создать вопрос
- `PUT /api/questions/{id}` - Обновить вопрос
- `DELETE /api/questions/{id}` - Удалить вопрос
- `POST /api/questions/review` - Отправить результат повторения
- `POST /api/questions/upload` - Загрузить вопросы из файла

## Алгоритм интервального повторения (SM-2)

Приложение использует алгоритм SM-2 для расчета интервалов повторения:
- Оценка качества ответа влияет на следующий интервал
- Ease Factor (EF) корректируется в зависимости от качества
- Интервал увеличивается при успешных повторениях
- При неудаче интервал сбрасывается

## Логирование

Логи сохраняются в `backend/logs/application.log` с ротацией:
- Максимальный размер файла: 10MB
- Хранение: 30 дней истории

## Переменные окружения

### Backend
- `DB_HOST` - Хост базы данных (по умолчанию: localhost)
- `DB_PORT` - Порт базы данных (по умолчанию: 5432)
- `DB_NAME` - Имя базы данных (по умолчанию: flashcard_db)
- `DB_USER` - Пользователь БД (по умолчанию: postgres)
- `DB_PASSWORD` - Пароль БД (по умолчанию: postgres)

### Frontend
- `VITE_API_URL` - URL API бэкенда (по умолчанию: http://localhost:8080/api)

## Разработка

Для разработки можно использовать H2 in-memory базу данных:
```bash
cd backend
./gradlew bootRun --args='--spring.profiles.active=dev'
```

H2 консоль будет доступна по адресу: http://localhost:8080/h2-console

## Лицензия

MIT


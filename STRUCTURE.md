# Структура проекта

## 📄 Резюме приложение (Resume App)

**Расположение:** Корневая папка `/Users/user/Downloads/react_resume/`

### Основные файлы резюме:
- `src/App.jsx` - главный компонент резюме
- `src/components/` - компоненты резюме (Hero, About, Experience, Projects, Education, Contact)
- `index.html` - HTML шаблон
- `package.json` - зависимости резюме приложения
- `vite.config.js` - конфигурация Vite для резюме
- `public/resume.pdf` - PDF резюме
- `dist/` - собранная версия резюме

### Запуск резюме:
```bash
npm run dev    # Запуск dev сервера
npm run build  # Сборка для production
```

---

## 📚 Flashcard приложение (Flashcard App)

### Backend (Spring Boot)
**Расположение:** `/Users/user/Downloads/react_resume/backend/`

- `src/main/java/com/flashcard/` - Java код
  - `model/` - модели данных (Topic, Question, ReviewSession)
  - `repository/` - репозитории JPA
  - `service/` - бизнес-логика
  - `controller/` - REST API контроллеры
  - `dto/` - Data Transfer Objects
- `src/main/resources/` - конфигурация
  - `application.yml` - основная конфигурация
  - `application-dev.yml` - конфигурация для разработки
  - `logback-spring.xml` - настройка логирования
- `build.gradle` - конфигурация Gradle
- `Dockerfile` - Docker образ для backend

### Frontend (React)
**Расположение:** `/Users/user/Downloads/react_resume/frontend/`

- `src/App.jsx` - главный компонент flashcard приложения
- `src/components/` - компоненты (Topics, Questions, Review)
- `src/services/api.js` - API клиент
- `package.json` - зависимости frontend
- `vite.config.js` - конфигурация Vite для flashcard
- `Dockerfile` - Docker образ для frontend
- `nginx.conf` - конфигурация Nginx

### Общие файлы Flashcard:
- `docker-compose.yml` - оркестрация всех сервисов
- `example_questions.txt` - пример файла для загрузки вопросов
- `README_FLASHCARD.md` - документация flashcard приложения
- `QUICKSTART.md` - быстрый старт

### Запуск Flashcard:
```bash
# С Docker Compose (рекомендуется)
docker-compose up -d

# Или локально:
# Backend:
cd backend
./gradlew bootRun

# Frontend:
cd frontend
npm install
npm run dev
```

---

## 📁 Полная структура

```
react_resume/
├── 📄 РЕЗЮМЕ ПРИЛОЖЕНИЕ (корневая папка)
│   ├── src/
│   │   ├── App.jsx              # Главный компонент резюме
│   │   ├── components/          # Компоненты резюме
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── public/resume.pdf
│
├── 📚 FLASHCARD ПРИЛОЖЕНИЕ
│   ├── backend/                 # Spring Boot backend
│   │   ├── src/main/java/com/flashcard/
│   │   ├── build.gradle
│   │   └── Dockerfile
│   │
│   ├── frontend/                # React frontend
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── docker-compose.yml       # Docker Compose конфигурация
│   ├── example_questions.txt    # Пример файла
│   ├── README_FLASHCARD.md      # Документация
│   └── QUICKSTART.md            # Быстрый старт
│
└── STRUCTURE.md                 # Этот файл
```

---

## ⚠️ Важно

- **Резюме приложение** работает независимо от flashcard приложения
- Оба приложения могут работать одновременно на разных портах
- Резюме использует порт по умолчанию Vite (обычно 5173)
- Flashcard frontend использует порт 3000 (в Docker) или настраивается в vite.config.js


# Решение проблем

## Если ничего не работает

### 1. Проверьте, что зависимости установлены

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
./gradlew build
```

### 2. Проверьте, что сервисы запущены

**Если используете Docker:**
```bash
docker-compose ps
# Должны быть запущены: postgres, backend, frontend
```

**Если запускаете локально:**

Backend:
```bash
cd backend
./gradlew bootRun
# Должен быть доступен на http://localhost:8080
```

Frontend:
```bash
cd frontend
npm run dev
# Должен быть доступен на http://localhost:3000 (или другой порт)
```

### 3. Проверьте консоль браузера

Откройте DevTools (F12) и проверьте:
- Ошибки в консоли (Console)
- Ошибки в Network (запросы к API)

### 4. Проверьте, что backend отвечает

```bash
curl http://localhost:8080/api/topics
# Должен вернуть JSON (пустой массив [] если нет тем)
```

### 5. Проверьте CORS

Если backend и frontend на разных портах, убедитесь что CORS настроен правильно.
В `QuestionController.java` и `TopicController.java` должно быть:
```java
@CrossOrigin(origins = "*")
```

### 6. Частые ошибки

**Ошибка: "Cannot GET /"**
- Проверьте, что frontend запущен
- Проверьте порт в vite.config.js

**Ошибка: "Network Error" или "Failed to fetch"**
- Backend не запущен
- Неправильный URL API в frontend/src/services/api.js
- Проблемы с CORS

**Ошибка: "Module not found"**
- Запустите `npm install` в папке frontend

**Ошибка: "Port already in use"**
- Измените порт в vite.config.js или остановите другой процесс

### 7. Полная переустановка

```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
./gradlew clean build

# Docker
docker-compose down
docker-compose up -d --build
```

### 8. Проверка логов

**Backend логи:**
```bash
docker-compose logs backend
# или
cd backend
tail -f logs/application.log
```

**Frontend логи:**
- Откройте консоль браузера (F12)


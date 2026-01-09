# Flashcard Microservices - Монорепозиторий

Архитектура микросервисов для Flashcard App с поддержкой до 10,000 пользователей.

## Архитектура

### Микросервисы:

1. **Gateway Service** (порт 8080)
   - API Gateway для маршрутизации запросов
   - Единая точка входа

2. **Auth Service** (порт 8081)
   - Интеграция с Keycloak
   - Управление аутентификацией

3. **Question Service** (порт 8082)
   - Управление вопросами и темами
   - WebFlux + R2DBC

4. **Profile Service** (порт 8083)
   - Профили пользователей
   - Статистика и достижения
   - Лидерборд

5. **Battle Service** (порт 8084)
   - Режим битвы между пользователями
   - Викторины в реальном времени

## Технологии

- **Spring Boot 3.2.0** с **WebFlux** (реактивный стек)
- **Keycloak** для аутентификации и авторизации
- **R2DBC** для реактивного доступа к БД
- **PostgreSQL** как основная БД
- **Spring Cloud Gateway** для маршрутизации

## Запуск

### 1. Запуск инфраструктуры (Keycloak, PostgreSQL)

```bash
docker-compose up -d keycloak postgres keycloak-db
```

### 2. Настройка Keycloak

1. Откройте http://localhost:9090
2. Войдите: admin/admin
3. Создайте Realm: `flashcard`
4. Создайте Client: `flashcard-client`
5. Настройте пользователей

### 3. Запуск микросервисов

```bash
# Из корня монорепозитория
./gradlew build
./gradlew :gateway-service:bootRun &
./gradlew :auth-service:bootRun &
./gradlew :question-service:bootRun &
./gradlew :profile-service:bootRun &
./gradlew :battle-service:bootRun &
```

Или через Docker Compose:

```bash
docker-compose up -d
```

## API Endpoints

### Gateway (8080)
- Все запросы идут через `/api/*`

### Profile Service
- `GET /api/profiles/me` - Мой профиль
- `GET /api/profiles/{username}` - Профиль пользователя
- `PUT /api/profiles/me` - Обновить профиль
- `GET /api/profiles/leaderboard` - Лидерборд

### Battle Service
- `POST /api/battles` - Создать битву
- `POST /api/battles/{id}/join` - Присоединиться к битве
- `GET /api/battles/{id}` - Получить битву
- `GET /api/battles/my` - Мои битвы
- `GET /api/battles/available` - Доступные битвы

## База данных

Схемы создаются автоматически через R2DBC. Основные таблицы:
- `user_profiles` - профили пользователей
- `battles` - битвы
- `battle_questions` - вопросы в битвах
- `topics`, `questions` - вопросы и темы

## Масштабирование

Архитектура поддерживает горизонтальное масштабирование:
- Каждый сервис может быть запущен в нескольких экземплярах
- Gateway балансирует нагрузку
- R2DBC обеспечивает реактивность для высокой нагрузки


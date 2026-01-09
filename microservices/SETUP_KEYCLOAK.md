# Настройка Keycloak

## 1. Запуск Keycloak

```bash
docker-compose up -d keycloak keycloak-db
```

Дождитесь запуска (около 30 секунд), затем откройте http://localhost:9090

## 2. Первоначальная настройка

1. Войдите: `admin` / `admin`
2. Создайте новый Realm:
   - Нажмите на выпадающий список вверху (Master)
   - Выберите "Create Realm"
   - Название: `flashcard`
   - Enabled: ON
   - Нажмите "Create"

## 3. Создание Client

1. В меню слева выберите "Clients"
2. Нажмите "Create client"
3. Client ID: `flashcard-client`
4. Client protocol: `openid-connect`
5. Нажмите "Next"
6. Настройки:
   - Client authentication: ON
   - Authorization: OFF
   - Authentication flow: Standard flow, Direct access grants
7. Нажмите "Next"
8. Web origins: `*`
9. Valid redirect URIs: `*`
10. Нажмите "Save"

## 4. Настройка Client Secret

1. Откройте созданный client `flashcard-client`
2. Перейдите на вкладку "Credentials"
3. Скопируйте "Client secret" (понадобится для frontend)

## 5. Создание пользователей

1. В меню слева выберите "Users"
2. Нажмите "Create new user"
3. Заполните:
   - Username
   - Email
   - First name, Last name
   - Email verified: ON
4. Нажмите "Create"
5. Перейдите на вкладку "Credentials"
6. Установите пароль
7. Temporary: OFF
8. Нажмите "Save"

## 6. Настройка Frontend

В `frontend/src/services/api.js` добавьте:

```javascript
const getToken = async () => {
  // Получение токена через Keycloak
  // Используйте keycloak-js библиотеку
}
```

## Переменные окружения

Для всех сервисов:
- `KEYCLOAK_ISSUER_URI=http://localhost:9090/realms/flashcard`


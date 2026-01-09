#!/bin/bash

echo "🔍 Проверка Flashcard App..."
echo ""

# Проверка frontend
echo "📦 Frontend:"
if [ -d "frontend/node_modules" ]; then
    echo "  ✓ node_modules установлены"
else
    echo "  ✗ node_modules НЕ установлены - запустите: cd frontend && npm install"
fi

# Проверка backend
echo ""
echo "☕ Backend:"
if [ -f "backend/build/libs" ] || [ -d "backend/.gradle" ]; then
    echo "  ✓ Gradle настроен"
else
    echo "  ⚠ Gradle не настроен - запустите: cd backend && ./gradlew build"
fi

# Проверка Docker
echo ""
echo "🐳 Docker:"
if command -v docker &> /dev/null; then
    echo "  ✓ Docker установлен"
    if docker ps | grep -q flashcard; then
        echo "  ✓ Контейнеры запущены"
        docker ps | grep flashcard
    else
        echo "  ✗ Контейнеры НЕ запущены - запустите: docker-compose up -d"
    fi
else
    echo "  ✗ Docker не установлен"
fi

# Проверка портов
echo ""
echo "🌐 Порты:"
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "  ✓ Порт 8080 (backend) занят"
else
    echo "  ✗ Порт 8080 (backend) свободен - backend не запущен"
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "  ✓ Порт 3000 (frontend) занят"
else
    echo "  ✗ Порт 3000 (frontend) свободен - frontend не запущен"
fi

echo ""
echo "✅ Проверка завершена!"


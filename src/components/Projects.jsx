import React from "react";

export default function Projects(){
  return (
    <div className="card">
      <h2>Проекты и достижения</h2>
      <ul className="highlights">
        <li>Создание микросервисов с нуля, интеграция через Kafka и RabbitMQ.</li>
        <li>Оптимизация PostgreSQL (индексы, materialized views), Liquibase миграции.</li>
        <li>Автоматизация CI/CD, SonarQube, мониторинг и алерты.</li>
        <li>Покрытие тестами >80% (JUnit, Mockito, Testcontainers).</li>
      </ul>
    </div>
  );
}

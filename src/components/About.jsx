import React from "react";

export default function About(){
  return (
    <div className="card">
      <h2>Кратко</h2>
      <p>Опыт разработки — 3 года 5 месяцев. Специализация: backend (Java, Spring Boot), микросервисная архитектура, оптимизация SQL и разработка REST API. Люблю чистую архитектуру (DDD, SOLID), покрытие тестами и автоматизацию CI/CD.</p>

      <div className="skills-grid">
        <div><strong>Языки:</strong> Java (8–21)</div>
        <div><strong>Технологии:</strong> Spring Boot, PostgreSQL, Kafka, Docker, Liquibase, JUnit</div>
        <div><strong>Инструменты:</strong> Git, Maven, Prometheus, Grafana</div>
      </div>
    </div>
  );
}

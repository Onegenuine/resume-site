import React from "react";

export default function Experience(){
  return (
    <div className="card">
      <h2>Опыт работы</h2>

      <div className="job">
        <h3>ООО «ПРО АЙ-ТИ РЕСУРС» — Старший разработчик</h3>
        <p className="period">Декабрь 2024 — настоящее время</p>
        <ul>
          <li>Оптимизация отчетных модулей: materialized views (PostgreSQL) — сокращение времени на 75%.</li>
          <li>Динамические Excel-отчёты, Liquibase миграции, рефакторинг legacy-кода.</li>
        </ul>
      </div>

      <div className="job">
        <h3>ООО «АЙТИКЬЮ ГРУПП» — Разработчик</h3>
        <p className="period">Апрель 2024 — Ноябрь 2024</p>
        <ul>
          <li>Employee-Profile сервис, REST API, интеграция с Redmine и Kafka.</li>
          <li>CI/CD, SonarQube, мониторинг Prometheus/Grafana, >80% тестов.</li>
        </ul>
      </div>

      <div className="job">
        <h3>IT-аутсорсинг — Java developer</h3>
        <p className="period">Май 2022 — Апрель 2024</p>
        <ul>
          <li>Разработка CRM и колл-центра, автотесты, багфиксы.</li>
        </ul>
      </div>
    </div>
  );
}

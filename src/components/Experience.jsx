import React from "react";
import { motion } from "framer-motion";

export default function Experience(){
  const jobVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Опыт работы
      </motion.h2>

      <motion.div 
        className="job"
        variants={jobVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2 }}
      >
        <h3>ООО «ПРО АЙ-ТИ РЕСУРС» — Старший разработчик</h3>
        <p className="period">Декабрь 2024 — настоящее время</p>
        <ul>
          <li>Оптимизация отчетных модулей: materialized views (PostgreSQL) — сокращение времени на 75%.</li>
          <li>Динамические Excel-отчёты, Liquibase миграции, рефакторинг legacy-кода.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="job"
        variants={jobVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.3 }}
      >
        <h3>ООО «АЙТИКЬЮ ГРУПП» — Разработчик</h3>
        <p className="period">Апрель 2024 — Ноябрь 2024</p>
        <ul>
          <li>Employee-Profile сервис, REST API, интеграция с Redmine и Kafka.</li>
          <li>CI/CD, SonarQube, мониторинг Prometheus/Grafana, >80% тестов.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="job"
        variants={jobVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.4 }}
      >
        <h3>IT-аутсорсинг — Java developer</h3>
        <p className="period">Май 2022 — Апрель 2024</p>
        <ul>
          <li>Разработка CRM и колл-центра, автотесты, багфиксы.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

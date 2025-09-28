import React from "react";
import { motion } from "framer-motion";

export default function About(){
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
        Кратко
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Опыт разработки — 3 года 5 месяцев. Специализация: backend (Java, Spring Boot), микросервисная архитектура, оптимизация SQL и разработка REST API. Чистая архитектура (DDD, SOLID), покрытие тестами и автоматизацию CI/CD.
      </motion.p>

      <motion.div 
        className="skills-grid"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <strong>Языки:</strong> Java (8–21)
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <strong>Технологии:</strong> Spring Boot, PostgreSQL, Kafka, Docker, Liquibase, JUnit
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <strong>Инструменты:</strong> Git, Maven, Prometheus, Grafana
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

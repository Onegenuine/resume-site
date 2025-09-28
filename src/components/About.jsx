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
          className="skill-category"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Языки программирования</h3>
          <div className="skill-tags">
            <span className="skill-tag">Java (8–21)</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="skill-category"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>Backend технологии</h3>
          <div className="skill-tags">
            <span className="skill-tag">Spring Boot</span>
            <span className="skill-tag">Spring Web</span>
            <span className="skill-tag">Spring Security</span>
            <span className="skill-tag">Spring Data</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="skill-category"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Базы данных</h3>
          <div className="skill-tags">
            <span className="skill-tag">PostgreSQL</span>
            <span className="skill-tag">H2</span>
            <span className="skill-tag">Оптимизация SQL</span>
            <span className="skill-tag">Индексация</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="skill-category"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h3>Инфраструктура</h3>
          <div className="skill-tags">
            <span className="skill-tag">Docker</span>
            <span className="skill-tag">Docker Compose</span>
            <span className="skill-tag">Kafka</span>
            <span className="skill-tag">RabbitMQ</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="skill-category"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Инструменты разработки</h3>
          <div className="skill-tags">
            <span className="skill-tag">Maven</span>
            <span className="skill-tag">Git</span>
            <span className="skill-tag">GitLab CI/CD</span>
            <span className="skill-tag">GitHub Actions</span>
            <span className="skill-tag">Liquibase</span>
            <span className="skill-tag">Swagger</span>
            <span className="skill-tag">OpenAPI</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="skill-category"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <h3>Тестирование и мониторинг</h3>
          <div className="skill-tags">
            <span className="skill-tag">JUnit</span>
            <span className="skill-tag">Mockito</span>
            <span className="skill-tag">Testcontainers</span>
            <span className="skill-tag">Prometheus</span>
            <span className="skill-tag">Grafana</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

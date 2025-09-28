import React from "react";
import { motion } from "framer-motion";

export default function Projects(){
  const highlightVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
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
        Проекты и достижения
      </motion.h2>
      <motion.ul 
        className="highlights"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.li 
          variants={highlightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Создание микросервисов с нуля, интеграция через Kafka и RabbitMQ.
        </motion.li>
        <motion.li 
          variants={highlightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Оптимизация PostgreSQL (индексы, materialized views), Liquibase миграции.
        </motion.li>
        <motion.li 
          variants={highlightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Автоматизация CI/CD, SonarQube, мониторинг и алерты.
        </motion.li>
        <motion.li 
          variants={highlightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Покрытие тестами >80% (JUnit, Mockito, Testcontainers).
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}

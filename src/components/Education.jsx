import React from "react";
import { motion } from "framer-motion";

export default function Education(){
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
        Образование и курсы
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <strong>ФГБОУ ВО "Ивановская пожарно-спасательная академия ГПС МЧС России"</strong> — Пожарная безопасность (2019)
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <strong>Курсы:</strong> Яндекс Практикум (Java), Microarch (2025), Spring, JUnit, Hibernate и др.
      </motion.p>
    </motion.div>
  );
}

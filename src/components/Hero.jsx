import React from "react";
import { motion } from "framer-motion";

export default function Hero(){
  return (
    <div className="hero-card">
      <motion.div 
        className="hero-content"
        initial={{y:20, opacity:0}} 
        animate={{y:0, opacity:1}} 
        transition={{duration:0.6}}
      >
        <motion.h1 
          initial={{y:20, opacity:0}} 
          animate={{y:0, opacity:1}} 
          transition={{duration:0.6}}
        >
          Фалалеев Вячеслав
        </motion.h1>
        
        <motion.p 
          className="subtitle" 
          initial={{y:10, opacity:0}} 
          animate={{y:0, opacity:1}} 
          transition={{delay:0.2, duration:0.5}}
        >
          Java-разработчик • Backend
        </motion.p>

        <motion.div 
          className="hero-description"
          initial={{y:10, opacity:0}} 
          animate={{y:0, opacity:1}} 
          transition={{delay:0.3, duration:0.5}}
        >
          <p>Опытный backend-разработчик с фокусом на Java и Spring Boot. Специализируюсь на создании масштабируемых микросервисных архитектур и оптимизации производительности.</p>
        </motion.div>

        <motion.div 
          className="hero-cta" 
          initial={{opacity:0, y:10}} 
          animate={{opacity:1, y:0}} 
          transition={{delay:0.4, duration:0.5}}
        >
          <a className="btn primary" href="tel:+79128231829">
            <span>📞</span>
            Позвонить
          </a>
          <a className="btn ghost" href="mailto:falaleev.fol@mail.ru">
            <span>✉️</span>
            Написать
          </a>
        </motion.div>

        <motion.div 
          className="hero-meta"
          initial={{opacity:0}} 
          animate={{opacity:1}} 
          transition={{delay:0.5, duration:0.5}}
        >
          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span>Москва</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🚀</span>
            <span>Готов к переезду</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">💰</span>
            <span>250 000 ₽ netto</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

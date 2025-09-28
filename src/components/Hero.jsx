import React from "react";
import { motion } from "framer-motion";

export default function Hero(){
  return (
    <div className="hero-card">
      <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.6}}>
        Фалалеев Вячеслав
      </motion.h1>
      <motion.p className="subtitle" initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.12}}>
        Java-разработчик • Backend • Microservices
      </motion.p>

      <motion.div className="hero-cta" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
        <a className="btn" href="tel:+79128231829">Позвонить</a>
        <a className="btn ghost" href="mailto:falaleev.fol@mail.ru">Написать</a>
      </motion.div>

      <div className="hero-meta">Москва · Готов к переезду · 250 000 ₽ netto</div>
    </div>
  );
}

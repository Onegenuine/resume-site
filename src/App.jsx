import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import AnimatedBackground from "./components/AnimatedBackground";

export default function App(){
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-root">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Progress Bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX }}
      />

      <header className="topbar">
        <motion.div 
          className="brand"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Vyacheslav • Java
        </motion.div>
        <nav className="nav">
          <motion.a 
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            Обо мне
          </motion.a>
          <motion.a 
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            Проекты
          </motion.a>
          <motion.a 
            href="#experience"
            className={activeSection === 'experience' ? 'active' : ''}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            Опыт
          </motion.a>
          <motion.a 
            href="#contact" 
            className={`cta ${activeSection === 'contact' ? 'active' : ''}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Связаться
          </motion.a>
        </nav>
      </header>

      <main className="sections">
        <section id="hero" className="panel">
          <Hero />
        </section>
        <section id="about" className="panel">
          <About />
        </section>
        <section id="experience" className="panel">
          <Experience />
        </section>
        <section id="projects" className="panel">
          <Projects />
        </section>
        <section id="education" className="panel">
          <Education />
        </section>
        <section id="contact" className="panel">
          <Contact />
        </section>
      </main>

      <motion.footer 
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} Фалалеев Вячеслав — Java-разработчик
      </motion.footer>
    </div>
  );
}

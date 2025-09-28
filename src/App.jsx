import React from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function App(){
  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">Vyacheslav • Java</div>
        <nav className="nav">
          <a href="#projects">Проекты</a>
          <a href="#experience">Опыт</a>
          <a href="#contact" className="cta">Связаться</a>
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

      <footer className="footer">© {new Date().getFullYear()} Фалалеев Вячеслав — Java-разработчик</footer>
    </div>
  );
}

import React from "react";

export default function Contact(){
  return (
    <div className="card">
      <h2>Контакты</h2>
      <p>Телефон: <a href="tel:+79128231829">+7 (912) 823-18-29</a></p>
      <p>Email: <a href="mailto:falaleev.fol@mail.ru">falaleev.fol@mail.ru</a></p>
      <p>Город: Москва · Готов к переезду</p>

      <div className="links">
        <a className="chip" href="#" target="_blank" rel="noreferrer">GitHub</a>
        <a className="chip" href="#" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="chip" href="https://goszakaz2.permkrai.ru/open/" target="_blank" rel="noreferrer">Пример проекта</a>
      </div>

      <div className="download-area" style={{marginTop:12}}>
        <a className="btn" href="/resume.pdf" download>Скачать PDF</a>
      </div>
    </div>
  );
}

import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Topics from './components/Topics'
import Questions from './components/Questions'
import Review from './components/Review'
import Statistics from './components/Statistics'
import AlgorithmInfo from './components/AlgorithmInfo'
import Profile from './components/Profile'
import Battle from './components/Battle'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              📚 Flashcard App
            </Link>
            <div className="nav-links">
              <Link to="/topics" className="nav-link">Темы</Link>
              <Link to="/questions" className="nav-link">Вопросы</Link>
              <Link to="/review" className="nav-link">Повторение</Link>
              <Link to="/battle" className="nav-link">⚔️ Битвы</Link>
              <Link to="/profile" className="nav-link">Профиль</Link>
              <Link to="/statistics" className="nav-link">Статистика</Link>
              <Link to="/algorithm" className="nav-link">Об алгоритме</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/review" element={<Review />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/algorithm" element={<AlgorithmInfo />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">Добро пожаловать в Flashcard App!</h1>
        <p className="home-subtitle">Эффективное повторение материала с использованием методики интервального повторения (SM-2)</p>
      </div>

      <div className="home-blocks">
        <div 
          className="home-block home-block-large home-block-topics"
          onClick={() => navigate('/topics')}
        >
          <div className="block-image">
            <img 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&q=80" 
              alt="Книги и знания"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad1)"/>
              <rect x="120" y="60" width="80" height="120" rx="6" fill="white" opacity="0.9"/>
              <rect x="200" y="80" width="80" height="120" rx="6" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div className="block-icon">📖</div>
          <h2>Темы</h2>
          <p>Организуйте вопросы по темам для удобного управления и структурирования материала</p>
          <div className="block-features">
            <span>✓ Создание тем</span>
            <span>✓ Редактирование</span>
            <span>✓ Управление</span>
          </div>
          <button className="block-btn">Перейти к темам →</button>
        </div>

        <div 
          className="home-block home-block-large home-block-questions"
          onClick={() => navigate('/questions')}
        >
          <div className="block-image">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80" 
              alt="Мозг и интеллект"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#f093fb', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#f5576c', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad2)"/>
            </svg>
          </div>
          <div className="block-icon">❓</div>
          <h2>Вопросы</h2>
          <p>Добавляйте и редактируйте вопросы с вариантами ответов. Загружайте вопросы массово из файлов</p>
          <div className="block-features">
            <span>✓ Добавление вопросов</span>
            <span>✓ Варианты ответов</span>
            <span>✓ Загрузка из файла</span>
          </div>
          <button className="block-btn">Управление вопросами →</button>
        </div>

        <div 
          className="home-block home-block-large home-block-review"
          onClick={() => navigate('/review')}
        >
          <div className="block-image">
            <img 
              src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop&q=80" 
              alt="Обучение и развитие"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
              <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#4facfe', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#00f2fe', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad3)"/>
            </svg>
          </div>
          <div className="block-icon">🔄</div>
          <h2>Повторение</h2>
          <p>Повторяйте материал по алгоритму интервального повторения SM-2 для максимальной эффективности запоминания</p>
          <div className="block-features">
            <span>✓ Алгоритм SM-2</span>
            <span>✓ Оценка качества</span>
            <span>✓ Статистика</span>
          </div>
          <button className="block-btn">Начать повторение →</button>
        </div>
      </div>

      <div className="home-info">
        <div className="info-card" onClick={() => navigate('/statistics')} style={{ cursor: 'pointer' }}>
          <h3>📊 Статистика</h3>
          <p>Отслеживайте свой прогресс, количество повторений и точность ответов в реальном времени.</p>
        </div>
        <div className="info-card" onClick={() => navigate('/algorithm')} style={{ cursor: 'pointer' }}>
          <h3>🧠 Алгоритм SM-2</h3>
          <p>Узнайте больше о научно обоснованном методе интервального повторения для эффективного запоминания.</p>
        </div>
        <div className="info-card">
          <h3>📁 Массовая загрузка</h3>
          <p>Загружайте вопросы из текстовых файлов или Excel. Подробности в разделе "Вопросы".</p>
        </div>
      </div>
    </div>
  )
}

export default App


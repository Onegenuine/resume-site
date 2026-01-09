import React, { useState, useEffect } from 'react'
import { questionsAPI, topicsAPI } from '../services/api'
import FormattedText from './FormattedText'
import '../App.css'

function Review() {
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [stats, setStats] = useState({ total: 0, reviewed: 0, correct: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTopics()
  }, [])

  const loadTopics = async () => {
    try {
      const response = await topicsAPI.getAll()
      setTopics(response.data)
    } catch (error) {
      console.error('Error loading topics:', error)
    }
  }

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const topicId = selectedTopic ? Number(selectedTopic) : null
      const response = await questionsAPI.getForReview(topicId)
      
      // Дополнительно перемешиваем на клиенте для большей случайности
      const shuffled = [...response.data].sort(() => Math.random() - 0.5)
      
      setQuestions(shuffled)
      setCurrentIndex(0)
      setSelectedOption(null)
      setShowAnswer(false)
      setStats({ total: shuffled.length, reviewed: 0, correct: 0 })
    } catch (error) {
      console.error('Error loading questions:', error)
      alert('Ошибка загрузки вопросов для повторения')
    } finally {
      setLoading(false)
    }
  }

  const handleStartReview = () => {
    if (questions.length === 0) {
      loadQuestions()
    } else {
      setCurrentIndex(0)
      setSelectedOption(null)
      setShowAnswer(false)
    }
  }

  const handleOptionSelect = (option) => {
    if (showAnswer) return
    setSelectedOption(option)
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handleQualitySubmit = async (quality) => {
    if (!questions[currentIndex]) return

    const isCorrect = quality >= 3
    const newStats = {
      ...stats,
      reviewed: stats.reviewed + 1,
      correct: isCorrect ? stats.correct + 1 : stats.correct,
    }
    setStats(newStats)

    try {
      await questionsAPI.review({
        questionId: questions[currentIndex].id,
        quality: quality,
        isCorrect: isCorrect,
      })

      // Move to next question
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSelectedOption(null)
        setShowAnswer(false)
      } else {
        // All questions reviewed
        alert('Все вопросы просмотрены! Отличная работа!')
        loadQuestions()
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Ошибка сохранения результата')
    }
  }

  const currentQuestion = questions[currentIndex]

  if (loading) {
    return <div className="card">Загрузка вопросов...</div>
  }

  if (questions.length === 0 && !loading) {
    return (
      <div className="card">
        <h2>Повторение материала</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label>Выберите тему (опционально):</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '5px', marginLeft: '0.5rem', minWidth: '200px' }}
          >
            <option value="">Все темы</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={loadQuestions}>
          Начать повторение
        </button>
        <p style={{ marginTop: '1rem', color: '#666' }}>
          Вопросы для повторения выбираются на основе алгоритма интервального повторения (SM-2).
          Вопросы, которые нужно повторить, отображаются в зависимости от последнего времени повторения и уровня сложности.
        </p>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="card">
        <h2>Все вопросы просмотрены!</h2>
        <button className="btn btn-primary" onClick={loadQuestions}>
          Загрузить еще вопросы
        </button>
      </div>
    )
  }

  const hasOptions = currentQuestion.options && currentQuestion.options.length > 0
  const isCorrect = selectedOption === currentQuestion.correctAnswer || 
                   (hasOptions && currentQuestion.options[selectedOption] === currentQuestion.correctAnswer)

  return (
    <div>
      <div className="review-stats">
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Всего</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.reviewed}</div>
          <div className="stat-label">Просмотрено</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.correct}</div>
          <div className="stat-label">Правильно</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            {stats.reviewed > 0 ? Math.round((stats.correct / stats.reviewed) * 100) : 0}%
          </div>
          <div className="stat-label">Точность</div>
        </div>
      </div>

      <div className="review-card">
        <div style={{ marginBottom: '1rem', color: '#666' }}>
          Вопрос {currentIndex + 1} из {questions.length}
        </div>
        {currentQuestion.imageUrl && (
          <div className="review-image">
            <img src={currentQuestion.imageUrl} alt="Question" onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}
        <div className="review-question">
          <FormattedText text={currentQuestion.questionText} />
        </div>

        {hasOptions && !showAnswer && (
          <div className="review-options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {!showAnswer && (
          <button className="btn btn-primary" onClick={handleShowAnswer} style={{ marginTop: '1rem' }}>
            Показать ответ
          </button>
        )}

        {showAnswer && (
          <div className="review-answer">
            <strong>Правильный ответ:</strong>
            <FormattedText text={currentQuestion.correctAnswer} />
            {hasOptions && selectedOption !== null && (
              <div style={{ marginTop: '1rem' }}>
                {isCorrect ? (
                  <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Правильно!</span>
                ) : (
                  <span style={{ color: '#dc3545', fontWeight: 'bold' }}>✗ Неправильно</span>
                )}
              </div>
            )}
          </div>
        )}

        {showAnswer && (
          <div className="quality-buttons">
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Оцените, насколько хорошо вы знаете этот материал:
            </p>
            <button
              className="quality-btn quality-0"
              onClick={() => handleQualitySubmit(0)}
            >
              0 - Не знаю
            </button>
            <button
              className="quality-btn quality-1"
              onClick={() => handleQualitySubmit(1)}
            >
              1 - Очень плохо
            </button>
            <button
              className="quality-btn quality-2"
              onClick={() => handleQualitySubmit(2)}
            >
              2 - Плохо
            </button>
            <button
              className="quality-btn quality-3"
              onClick={() => handleQualitySubmit(3)}
            >
              3 - Нормально
            </button>
            <button
              className="quality-btn quality-4"
              onClick={() => handleQualitySubmit(4)}
            >
              4 - Хорошо
            </button>
            <button
              className="quality-btn quality-5"
              onClick={() => handleQualitySubmit(5)}
            >
              5 - Отлично
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Review


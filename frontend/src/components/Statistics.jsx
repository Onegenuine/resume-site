import React, { useState, useEffect } from 'react'
import { questionsAPI, topicsAPI } from '../services/api'
import '../App.css'

function Statistics() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalTopics: 0,
    totalReviews: 0,
    averageReviewCount: 0,
    questionsReviewedToday: 0,
    questionsDue: 0,
    accuracy: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const [questionsRes, topicsRes, reviewRes] = await Promise.all([
        questionsAPI.getAll(),
        topicsAPI.getAll(),
        questionsAPI.getForReview()
      ])

      const questions = questionsRes.data
      const topics = topicsRes.data
      const questionsForReview = reviewRes.data

      const totalReviews = questions.reduce((sum, q) => sum + (q.reviewCount || 0), 0)
      const averageReviewCount = questions.length > 0 ? (totalReviews / questions.length).toFixed(1) : 0
      
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const questionsReviewedToday = questions.filter(q => {
        if (!q.lastReviewed) return false
        const reviewDate = new Date(q.lastReviewed)
        reviewDate.setHours(0, 0, 0, 0)
        return reviewDate.getTime() === today.getTime()
      }).length

      // Подсчет точности (примерно, на основе difficultyLevel)
      const reviewedQuestions = questions.filter(q => q.reviewCount > 0)
      const averageDifficulty = reviewedQuestions.length > 0
        ? reviewedQuestions.reduce((sum, q) => sum + (q.difficultyLevel || 0), 0) / reviewedQuestions.length
        : 0
      const accuracy = Math.round((averageDifficulty / 5) * 100)

      setStats({
        totalQuestions: questions.length,
        totalTopics: topics.length,
        totalReviews: totalReviews,
        averageReviewCount: averageReviewCount,
        questionsReviewedToday: questionsReviewedToday,
        questionsDue: questionsForReview.length,
        accuracy: accuracy
      })
    } catch (error) {
      console.error('Error loading statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="card">Загрузка статистики...</div>
  }

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">📊 Статистика</h2>
      
      <div className="statistics-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">❓</div>
          <div className="stat-value">{stats.totalQuestions}</div>
          <div className="stat-label">Всего вопросов</div>
        </div>

        <div className="stat-card stat-card-secondary">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{stats.totalTopics}</div>
          <div className="stat-label">Тем</div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">🔄</div>
          <div className="stat-value">{stats.totalReviews}</div>
          <div className="stat-label">Всего повторений</div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon">📈</div>
          <div className="stat-value">{stats.averageReviewCount}</div>
          <div className="stat-label">Среднее повторений</div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.questionsReviewedToday}</div>
          <div className="stat-label">Просмотрено сегодня</div>
        </div>

        <div className="stat-card stat-card-danger">
          <div className="stat-icon">⏰</div>
          <div className="stat-value">{stats.questionsDue}</div>
          <div className="stat-label">К повторению</div>
        </div>

        <div className="stat-card stat-card-gradient">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{stats.accuracy}%</div>
          <div className="stat-label">Точность</div>
        </div>
      </div>
    </div>
  )
}

export default Statistics


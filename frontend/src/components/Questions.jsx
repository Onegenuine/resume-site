import React, { useState, useEffect } from 'react'
import { questionsAPI, topicsAPI } from '../services/api'
import FormattedText from './FormattedText'
import '../App.css'

function Questions() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [sortBy, setSortBy] = useState('none') // none, text, topic, lastReviewed, reviewCount, createdAt
  const [sortOrder, setSortOrder] = useState('asc') // asc, desc
  const [groupBy, setGroupBy] = useState('none') // none, topic, lastReviewed, reviewCount
  const [formData, setFormData] = useState({
    questionText: '',
    correctAnswer: '',
    options: [],
    imageUrl: '',
  })
  const [newOption, setNewOption] = useState('')
  const [uploadTopicId, setUploadTopicId] = useState('')
  const [uploadFile, setUploadFile] = useState(null)

  useEffect(() => {
    loadTopics()
    loadQuestions()
  }, [])

  const loadTopics = async () => {
    try {
      const response = await topicsAPI.getAll()
      setTopics(response.data)
    } catch (error) {
      console.error('Error loading topics:', error)
    }
  }

  const loadQuestions = async (topicId = null) => {
    try {
      const response = await questionsAPI.getAll(topicId)
      setQuestions(response.data)
      applyFiltersAndSort(response.data)
    } catch (error) {
      console.error('Error loading questions:', error)
      alert('Ошибка загрузки вопросов')
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = (questionsToProcess = questions) => {
    let processed = [...questionsToProcess]

    // Сортировка
    if (sortBy !== 'none') {
      processed.sort((a, b) => {
        let aValue, bValue

        switch (sortBy) {
          case 'text':
            aValue = a.questionText.toLowerCase()
            bValue = b.questionText.toLowerCase()
            break
          case 'topic':
            aValue = a.topicName || ''
            bValue = b.topicName || ''
            break
          case 'lastReviewed':
            aValue = a.lastReviewed ? new Date(a.lastReviewed).getTime() : 0
            bValue = b.lastReviewed ? new Date(b.lastReviewed).getTime() : 0
            break
          case 'reviewCount':
            aValue = a.reviewCount || 0
            bValue = b.reviewCount || 0
            break
          case 'createdAt':
            aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0
            bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0
            break
          default:
            return 0
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    setFilteredQuestions(processed)
  }

  useEffect(() => {
    if (questions.length > 0) {
      applyFiltersAndSort()
    }
  }, [sortBy, sortOrder, groupBy, questions])

  const handleTopicFilter = (e) => {
    const topicId = e.target.value ? Number(e.target.value) : null
    setSelectedTopic(e.target.value)
    loadQuestions(topicId)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value)
  }

  const groupQuestions = (questionsToGroup) => {
    if (groupBy === 'none') {
      return { 'Все вопросы': questionsToGroup }
    }

    const groups = {}

    questionsToGroup.forEach(question => {
      let groupKey = 'Без группы'

      switch (groupBy) {
        case 'topic':
          groupKey = question.topicName || 'Без темы'
          break
        case 'lastReviewed':
          if (question.lastReviewed) {
            const date = new Date(question.lastReviewed)
            const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
            if (daysAgo === 0) groupKey = 'Сегодня'
            else if (daysAgo === 1) groupKey = 'Вчера'
            else if (daysAgo < 7) groupKey = 'На этой неделе'
            else if (daysAgo < 30) groupKey = 'В этом месяце'
            else groupKey = 'Более месяца назад'
          } else {
            groupKey = 'Никогда не просматривалось'
          }
          break
        case 'reviewCount':
          const count = question.reviewCount || 0
          if (count === 0) groupKey = 'Не просматривалось'
          else if (count < 5) groupKey = '1-4 раза'
          else if (count < 10) groupKey = '5-9 раз'
          else groupKey = '10+ раз'
          break
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(question)
    })

    return groups
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.topicId) {
      alert('Выберите тему')
      return
    }
    try {
      const data = {
        ...formData,
        topicId: Number(formData.topicId),
      }
      if (editingQuestion) {
        await questionsAPI.update(editingQuestion.id, data)
      } else {
        await questionsAPI.create(data)
      }
      setShowModal(false)
      setEditingQuestion(null)
      resetForm()
      loadQuestions(selectedTopic ? Number(selectedTopic) : null)
    } catch (error) {
      console.error('Error saving question:', error)
      alert('Ошибка сохранения вопроса: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleEdit = (question) => {
    setEditingQuestion(question)
    setFormData({
      questionText: question.questionText,
      correctAnswer: question.correctAnswer,
      options: [...(question.options || [])],
      topicId: question.topicId,
      imageUrl: question.imageUrl || '',
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот вопрос?')) {
      return
    }
    try {
      await questionsAPI.delete(id)
      loadQuestions(selectedTopic ? Number(selectedTopic) : null)
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Ошибка удаления вопроса')
    }
  }

  const resetForm = () => {
    setFormData({
      questionText: '',
      correctAnswer: '',
      options: [],
      topicId: '',
      imageUrl: '',
    })
    setNewOption('')
  }

  const openAddModal = () => {
    setEditingQuestion(null)
    resetForm()
    setShowModal(true)
  }

  const addOption = () => {
    if (newOption.trim()) {
      setFormData({
        ...formData,
        options: [...formData.options, newOption.trim()],
      })
      setNewOption('')
    }
  }

  const removeOption = (index) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index),
    })
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    if (!uploadTopicId || !uploadFile) {
      alert('Выберите тему и файл')
      return
    }
    try {
      const response = await questionsAPI.upload(uploadFile, Number(uploadTopicId))
      alert(`Успешно загружено ${response.data.importedCount} вопросов`)
      setUploadFile(null)
      setUploadTopicId('')
      loadQuestions(selectedTopic ? Number(selectedTopic) : null)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Ошибка загрузки файла: ' + (error.response?.data?.error || error.message))
    }
  }

  if (loading) {
    return <div className="card">Загрузка...</div>
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Вопросы</h2>
          <button className="btn btn-primary" onClick={openAddModal}>
            + Добавить вопрос
          </button>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Фильтр по теме:</label>
            <select
              value={selectedTopic}
              onChange={handleTopicFilter}
              className="filter-select"
            >
              <option value="">Все темы</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Сортировка:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="none">Без сортировки</option>
              <option value="text">По тексту вопроса</option>
              <option value="topic">По теме</option>
              <option value="lastReviewed">По дате просмотра</option>
              <option value="reviewCount">По количеству повторений</option>
              <option value="createdAt">По дате создания</option>
            </select>
            {sortBy !== 'none' && (
              <button
                className="sort-order-btn"
                onClick={handleSortOrderToggle}
                title={sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            )}
          </div>

          <div className="filter-group">
            <label>Группировка:</label>
            <select
              value={groupBy}
              onChange={handleGroupByChange}
              className="filter-select"
            >
              <option value="none">Без группировки</option>
              <option value="topic">По теме</option>
              <option value="lastReviewed">По дате просмотра</option>
              <option value="reviewCount">По количеству повторений</option>
            </select>
          </div>
        </div>

        <div className="file-upload">
          <h3>Загрузить вопросы из файла</h3>
          <form onSubmit={handleFileUpload}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Тема: </label>
              <select
                value={uploadTopicId}
                onChange={(e) => setUploadTopicId(e.target.value)}
                required
                style={{ padding: '0.5rem', borderRadius: '5px', marginLeft: '0.5rem' }}
              >
                <option value="">Выберите тему</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="file"
              accept=".txt"
              onChange={(e) => setUploadFile(e.target.files[0])}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Загрузить
            </button>
          </form>
          <div className="file-format-info">
            <strong>Формат файла:</strong>
            <code>
              Q: Текст вопроса<br />
              A: Правильный ответ<br />
              O: Вариант ответа 1<br />
              O: Вариант ответа 2<br />
              <br />
              Q: Следующий вопрос<br />
              ...
            </code>
          </div>
        </div>

        {(() => {
          const grouped = groupQuestions(filteredQuestions)
          const groupKeys = Object.keys(grouped)

          if (filteredQuestions.length === 0) {
            return (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>Нет вопросов. Добавьте первый вопрос!</p>
              </div>
            )
          }

          return groupKeys.map((groupKey) => (
            <div key={groupKey} className="question-group">
              {groupBy !== 'none' && (
                <div className="group-header">
                  <h3>{groupKey}</h3>
                  <span className="group-count">{grouped[groupKey].length}</span>
                </div>
              )}
              <div className="questions-grid">
                {grouped[groupKey].map((question) => {
              const lastReviewed = question.lastReviewed 
                ? new Date(question.lastReviewed)
                : null;
              const timeSinceReview = lastReviewed 
                ? Math.floor((Date.now() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24))
                : null;
              
              // Цветовая индикация времени последнего просмотра
              let timeColor = '#999';
              let timeLabel = 'Никогда';
              if (timeSinceReview !== null) {
                if (timeSinceReview === 0) {
                  timeColor = '#28a745';
                  timeLabel = 'Сегодня';
                } else if (timeSinceReview === 1) {
                  timeColor = '#17a2b8';
                  timeLabel = 'Вчера';
                } else if (timeSinceReview < 7) {
                  timeColor = '#ffc107';
                  timeLabel = `${timeSinceReview} дн. назад`;
                } else if (timeSinceReview < 30) {
                  timeColor = '#fd7e14';
                  timeLabel = `${timeSinceReview} дн. назад`;
                } else {
                  timeColor = '#dc3545';
                  timeLabel = `${timeSinceReview} дн. назад`;
                }
              }
              
              return (
                <div key={question.id} className="question-card">
                  <div className="question-card-header">
                    <div className="question-topic-badge">{question.topicName}</div>
                    <div className="question-stats">
                      <span className="stat-badge">🔄 {question.reviewCount || 0}</span>
                      {question.options?.length > 0 && (
                        <span className="stat-badge">📋 {question.options.length}</span>
                      )}
                    </div>
                  </div>
                  {question.imageUrl && (
                    <div className="question-image-preview">
                      <img src={question.imageUrl} alt="Question" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                  <div className="question-text">
                    <FormattedText text={question.questionText} />
                  </div>
                  <div className="question-card-footer">
                    <div className="last-reviewed" style={{ color: timeColor }}>
                      <span className="time-dot" style={{ backgroundColor: timeColor }}></span>
                      {timeLabel}
                    </div>
                    <div className="question-actions">
                      <button
                        className="btn-icon"
                        onClick={() => handleEdit(question)}
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon btn-icon-danger"
                        onClick={() => handleDelete(question.id)}
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
                })}
              </div>
            </div>
          ))
        })()}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingQuestion ? 'Редактировать вопрос' : 'Добавить вопрос'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Тема *</label>
                <select
                  value={formData.topicId}
                  onChange={(e) => setFormData({ ...formData, topicId: e.target.value })}
                  required
                >
                  <option value="">Выберите тему</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Вопрос *</label>
                <textarea
                  value={formData.questionText}
                  onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                  placeholder="Поддерживается Markdown форматирование:
- **жирный текст**
- *курсив*
- Списки
- `код`
- [ссылки](url)"
                  required
                  rows={6}
                />
                <div className="form-preview" style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.9rem', color: '#666' }}>
                  <strong>Превью:</strong>
                  <FormattedText text={formData.questionText || '*Введите текст для предпросмотра*'} />
                </div>
              </div>
              <div className="form-group">
                <label>Правильный ответ *</label>
                <textarea
                  value={formData.correctAnswer}
                  onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  placeholder="Поддерживается Markdown форматирование"
                  required
                  rows={4}
                />
                <div className="form-preview" style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.9rem', color: '#666' }}>
                  <strong>Превью:</strong>
                  <FormattedText text={formData.correctAnswer || '*Введите текст для предпросмотра*'} />
                </div>
              </div>
              <div className="form-group">
                <label>Варианты ответов (опционально)</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Добавить вариант ответа"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOption())}
                  />
                  <button type="button" className="btn btn-secondary" onClick={addOption}>
                    Добавить
                  </button>
                </div>
                <ul className="options-list">
                  {formData.options.map((option, index) => (
                    <li key={index}>
                      <span>{option}</span>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeOption(index)}
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="form-group">
                <label>URL изображения (опционально)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.imageUrl && (
                  <div className="image-preview" style={{ marginTop: '1rem' }}>
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'block'
                      }}
                    />
                    <div style={{ display: 'none', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', color: '#666' }}>
                      Не удалось загрузить изображение
                    </div>
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Сохранить
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Questions


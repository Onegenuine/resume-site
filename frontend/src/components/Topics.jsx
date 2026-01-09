import React, { useState, useEffect } from 'react'
import { topicsAPI } from '../services/api'
import '../App.css'

function Topics() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTopic, setEditingTopic] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    loadTopics()
  }, [])

  const loadTopics = async () => {
    try {
      const response = await topicsAPI.getAll()
      setTopics(response.data)
    } catch (error) {
      console.error('Error loading topics:', error)
      alert('Ошибка загрузки тем')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTopic) {
        await topicsAPI.update(editingTopic.id, formData)
      } else {
        await topicsAPI.create(formData)
      }
      setShowModal(false)
      setEditingTopic(null)
      setFormData({ name: '', description: '' })
      loadTopics()
    } catch (error) {
      console.error('Error saving topic:', error)
      alert('Ошибка сохранения темы: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleEdit = (topic) => {
    setEditingTopic(topic)
    setFormData({ name: topic.name, description: topic.description || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту тему?')) {
      return
    }
    try {
      await topicsAPI.delete(id)
      loadTopics()
    } catch (error) {
      console.error('Error deleting topic:', error)
      alert('Ошибка удаления темы')
    }
  }

  const openAddModal = () => {
    setEditingTopic(null)
    setFormData({ name: '', description: '' })
    setShowModal(true)
  }

  if (loading) {
    return <div className="card">Загрузка...</div>
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Темы</h2>
          <button className="btn btn-primary" onClick={openAddModal}>
            + Добавить тему
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Вопросов</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {topics.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  Нет тем. Добавьте первую тему!
                </td>
              </tr>
            ) : (
              topics.map((topic) => (
                <tr key={topic.id}>
                  <td>{topic.name}</td>
                  <td>{topic.description || '-'}</td>
                  <td>{topic.questionCount || 0}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(topic)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Редактировать
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(topic.id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingTopic ? 'Редактировать тему' : 'Добавить тему'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Название *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
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

export default Topics


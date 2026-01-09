import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormattedText from './FormattedText'
import '../App.css'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    bio: '',
    avatarUrl: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:8080/api/profiles/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          username: data.username || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          bio: data.bio || '',
          avatarUrl: data.avatarUrl || ''
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:8080/api/profiles/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        await loadProfile()
        setEditing(false)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  if (loading) {
    return <div className="card">Загрузка профиля...</div>
  }

  if (!profile) {
    return <div className="card">Профиль не найден</div>
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.username} />
            ) : (
              <div className="avatar-placeholder">
                {profile.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{profile.username}</h1>
            {profile.firstName || profile.lastName ? (
              <p className="profile-name">{profile.firstName} {profile.lastName}</p>
            ) : null}
            {profile.bio && (
              <div className="profile-bio">
                <FormattedText text={profile.bio} />
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
            {editing ? 'Отмена' : 'Редактировать'}
          </button>
        </div>

        {editing ? (
          <div className="profile-edit">
            <div className="form-group">
              <label>Имя пользователя</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>О себе</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="Поддерживается Markdown"
              />
            </div>
            <div className="form-group">
              <label>URL аватара</label>
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        ) : (
          <div className="profile-stats">
            <div className="stat-grid">
              <div className="stat-item">
                <div className="stat-value">{profile.totalQuestions || 0}</div>
                <div className="stat-label">Вопросов</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{profile.totalReviews || 0}</div>
                <div className="stat-label">Повторений</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{profile.battlesWon || 0}</div>
                <div className="stat-label">Побед</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{profile.battlesLost || 0}</div>
                <div className="stat-label">Поражений</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{Math.round(profile.winRate || 0)}%</div>
                <div className="stat-label">Винрейт</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{Math.round(profile.accuracy || 0)}%</div>
                <div className="stat-label">Точность</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{profile.currentStreak || 0}</div>
                <div className="stat-label">Серия</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Уровень {profile.level || 1}</div>
                <div className="stat-label">{profile.experience || 0} опыта</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile


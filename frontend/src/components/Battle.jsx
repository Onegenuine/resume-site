import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Battle() {
  const [battles, setBattles] = useState([])
  const [availableBattles, setAvailableBattles] = useState([])
  const [currentBattle, setCurrentBattle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadMyBattles()
    loadAvailableBattles()
    loadTopics()
  }, [])

  const loadMyBattles = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:8080/api/battles/my', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setBattles(data)
      }
    } catch (error) {
      console.error('Error loading battles:', error)
    }
  }

  const loadAvailableBattles = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/battles/available?topicId=${selectedTopic || ''}`)
      if (response.ok) {
        const data = await response.json()
        setAvailableBattles(data)
      }
    } catch (error) {
      console.error('Error loading available battles:', error)
    }
  }

  const loadTopics = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/topics')
      if (response.ok) {
        const data = await response.json()
        setTopics(data)
      }
    } catch (error) {
      console.error('Error loading topics:', error)
    }
  }

  const createBattle = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:8080/api/battles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          topicId: selectedTopic ? Number(selectedTopic) : null,
          questionCount: 10
        })
      })
      if (response.ok) {
        const battle = await response.json()
        setCurrentBattle(battle)
        loadAvailableBattles()
      }
    } catch (error) {
      console.error('Error creating battle:', error)
    } finally {
      setLoading(false)
    }
  }

  const joinBattle = async (battleId) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(`http://localhost:8080/api/battles/${battleId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const battle = await response.json()
        setCurrentBattle(battle)
        loadAvailableBattles()
      }
    } catch (error) {
      console.error('Error joining battle:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card">
        <h2>⚔️ Битвы</h2>
        <p>Соревнуйтесь с другими пользователями в викторинах!</p>

        <div className="battle-controls">
          <div className="form-group">
            <label>Тема (опционально):</label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value)
                loadAvailableBattles()
              }}
              className="filter-select"
            >
              <option value="">Любая тема</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={createBattle} disabled={loading}>
            {loading ? 'Создание...' : 'Создать битву'}
          </button>
        </div>
      </div>

      {currentBattle && (
        <div className="card battle-active">
          <h3>Текущая битва</h3>
          <div className="battle-info">
            <div className="battle-player">
              <strong>{currentBattle.player1Username}</strong>
              <div className="battle-score">{currentBattle.player1Score || 0}</div>
            </div>
            <div className="battle-vs">VS</div>
            <div className="battle-player">
              <strong>{currentBattle.player2Username || 'Ожидание соперника...'}</strong>
              <div className="battle-score">{currentBattle.player2Score || 0}</div>
            </div>
          </div>
          <div className="battle-status">
            Статус: {currentBattle.status === 'WAITING' ? 'Ожидание соперника' : 
                    currentBattle.status === 'IN_PROGRESS' ? 'В процессе' : 
                    currentBattle.status === 'FINISHED' ? 'Завершена' : currentBattle.status}
          </div>
        </div>
      )}

      <div className="card">
        <h3>Доступные битвы</h3>
        {availableBattles.length === 0 ? (
          <p>Нет доступных битв. Создайте свою!</p>
        ) : (
          <div className="battles-list">
            {availableBattles.map((battle) => (
              <div key={battle.id} className="battle-item">
                <div className="battle-item-info">
                  <strong>{battle.player1Username}</strong>
                  <span>ищет соперника</span>
                  {battle.topicId && <span className="battle-topic">Тема: {battle.topicId}</span>}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => joinBattle(battle.id)}
                  disabled={loading}
                >
                  Присоединиться
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3>Мои битвы</h3>
        {battles.length === 0 ? (
          <p>У вас пока нет битв</p>
        ) : (
          <div className="battles-list">
            {battles.map((battle) => (
              <div key={battle.id} className="battle-item">
                <div className="battle-item-info">
                  <div>
                    <strong>{battle.player1Username}</strong> vs <strong>{battle.player2Username || 'Ожидание'}</strong>
                  </div>
                  <div className="battle-scores">
                    {battle.player1Score} - {battle.player2Score || 0}
                  </div>
                  <div className="battle-status-small">
                    {battle.status}
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentBattle(battle)}
                >
                  Открыть
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Battle


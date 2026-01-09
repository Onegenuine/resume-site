import axios from 'axios'

// В Docker используем относительный путь (проксируется через nginx)
// В dev режиме используем полный URL
const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const topicsAPI = {
  getAll: () => api.get('/topics'),
  getById: (id) => api.get(`/topics/${id}`),
  create: (data) => api.post('/topics', data),
  update: (id, data) => api.put(`/topics/${id}`, data),
  delete: (id) => api.delete(`/topics/${id}`),
}

export const questionsAPI = {
  getAll: (topicId) => {
    const params = topicId ? { topicId } : {}
    return api.get('/questions', { params })
  },
  getById: (id) => api.get(`/questions/${id}`),
  create: (data) => api.post('/questions', data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`),
  getForReview: (topicId) => {
    const params = topicId ? { topicId } : {}
    return api.get('/questions/review', { params })
  },
  review: (data) => api.post('/questions/review', data),
  upload: (file, topicId) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('topicId', topicId)
    return api.post('/questions/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default api


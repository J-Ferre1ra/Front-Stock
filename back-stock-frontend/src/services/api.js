import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
})

export const getDashboardData = async () => {
  try {
    const response = await api.get('/dashboard')
    return response.data 
  } catch (error) {
    console.error('Erro ao buscar dados do Dashboard:', error)
    throw error
  }
};

export default api

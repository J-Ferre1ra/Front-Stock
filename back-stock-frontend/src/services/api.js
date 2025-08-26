import axios from 'axios'

const api = axios = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export default api
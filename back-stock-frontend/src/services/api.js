import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
})

export const loginRequest = (email, senha) => {
  return api.post("/login", { email, senha });
};

export const registerRequest = (payload) => {
  return api.post("/cadastroComKey", payload);
};

export const checkToken = () => {
  return api.get("/verificar-token");
};

export const logoutRequest = () => {
  return api.post("/logout");
};


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

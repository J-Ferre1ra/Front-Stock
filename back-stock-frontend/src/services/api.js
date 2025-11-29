import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-stock-dagv.onrender.com/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const loginRequest = (email, senha) => api.post("/login", { email, senha });

export const registerRequest = (payload) => api.post("/cadastroComKey", payload);

export const checkToken = () => api.get("/verificar-token");

export const logoutRequest = () => api.post("/logout");

export const getDashboardData = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do Dashboard:', error);
    throw error;
  }
};

export const listProducts = (params = {}) => api.get("/produtos", { params });

export const createProduct = (formData) => 
  api.post("/produtos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const editProduct = (id, payload) => api.put(`/produtos/${id}`, payload);

export const deleteProduct = (id) => api.delete(`/produtos/${id}`);

export const baixarRelatorioEstoque = () => 
  api.get("/relatorio/estoque-com-imagens", {
    responseType: "blob", 
  });

export const listTransactions = () => api.get("/transacoes");

export const createTransaction = (data) => api.post("/transacoes", data);

export const listClients = () => api.get("/clientes");

export const createClient = (data) => api.post("/clientes", data);

export const updateClient = (id, data) => api.put(`/clientes/${id}`, data);

export const deleteClient = (id) => api.delete(`/clientes/${id}`);

export const listLogs = () => api.get("/atividades");

export default api;
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

export const listProducts = (params = {}) => {
  return api.get("/produtos", { params });
};


export const createProduct = (formData) => {
  return api.post("/produtos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editProduct = (id, payload) => {
  return api.put(`/produtos/${id}`, payload);
};

export const deleteProduct = (id) => {
  return api.delete(`/produtos/${id}`);
};

export const baixarRelatorioEstoque = () => {
  return api.get("/relatorio/estoque-com-imagens", {
    responseType: "blob", 
  });
};

export const listTransactions = () => {
  return api.get("/transacoes");
};

export const createTransaction = (data) => {
  return api.post("/transacoes", data);
};

export const listClients = () => {
  return api.get("/clientes");
};

export const createClient = (data) => {
  return api.post("/clientes", data);
};

export const updateClient = (id, data) => {
  return api.put(`/clientes/${id}`, data);
};

export const deleteClient = (id) => {
  return api.delete(`/clientes/${id}`);
};

export const listLogs = () =>
  api.get("/atividades", { withCredentials: true }
);


export default api

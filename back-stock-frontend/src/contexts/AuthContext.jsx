import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const verificarAutenticacao = async () => {
    try {
      const resposta = await api.get('/verificar-token');
      setUsuario(resposta.data.usuario);
    } catch (err) {
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  };

  const recarregarUsuario = async () => {
    setCarregando(true);
    await verificarAutenticacao();
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Erro ao fazer logout na API", error);
    } finally {
      setUsuario(null);
    }
  };

  useEffect(() => {
    verificarAutenticacao();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, recarregarUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
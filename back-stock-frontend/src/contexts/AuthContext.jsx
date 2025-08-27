import {createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext()
export const AuthProvider = ({children}) =>{
    const [usuario, setUsuario] = useState(null)
    const [carregando, setCarregando] = useState(true)
    
    const verificarAutenticacao = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/api/verificar-token', {
        withCredentials: true,
      })
      setUsuario(resposta.data.usuario)
    } catch (err) {
      setUsuario(null)
    } finally {
      setCarregando(false)
    }
  }
  
  const recarregarUsuario = async () => {
    setCarregando(true);
    await verificarAutenticacao();
  };

  useEffect(() => {
    verificarAutenticacao();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, recarregarUsuario }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext);

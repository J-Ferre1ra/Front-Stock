import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import './assets/styles/main.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Produtos from './pages/Produtos/Produtos'
import Clientes from './pages/Clientes/Clientes'
import Transacoes from './pages/Transacoes/Transacoes'
import Atividades from './pages/Atividades/Atividades'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/produtos"
            element={
              <PrivateRoute>
                <Produtos />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />
          <Route
            path="/transacoes"
            element={
              <PrivateRoute>
                <Transacoes />
              </PrivateRoute>
            }
          />
          <Route
            path="/atividades"
            element={
              <PrivateRoute>
                <Atividades />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </>
  )
}

export default App

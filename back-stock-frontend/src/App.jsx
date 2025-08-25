import {Routes, Route, Navigate} from 'react-router-dom'

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
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/produtos' element={<Produtos/>}/>
        <Route path='/clientes' element={<Clientes/>}/>
        <Route path='/transacoes' element={<Transacoes/>}/>
        <Route path='atividades' element={<Atividades/>}/>
        <Route path='*' element={<Navigate to='/login'/>}/>
      </Routes>
    </>
  )
}

export default App

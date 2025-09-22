import {useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"
import api from "../../services/api"

const Login =() =>{
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(null)
    const navigate = useNavigate()
    const { recarregarUsuario } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            await api.post('/login', {
                email,
                senha
            }, {withCredentials:true})
             await recarregarUsuario()
             navigate('/dashboard') 
        
        }catch(err){
            setErro('Email ou senha inválidos.')
        }
    }
    
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <br />
                <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                <br />
                <button type="submit">Entrar</button>
            </form>
            {erro && <p style={{color: 'red'}}>{erro}</p>}
        </div>
    )
}

export default Login
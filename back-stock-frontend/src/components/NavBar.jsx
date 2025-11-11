import { Link, useNavigate } from "react-router-dom"

export default function NavBar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('authToken')

        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">EstoqueMaster</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/estoque">Estoque</Link></li>
                <li><Link to="/transacoes">Transações</Link></li>
                <li><Link to="/clientes">Clientes</Link></li>
                <li><Link to="/atividade-log">Atividades</Link></li>
            </ul>
            <div className="user-actions">
                <button onClick={handleLogout}>Sair</button>
            </div>
        </nav>
    )
}
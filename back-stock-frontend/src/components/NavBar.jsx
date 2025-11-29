import { NavLink, useNavigate } from "react-router-dom";
import "../assets/styles/navBar.css";
import { logoutRequest } from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (e) {
      console.log("Erro ao fazer logout:", e);
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">📦</div>
        <span className="navbar-brand">EstoqueMaster</span>

        <div className="navbar-links">
          <NavLink to="/dashboard" className="nav-item">
            Painel
          </NavLink>

          <NavLink to="/produtos" className="nav-item">
            Estoque
          </NavLink>

          <NavLink to="/transacoes" className="nav-item">
            Transações
          </NavLink>

          <NavLink to="/clientes" className="nav-item">
            Clientes
          </NavLink>

          <NavLink to="/atividades" className="nav-item">
            Registro de Atividades
          </NavLink>

          <NavLink to="/leilao" className="nav-item">
            Leilão
          </NavLink>
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

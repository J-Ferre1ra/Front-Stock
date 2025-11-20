

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../../services/api";
import "../../assets/styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await loginRequest(email, senha);
      const { token } = response.data;

      if (!token) {
        setErro("Resposta do servidor não contém token.");
        return;
      }

      localStorage.setItem("token", token);

      navigate("/dashboard");

    } catch (err) {
      const msg =
        err.response?.data?.erro ||
        "Erro ao realizar login. Verifique suas credenciais.";

      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <header className="login-header">
          <div className="login-logo">📦</div>
          <span className="login-brand">EstoqueMaster</span>
        </header>

        <h1 className="login-title">Entrar</h1>
        <p className="login-subtitle">
          Entre com suas credenciais para acessar o sistema.
        </p>

        {erro && <div className="login-error">{erro}</div>}
        {sucesso && <div className="login-success">{sucesso}</div>}
      
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="login-footer">
          Não tem uma conta?
          <Link to="/register" className="link-button"> Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../../services/api";
import "../../assets/styles/Login.css";
import { Eye, EyeOff } from "lucide-react";


const Register = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [creatorKey, setCreatorKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await registerRequest({ nome, email, senha, creatorKey });
        setSucesso("Conta criada com sucesso!");
        setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      const msg =
        err.response?.data?.erro ||
        "Erro ao criar usuário. Verifique os dados.";
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

        <h1 className="login-title">Criar Conta</h1>
        <p className="login-subtitle">
          Preencha os dados para registrar um novo usuário.
        </p>

        {erro && <div className="login-error">{erro}</div>}
        {sucesso && <div className="login-success">{sucesso}</div>}
        <form className="login-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
               <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="creatorKey">Chave do Administrador</label>
            <div className="input-wrapper">
              <span className="input-icon">🔑</span>
              <input
                id="creatorKey"
                type="password"
                placeholder="Chave secreta de criação"
                value={creatorKey}
                onChange={(e) => setCreatorKey(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="login-button" type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Criar Conta"}
          </button>
        </form>

        <p className="login-footer">
          Já tem uma conta?
          <Link to="/login" className="link-button">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useEffect, useState } from "react";
import { listLogs } from "../../services/api";
import "../../assets/styles/Logs.css";

function Atividades() {
  const [logs, setLogs] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro("");
      const resp = await listLogs();
      setLogs(resp.data);
    } catch (err) {
      const msg =
        err.response?.data?.erro || "Erro ao carregar atividades.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const logsFiltrados = logs.filter((l) => {
    const texto =
      l.acao.toLowerCase() + " " + (l.usuario?.nome || "").toLowerCase();
    return texto.includes(busca.toLowerCase());
  });

  return (
    <div className="logs-page">
      <header className="logs-header">
        <div>
          <h1 className="logs-title">Registro de Atividades</h1>
          <p className="logs-subtitle">
            Veja todas as ações realizadas no sistema.
          </p>
        </div>
      </header>

      <div className="logs-card">
        <div className="logs-card-header">
          <div>
            <h2 className="logs-card-title">Histórico de Ações</h2>
            <p className="logs-card-subtitle">
              Todas as ações de usuários registradas automaticamente.
            </p>
          </div>
        </div>

        <div className="logs-search">
          <span className="logs-search-icon">🔎</span>
          <input
            placeholder="Buscar ações..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {erro && <div className="logs-error">{erro}</div>}

        {carregando ? (
          <p>Carregando atividades...</p>
        ) : (
          <table className="logs-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Usuário</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {logsFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-row">
                    Nenhuma atividade encontrada.
                  </td>
                </tr>
              ) : (
                logsFiltrados.map((l) => {
                  const dataFormatada = new Date(l.data).toLocaleString(
                    "pt-BR"
                  );

                  return (
                    <tr key={l._id}>
                      <td>{dataFormatada}</td>
                      <td>{l.usuario?.nome || "Desconhecido"}</td>
                      <td>{l.acao}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Atividades;

import { useEffect, useState } from "react";
import { listTransactions } from "../../services/api";
import ModalTransacao from "../../components/ModalTransacao";
import "../../assets/styles/Transacoes.css";
import ModalPeriodo from "../../components/ModalPeriodo";

function Transacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  
  // Modais
  const [modalAberto, setModalAberto] = useState(false);
  const [modalPeriodoAberto, setModalPeriodoAberto] = useState(false);

  // NOVO: Feedback Visual (Toast)
  const [feedback, setFeedback] = useState("");

  const mostrarFeedback = (mensagem) => {
    setFeedback(mensagem);
    setTimeout(() => setFeedback(""), 3000);
  };

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro("");
      const response = await listTransactions();
      setTransacoes(response.data);
    } catch (err) {
      const msg = err.response?.data?.erro || "Erro ao carregar transações.";
      setErro(msg);
      mostrarFeedback("❌ " + msg);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const transacoesFiltradas = transacoes.filter((t) => {
    const texto = (t.produto?.nome || "") + " " + (t.tipo || "") + " " + (t.observacao || "");
    return texto.toLowerCase().includes(busca.toLowerCase());
  });

  const gerarRelatorio = (filtros) => {
  mostrarFeedback("⏳ Iniciando download do relatório...");

  let url = `${import.meta.env.VITE_API_URL}/relatorio/transacoes`;

  const params = new URLSearchParams();

  if (filtros.tipoPeriodo) {
    params.append("periodo", filtros.tipoPeriodo);
  }

  if (filtros.inicio && filtros.fim) {
    params.append("inicio", filtros.inicio);
    params.append("fim", filtros.fim);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  window.open(url, "_blank");

    // Pequeno delay para abrir a janela, apenas para o usuário ver o feedback
    setTimeout(() => {
        window.open(url, "_blank");
        setModalPeriodoAberto(false);
        mostrarFeedback("✅ Relatório gerado em nova aba!");
    }, 500);
  };

  return (
    <div className="trans-page">
      {/* TOAST FLUTUANTE */}
      {feedback && <div className="toast-flutuante slide-in">{feedback}</div>}

      <header className="trans-header">
        <div>
          <h1 className="trans-title">Transações</h1>
          <p className="trans-subtitle">
            Acompanhe todas as transações e movimentos de estoque.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setModalPeriodoAberto(true)}>
          📄 Relatório PDF
        </button>
      </header>

      <div className="trans-card">
        <div className="trans-card-header">
          <div>
            <h2 className="trans-card-title">Histórico de Transações</h2>
            <p className="trans-card-subtitle">
              Visualize e gerencie todas as transações de estoque.
            </p>
          </div>

          <div className="trans-actions">
            <button className="btn-primary" onClick={() => setModalAberto(true)}>
              ＋ Nova Transação
            </button>
          </div>
        </div>

        <div className="trans-search">
          <span className="trans-search-icon">🔎</span>
          <input
            placeholder="Buscar transações..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {erro && <div className="trans-error">{erro}</div>}

        {carregando ? (
          <p>Carregando transações...</p>
        ) : (
          <table className="trans-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Item</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              {transacoesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-row">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : (
                transacoesFiltradas.map((t) => {
                  const dataFormatada = t.data ? new Date(t.data).toLocaleDateString("pt-BR") : "-";
                  const tipo = t.tipo || "";
                  let tipoClasse = "badge-neutral";
                  let tipoLabel = tipo;

                  if (tipo === "entrada") {
                    tipoClasse = "badge-green";
                    tipoLabel = "Entrada";
                  } else if (tipo === "saída" || tipo === "saida") {
                    tipoClasse = "badge-red";
                    tipoLabel = "Saída";
                  } else if (tipo === "venda") {
                    tipoClasse = "badge-blue";
                    tipoLabel = "Venda";
                  } else if (tipo === "despesa") {
                    tipoClasse = "badge-neutral";
                    tipoLabel = "Despesa";
                  }

                  return (
                    <tr key={t._id}>
                      <td>{t._id?.slice(-6) || "-"}</td>
                      <td>{dataFormatada}</td>
                      <td><span className={`badge ${tipoClasse}`}>{tipoLabel}</span></td>
                      <td>{t.produto?.nome || "-"}</td>
                      <td>{t.quantidade}</td>
                      <td>
                        {typeof t.valor === "number"
                          ? t.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                          : "-"}
                      </td>
                      <td className="col-observacao">{t.observacao || "-"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && <ModalTransacao fechar={() => setModalAberto(false)} atualizar={carregar} />}
      {modalPeriodoAberto && <ModalPeriodo fechar={() => setModalPeriodoAberto(false)} gerar={gerarRelatorio} />}
    </div>
  );
}

export default Transacoes;
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
  const [modalAberto, setModalAberto] = useState(false);
  const [modalPeriodoAberto, setModalPeriodoAberto] = useState(false);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro("");
      const response = await listTransactions();
      setTransacoes(response.data);
    } catch (err) {
      const msg =
        err.response?.data?.erro ||
        "Erro ao carregar transações.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const transacoesFiltradas = transacoes.filter((t) => {
    const texto =
      (t.produto?.nome || "") +
      " " +
      (t.tipo || "") +
      " " +
      (t.observacao || "");
    return texto.toLowerCase().includes(busca.toLowerCase());
  });

  const gerarRelatorio = (filtros) => {
  let url = "http://localhost:3000/api/relatorio/transacoes";

  if (filtros.tipoPeriodo) {
    url += `?periodo=${filtros.tipoPeriodo}`;
  }

  if (filtros.inicio && filtros.fim) {
    url += `?inicio=${filtros.inicio}&fim=${filtros.fim}`;
  }

  window.open(url, "_blank");

  setModalPeriodoAberto(false);
};


  return (
    <div className="trans-page">
      <header className="trans-header">
        <div>
          <h1 className="trans-title">Transações</h1>
          <p className="trans-subtitle">
            Acompanhe todas as transações e movimentos de estoque.
          </p>
        </div>

        <button className="btn-report" onClick={() => setModalPeriodoAberto(true)}>
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
            
            <button
              className="btn-primary"
              onClick={() => setModalAberto(true)}
            >
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
                  const dataFormatada = t.data
                    ? new Date(t.data).toLocaleDateString("pt-BR")
                    : "-";

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
                      <td>
                        <span className={`badge ${tipoClasse}`}>
                          {tipoLabel}
                        </span>
                      </td>
                      <td>{t.produto?.nome || "-"}</td>
                      <td>{t.quantidade}</td>
                      <td>
                        {typeof t.valor === "number"
                          ? t.valor.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "-"}
                      </td>
                      <td className="col-observacao">
                        {t.observacao || "-"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && (
        <ModalTransacao
          fechar={() => setModalAberto(false)}
          atualizar={carregar}
        />
      )}

      {modalPeriodoAberto && (
         <ModalPeriodo
            fechar={() => setModalPeriodoAberto(false)}
            gerar={gerarRelatorio}
        />
      )}

    </div>
  );
}

export default Transacoes;

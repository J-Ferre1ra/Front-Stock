import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/api";
import "../../assets/styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import ModalRelatorio from "../../components/ModalRelatorio";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [modalRelatorio, setModalRelatorio] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCarregando(true);
        setErro("");
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        const msg =
          err.response?.data?.erro || "Erro ao carregar dados do dashboard.";
        setErro(msg);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, []);

  const totalProdutos = dashboardData?.totalProdutos ?? 0;
  const totalVendas = dashboardData?.totalVendas ?? 0;
  const itensBaixoEstoque = dashboardData?.itensComEstoqueBaixo ?? [];
  const transacoesRecentes = dashboardData?.transacoesRecentes ?? [];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Painel</h1>
          <p className="dashboard-subtitle">
            Bem-vindo(a) de volta! Aqui está um resumo do seu estoque.
          </p>
        </div>
      </header>

      {erro && <div className="dashboard-error">{erro}</div>}

      {carregando && !dashboardData ? (
        <p>Carregando dados do dashboard...</p>
      ) : (
        <>
          <section className="dashboard-metrics">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Estoque Total</span>
                <span className="metric-icon metric-icon-blue">📦</span>
              </div>
              <div className="metric-value">
                {totalProdutos.toLocaleString("pt-BR")}
              </div>
              <p className="metric-caption">Total de produtos cadastrados</p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Vendas</span>
                <span className="metric-icon metric-icon-green">📈</span>
              </div>
              <div className="metric-value">
                {totalVendas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <p className="metric-caption">
                Soma total das vendas registradas
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Itens com Estoque Baixo</span>
                <span className="metric-icon metric-icon-red">⚠️</span>
              </div>
              <div className="metric-value">{itensBaixoEstoque.length}</div>
              <p className="metric-caption">
                Produtos abaixo do limite configurado
              </p>
            </div>
          </section>

          <section className="dashboard-main">
            <div className="dashboard-column">
              <div className="panel-card">
                <div className="panel-card-header">
                  <div>
                    <h2 className="panel-title">Transações Recentes</h2>
                    <p className="panel-subtitle">
                      Movimentações recentes de estoque
                    </p>
                  </div>

                  <button
                    className="text-link-button"
                    onClick={() => navigate("/transacoes")}
                  >
                    Ver Todas →
                  </button>
                </div>

                <ul className="transactions-list">
                  {transacoesRecentes.length === 0 && (
                    <li className="transaction-item">
                      <span className="transaction-description">
                        Nenhuma transação encontrada.
                      </span>
                    </li>
                  )}

                  {transacoesRecentes.map((t) => {
                    const tipo = t.tipo === "entrada" ? "entrada" : "saida";

                    return (
                      <li key={t._id} className="transaction-item">
                        <div
                          className={`transaction-icon transaction-icon-${tipo}`}
                        >
                          {tipo === "entrada" ? "⬇" : "⬆"}
                        </div>
                        <div className="transaction-info">
                          <span className="transaction-title">
                            {t.produto?.nome || t.observacao || "Transação"}
                          </span>
                          <span className="transaction-description">
                            Tipo: {t.tipo}
                          </span>
                        </div>
                        <div className="transaction-meta">
                          <span className="transaction-amount">
                            {t.valor?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                          <span className="transaction-time">
                            {t.data
                              ? new Date(t.data).toLocaleString("pt-BR")
                              : ""}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="dashboard-column">
              <div className="panel-card">
                <div className="panel-card-header">
                  <div>
                    <h2 className="panel-title">Alertas de Estoque Baixo</h2>
                    <p className="panel-subtitle">
                      Itens que precisam da sua atenção
                    </p>
                  </div>

                  <button
                    className="text-link-button"
                    onClick={() => navigate("/produtos")}
                  >
                    Ver Todos →
                  </button>
                </div>

                <ul className="alerts-list">
                  {itensBaixoEstoque.length === 0 && (
                    <li className="alert-item">
                      <span className="alert-description">
                        Nenhum item com estoque baixo.
                      </span>
                    </li>
                  )}

                  {itensBaixoEstoque.map((item) => {
                    const nome =
                      item.nome || item.nomeProduto || item.descricao || "Produto";
                    const quantidade = item.quantidade ?? 0;

                    return (
                      <li key={item._id} className="alert-item">
                        <div className="alert-left">
                          <div className="alert-indicator">
                            {nome.charAt(0).toUpperCase()}
                          </div>

                          <div className="alert-info">
                            <span className="alert-title">{nome}</span>
                            <span className="alert-description">
                              {quantidade} unidades restantes
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>

          <section className="dashboard-actions">
            <div className="panel-card">
              <h2 className="panel-title">Ações Rápidas</h2>
              <p className="panel-subtitle">Tarefas e relatórios mais comuns</p>

              <div className="quick-actions-grid">
                <button
                  className="quick-action-card"
                  onClick={() => navigate("/produtos")}
                >
                  <div className="quick-action-icon">📦</div>
                  <span className="quick-action-title">Adicionar Estoque</span>
                </button>

                <button
                  className="quick-action-card"
                  onClick={() => navigate("/transacoes")}
                >
                  <div className="quick-action-icon">📈</div>
                  <span className="quick-action-title">Registrar Venda</span>
                </button>

                <button
                  className="quick-action-card"
                  onClick={() => setModalRelatorio(true)}
                >
                  <div className="quick-action-icon">📋</div>
                  <span className="quick-action-title">Gerar Relatório</span>
                </button>
              </div>
            </div>
          </section>

          {modalRelatorio && (
            <ModalRelatorio fechar={() => setModalRelatorio(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

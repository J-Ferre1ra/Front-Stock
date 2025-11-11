import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../../services/api'; // Importa a função da API
import CardMetric from '../../components/CardMetric'; // Para exibir as métricas
import TableGeneric from '../../components/TableGeneric'; // Para exibir transações e itens com estoque baixo

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Pega os dados do Dashboard
        const data = await getDashboardData();
        setDashboardData(data);

        // Pega as transações recentes
        setRecentTransactions(data.transacoesRecentes);

        // Pega os itens com estoque baixo
        setLowStockItems(data.itensComEstoqueBaixo);
      } catch (error) {
        console.error('Erro ao carregar dados do Dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Se estiver carregando, mostra "Carregando..."
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não houver dados
  if (!dashboardData) {
    return <div>Erro ao carregar dados do Dashboard</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Cartões de Métricas */}
      <div className="card-container">
        <CardMetric title="Total de Produtos" value={dashboardData.totalProdutos} />
        <CardMetric title="Total de Vendas" value={`R$ ${dashboardData.totalVendas}`} />
        <CardMetric title="Total de Despesas" value={`R$ ${dashboardData.totalDespesas}`} />
        <CardMetric title="Lucro" value={`R$ ${dashboardData.lucroLiquido}`} />
        <CardMetric title="Saldo Atual" value={`R$ ${dashboardData.saldoAtual}`} />
      </div>

      {/* Transações Recentes */}
      <div className="section">
        <h2>Transações Recentes</h2>
        <TableGeneric
          columns={['ID', 'Produto', 'Quantidade', 'Valor']}
          data={recentTransactions} // Dados de transações recentes
          actions={[]} // Ações extras, se necessário
        />
      </div>

      {/* Itens com Estoque Baixo */}
      <div className="section">
        <h2>Itens com Estoque Baixo</h2>
        <TableGeneric
          columns={['ID', 'Produto', 'Quantidade em Estoque']}
          data={lowStockItems} // Dados de itens com estoque baixo
          actions={[]} // Ações extras, se necessário
        />
      </div>
    </div>
  );
}

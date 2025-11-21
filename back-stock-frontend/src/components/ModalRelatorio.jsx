import "../assets/styles/ModalRelatorio.css";

function ModalRelatorio({ fechar }) {

  const gerarEstoque = () => {
    window.open("http://localhost:3000/api/relatorio/estoque-com-imagens", "_blank");
  };

  const gerarTransacoes = () => {
    window.open("http://localhost:3000/api/relatorio/transacoes?periodo=30dias", "_blank");
  };

  return (
    <div className="relatorio-overlay">
      <div className="relatorio-box relatorio-anim">

        <h2 className="relatorio-title">Gerar Relatório</h2>
        <p className="relatorio-subtitle">Escolha o tipo de relatório desejado.</p>

        <div className="relatorio-options">

          <button className="relatorio-btn" onClick={gerarEstoque}>
            📦 Relatório de Estoque
          </button>

          <button className="relatorio-btn" onClick={gerarTransacoes}>
            🔄 Relatório de Transações
          </button>

        </div>

        <div className="relatorio-actions">
          <button className="relatorio-cancel" onClick={fechar}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalRelatorio;

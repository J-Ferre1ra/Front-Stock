import { useState } from "react";
import "../assets/styles/ModalRelatorio.css";
import api from "../services/api";

function ModalRelatorio({ fechar }) {
  const [feedback, setFeedback] = useState("");

  const mostrarFeedback = (mensagem) => {
    setFeedback(mensagem);
    setTimeout(() => setFeedback(""), 3000);
  };

  const gerarEstoque = () => {
    mostrarFeedback("⏳ Gerando relatório de Estoque...");
    setTimeout(() => {
      const url = `${api.defaults.baseURL}/relatorio/estoque-com-imagens`;
      window.open(url, "_blank");
      mostrarFeedback("✅ Relatório aberto em nova aba!");
    }, 500);
  };

  const gerarTransacoes = () => {
    mostrarFeedback("⏳ Gerando relatório de 30 dias...");
    setTimeout(() => {
      const url = `${api.defaults.baseURL}/relatorio/transacoes?periodo=30dias`;
      window.open(url, "_blank");
      mostrarFeedback("✅ Relatório aberto em nova aba!");
    }, 500);
  };

  return (
    <div className="relatorio-overlay">
      {feedback && <div className="toast-flutuante slide-in">{feedback}</div>}

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

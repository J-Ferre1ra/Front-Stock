import "../assets/styles/ModalConfirm.css";
import "../assets/styles/buttons.css";

function ModalConfirm({ titulo, mensagem, confirmar, fechar }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">

        <h2 className="confirm-title">{titulo}</h2>
        <p className="confirm-message">{mensagem}</p>

        <div className="confirm-buttons">
          <button className="btn-secondary" onClick={fechar}>
            Cancelar
          </button>

          <button className="btn-danger" onClick={confirmar}>
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalConfirm;

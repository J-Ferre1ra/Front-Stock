import { useState } from "react";
import "../assets/styles/ModalTransacao.css"; // usa o mesmo estilo premium

function ModalPeriodo({ fechar, gerar }) {
  const [tipoPeriodo, setTipoPeriodo] = useState("7dias");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tipoPeriodo === "personalizado") {
      if (!inicio || !fim) {
        alert("Selecione a data inicial e final.");
        return;
      }
      gerar({ inicio, fim });
    } else {
      gerar({ tipoPeriodo });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-anim">

        <h2 className="modal-title">Gerar Relatório de Transações</h2>

        <form className="modal-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Período</label>
            <select
              className="input-field"
              value={tipoPeriodo}
              onChange={(e) => setTipoPeriodo(e.target.value)}
            >
              <option value="7dias">Últimos 7 dias</option>
              <option value="30dias">Últimos 30 dias</option>
              <option value="mes">Mês atual</option>
              <option value="ano">Ano atual</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>

          {tipoPeriodo === "personalizado" && (
            <>
              <div className="form-group">
                <label>Data início</label>
                <input
                  type="date"
                  className="input-field"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Data fim</label>
                <input
                  type="date"
                  className="input-field"
                  value={fim}
                  onChange={(e) => setFim(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={fechar}>
              Cancelar
            </button>

            <button type="submit" className="btn-save">
              Gerar Relatório
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ModalPeriodo;

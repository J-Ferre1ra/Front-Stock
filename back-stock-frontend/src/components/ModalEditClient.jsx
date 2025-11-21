import { useState } from "react";
import { updateClient } from "../services/api";
import "../assets/styles/ModalClient.css";

function ModalEditCliente({ cliente, fechar, atualizar }) {
  const [nome, setNome] = useState(cliente.nome);
  const [cpf, setCpf] = useState(cliente.cpf);
  const [telefone, setTelefone] = useState(cliente.telefone);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const editar = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      await updateClient(cliente._id, { nome, cpf, telefone });
      setSucesso("Cliente atualizado com sucesso!");

      setTimeout(() => {
        atualizar();
        fechar();
      }, 900);
    } catch (error) {
      const msg =
        error.response?.data?.erro || "Erro ao atualizar cliente.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-anim">
        <h2 className="modal-title">Editar Cliente</h2>

        {erro && <div className="modal-error">{erro}</div>}
        {sucesso && <div className="modal-success">{sucesso}</div>}

        <form className="modal-form" onSubmit={editar}>
          <label>Nome</label>
          <input
            className="input-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>CPF</label>
          <input
            className="input-field"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label>Telefone</label>
          <input
            className="input-field"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <div className="modal-buttons">
            <button className="btn-cancel" type="button" onClick={fechar}>
              Cancelar
            </button>
            <button className="btn-save" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditCliente;

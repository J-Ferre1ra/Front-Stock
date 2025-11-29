import { useState } from "react";
import { createClient } from "../services/api";
import "../assets/styles/ModalClient.css";
import "../assets/styles/buttons.css";

function ModalAddCliente({ fechar, atualizar }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const salvar = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      await createClient({ nome, cpf, telefone });
      setSucesso("Cliente registrado com sucesso!");

      setTimeout(() => {
        atualizar();
        fechar();
      }, 900);
    } catch (error) {
      const msg =
        error.response?.data?.erro || "Erro ao registrar cliente.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-anim">
        <h2 className="modal-title">Novo Cliente</h2>

        {erro && <div className="modal-error">{erro}</div>}
        {sucesso && <div className="modal-success">{sucesso}</div>}

        <form className="modal-form" onSubmit={salvar}>
          <label>Nome</label>
          <input
            className="input-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label>CPF</label>
          <input
            className="input-field"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />

          <label>Telefone</label>
          <input
            className="input-field"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />

          <div className="modal-buttons">
            <button className="btn-secondary" type="button" onClick={fechar}>
              Cancelar
            </button>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddCliente;

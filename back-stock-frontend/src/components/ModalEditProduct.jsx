import { useState } from "react";
import { editProduct } from "../services/api";
import "../assets/styles/ModalProduct.css";
import "../assets/styles/buttons.css";

function ModalEditarProduto({ produto, fechar, atualizar }) {
  const [nome, setNome] = useState(produto.nome);
  const [quantidade, setQuantidade] = useState(produto.quantidade);
  const [preco, setPreco] = useState(produto.preco);
  const [descricao, setDescricao] = useState(produto.descricao || "");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const salvar = async (e) => {
    e.preventDefault();

    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      await editProduct(produto._id, {
        nome,
        quantidade,
        preco,
        descricao,
      });

      setSucesso("Produto atualizado com sucesso!");

      setTimeout(() => {
        atualizar();
        fechar();
      }, 800);
    } catch (err) {
      const msg =
        err.response?.data?.erro ||
        "Erro ao editar produto.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Editar Produto</h2>

        {erro && <div className="modal-error">{erro}</div>}
        {sucesso && <div className="modal-success">{sucesso}</div>}

        <form onSubmit={salvar} className="modal-form">

          <label>Nome do Produto</label>
          <input
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Quantidade</label>
          <input
            type="number"
            min="0"
            required
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          <label>Preço</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={fechar}>
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

export default ModalEditarProduto;

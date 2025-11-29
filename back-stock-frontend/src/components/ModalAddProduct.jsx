import { useState } from "react";
import { createProduct } from "../services/api";
import "../assets/styles/ModalProduct.css";
import "../assets/styles/buttons.css";

function ModalAddProduct({ fechar, atualizar }) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleArquivo = (e) => {
    setImagens(Array.from(e.target.files)); 
  };


  const salvar = async (e) => {
    e.preventDefault();

    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("quantidade", quantidade);
      formData.append("preco", preco);
      formData.append("descricao", descricao);

      imagens.forEach((img) => {
        formData.append("imagens", img);
      });

      await createProduct(formData);

      setSucesso("Produto criado com sucesso!");

      setTimeout(() => {
        atualizar();
        fechar();
      }, 800);
    } catch (err) {
      const msg =
        err.response?.data?.erro ||
        "Erro ao criar produto.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Adicionar Produto</h2>

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

          <label>Imagens (opcional)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleArquivo}
          />

          <div className="modal-buttons">
            <button type="button" className="btn-secondary" onClick={fechar}>
              Cancelar
            </button>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddProduct;

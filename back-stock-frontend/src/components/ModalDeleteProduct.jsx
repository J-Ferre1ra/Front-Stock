import { useState } from "react";
import { deleteProduct } from "../services/api";
import "../assets/styles/ModalProduct.css";

function ModalDeleteProduct({ produto, fechar, atualizar }) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const confirmar = async () => {
    setErro("");
    setLoading(true);

    try {
      await deleteProduct(produto._id);

      atualizar();
      fechar();
    } catch (err) {
      setErro(
        err.response?.data?.erro || "Erro ao excluir produto."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Excluir Produto</h2>

        <p style={{ marginBottom: "12px" }}>
          Tem certeza que deseja excluir o produto:
          <br />
          <strong>{produto.nome}</strong>?
        </p>

        {erro && <div className="modal-error">{erro}</div>}

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={fechar}>
            Cancelar
          </button>

          <button
            className="btn-delete-confirm"
            onClick={confirmar}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteProduct;

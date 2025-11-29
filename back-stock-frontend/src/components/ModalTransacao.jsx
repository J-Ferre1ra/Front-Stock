import { useEffect, useState } from "react";
import { listProducts, createTransaction } from "../services/api";
import "../assets/styles/ModalTransacao.css";
import "../assets/styles/buttons.css"; 

function ModalTransacao({ fechar, atualizar }) {
  const [tipo, setTipo] = useState("entrada");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [produtos, setProdutos] = useState([]);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await listProducts();
        setProdutos(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    carregar();
  }, []);

  const salvar = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      let produtoSelecionado = null;

      const exigeProduto = ["entrada", "saída", "venda"].includes(tipo);
      const exigeQuantidade = exigeProduto;

      if (exigeProduto) {
        if (!produtoId) {
          setErro("Selecione um produto.");
          setLoading(false);
          return;
        }

        produtoSelecionado = produtos.find((p) => p._id === produtoId);
        if (!produtoSelecionado) {
          setErro("Produto não encontrado.");
          setLoading(false);
          return;
        }
      }

      await createTransaction({
        tipo,
        produto: produtoSelecionado ? produtoSelecionado.nome : null,
        quantidade: exigeQuantidade ? Number(quantidade) : 0,
        valor: Number(valor),
        observacao,
      });

      setSucesso("Transação registrada com sucesso!");

      setTimeout(() => {
        atualizar();
        fechar();
      }, 900);
    } catch (error) {
      const msg =
        error.response?.data?.erro || "Erro ao registrar transação.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  const exigeProduto = ["entrada", "saída", "venda"].includes(tipo);
  const exigeQuantidade = exigeProduto;

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-anim">
        
        <h2 className="modal-title">Registrar Nova Transação</h2>

        {erro && <div className="modal-error">{erro}</div>}
        {sucesso && <div className="modal-success">{sucesso}</div>}

        <form className="modal-form" onSubmit={salvar}>
          
          <div className="form-group">
            <label>Tipo</label>
            <select
              className="input-field"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="entrada">
                Entrada — Estoque aumenta (compra de produtos)
              </option>
              <option value="saída">
                Saída — Estoque diminui (itens danificados)
              </option>
              <option value="venda">
                Venda — Estoque diminui (venda para cliente)
              </option>
              <option value="despesa">
                Despesa — Não altera estoque (luz, salário, taxas)
              </option>
            </select>
          </div>

          {exigeProduto && (
            <div className="form-group">
              <label>Produto</label>
              <select
                className="input-field"
                value={produtoId}
                onChange={(e) => setProdutoId(e.target.value)}
              >
                <option value="">Selecione o produto...</option>
                {produtos.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          {exigeQuantidade && (
            <div className="form-group">
              <label>Quantidade</label>
              <input
                type="number"
                min="1"
                className="input-field"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="0"
              />
            </div>
          )}

          <div className="form-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Observações</label>
            <textarea
              className="input-field"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Observações adicionais"
            />
          </div>

          <div className="modal-buttons">
            <button type="button" className="btn-secondary" onClick={fechar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Transação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalTransacao;

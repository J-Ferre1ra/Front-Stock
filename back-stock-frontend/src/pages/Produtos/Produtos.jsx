import { useEffect, useState } from "react";
import { listProducts } from "../../services/api";
import ModalAddProduct from "../../components/ModalAddProduct";
import ModalEditProduct from "../../components/ModalEditProduct";
import ModalDeleteProduct from "../../components/ModalDeleteProduct";
import { baixarRelatorioEstoque } from "../../services/api";
import "../../assets/styles/Produtos.css";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [produtoExcluindo, setProdutoExcluindo] = useState(null);


  const carregar = async (filtroNome = "") => {
    try {
      setCarregando(true);
      setErro("");
      const response = await listProducts(
        filtroNome ? { nome: filtroNome } : {}
      );
      setProdutos(response.data);
    } catch (err) {
      const msg =
        err.response?.data?.erro || "Erro ao carregar produtos.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const handleRefresh = () => {
    setBusca("");
    carregar();
  };

  const abrirModalEditar = (produto) => {
    setProdutoEditando(produto);
    setModalEditarAberto(true);
  };

  const fecharModalEditar = () => {
    setModalEditarAberto(false);
    setProdutoEditando(null);
  };

  const abrirModalExcluir = (produto) => {
  setProdutoExcluindo(produto);
  setModalExcluirAberto(true);
};

const fecharModalExcluir = () => {
  setProdutoExcluindo(null);
  setModalExcluirAberto(false);
};

const handleRelatorioPDF = async () => {
  try {
    const response = await baixarRelatorioEstoque();

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "relatorio_estoque.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    alert("Erro ao gerar o relatório PDF.");
  }
};


  return (
    <div className="produtos-page">
      <h1 className="produtos-title">Estoque</h1>
      <p className="produtos-subtitle">
        Gerencie seus itens de estoque e níveis de produtos.
      </p>

      <div className="produtos-card">
        <div className="produtos-topbar">
          <div className="produtos-search">
            <span className="produtos-search-icon">🔍</span>
            <input
              placeholder="Buscar estoque..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && carregar(busca)}
            />
          </div>

          <div className="produtos-actions">
            <button className="btn-secondary">⚙️ Filtrar</button>
            <button className="btn-secondary" onClick={handleRefresh}>
              🔁 Atualizar
            </button>
            <button className="btn-secondary" onClick={handleRelatorioPDF}>
                📄 Relatório PDF
                </button>
            <button className="btn-primary" onClick={abrirModal}>
              ＋ Adicionar Item
            </button>
          </div>
        </div>

        {erro && <div className="produtos-error">{erro}</div>}

        {carregando ? (
          <p>Carregando produtos...</p>
        ) : (
          <table className="produtos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Preço</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                produtos.map((p) => {
                  const status =
                    p.quantidade === 0
                      ? "Sem Estoque"
                      : p.quantidade < 10
                      ? "Estoque Baixo"
                      : "Em Estoque";

                  const badgeClass =
                    p.quantidade === 0
                      ? "badge-red"
                      : p.quantidade < 10
                      ? "badge-yellow"
                      : "badge-green";

                  return (
                    <tr key={p._id}>
                      <td>{p.nome}</td>
                      <td>{p.quantidade}</td>

                      <td>
                        <span className={`badge ${badgeClass}`}>
                          {status}
                        </span>
                      </td>

                      <td>
                        {p.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>

                      <td className="descricao-cell">
                        {p.descricao || "-"}
                      </td>

                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => abrirModalEditar(p)}
                        >
                          Editar
                        </button>

                        <button className="btn-delete" onClick={() => abrirModalExcluir(p)}>
                            Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && (
        <ModalAddProduct fechar={fecharModal} atualizar={carregar} />
      )}

      {modalEditarAberto && (
        <ModalEditProduct
          produto={produtoEditando}
          fechar={fecharModalEditar}
          atualizar={carregar}
        />
      )}

      {modalExcluirAberto && (
        <ModalDeleteProduct
            produto={produtoExcluindo}
            fechar={fecharModalExcluir}
            atualizar={carregar}
        />
        )}

    </div>
  );
}

export default Produtos;

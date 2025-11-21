import { useEffect, useState } from "react";
import { listProducts } from "../../services/api";
import "../../assets/styles/Leilao.css";

function Leilao() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    try {
      const response = await listProducts();
      setProdutos(response.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const copiarImagens = async (produto) => {
    try {
      const urls = produto.imagens;

      if (!urls || urls.length === 0) {
        alert("Este produto não possui imagens.");
        return;
      }

      for (const url of urls) {
        const response = await fetch(url);
        const blob = await response.blob();
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
      }

      alert("Imagens copiadas com sucesso!");
    } catch (err) {
      console.error("Erro ao copiar:", err);
      alert("Seu navegador não permite copiar imagens automaticamente.");
    }
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="leilao-page">
      <h1 className="leilao-title">Painel de Leilão</h1>
      <p className="leilao-subtitle">
        Clique para visualizar e copiar as imagens dos produtos.
      </p>

      <div className="leilao-container">
        {produtos.map((produto) => (
          <div key={produto._id} className="leilao-card">
            <h2 className="produto-nome">{produto.nome}</h2>

            <p className="produto-preco">
              {produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            {produto.descricao && (
              <p className="produto-desc">{produto.descricao}</p>
            )}

            <button
              className="copiar-btn"
              onClick={() => copiarImagens(produto)}
            >
              📋 Copiar imagens
            </button>

            <div className="imagens-grid">
              {produto.imagens?.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Imagem ${index}`}
                  className="imagem-item"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leilao;

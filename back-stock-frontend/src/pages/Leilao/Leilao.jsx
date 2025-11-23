import { useEffect, useState } from "react";
import { listProducts } from "../../services/api";
import "../../assets/styles/Leilao.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function Leilao() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [copiando, setCopiando] = useState(false);
  const [feedback, setFeedback] = useState("");

  const mostrarFeedback = (mensagem) => {
    setFeedback(mensagem);
    setTimeout(() => {
      setFeedback("");
    }, 3000);
  };

  const carregar = async () => {
    try {
      const response = await listProducts();
      setProdutos(response.data);
    } catch (err) {
      mostrarFeedback("Erro ao carregar produtos.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const copiarTexto = async (produto) => {
    const texto = `
${produto.nome}
Preço: ${produto.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}
${produto.descricao || ""}
    `.trim();

    try {
      await navigator.clipboard.writeText(texto);
      mostrarFeedback("✅ Informações copiadas!");
    } catch (err) {
      mostrarFeedback("❌ Erro ao copiar.");
    }
  };

  const baixarImagensZIP = async (produto) => {
    try {
      if (!produto.imagens || produto.imagens.length === 0) {
        mostrarFeedback("⚠️ Este produto não possui imagens.");
        return;
      }

      setCopiando(true);
      mostrarFeedback("⏳ Gerando arquivo ZIP...");

      const zip = new JSZip();
      const pasta = zip.folder(produto.nome || "produto");

      for (let i = 0; i < produto.imagens.length; i++) {
        const url = produto.imagens[i];
        const response = await fetch(url);
        const blob = await response.blob();
        pasta.file(`imagem_${i + 1}.jpg`, blob);
      }

      const conteudo = await zip.generateAsync({ type: "blob" });
      saveAs(conteudo, `${produto.nome}.zip`);

      setCopiando(false);
      mostrarFeedback("📦 Imagens baixadas com sucesso!");
    } catch (err) {
      setCopiando(false);
      mostrarFeedback("❌ Erro ao gerar ZIP de imagens.");
    }
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="leilao-page">
      {feedback && (
        <div className="toast-flutuante slide-in">
          {feedback}
        </div>
      )}

      <h1 className="leilao-title">Painel de Leilão</h1>
      <p className="leilao-subtitle">
        Copie rapidamente as informações ou baixe todas as imagens para anunciar no WhatsApp.
      </p>

      <div className="leilao-container">
        {produtos.map((produto) => (
          <div key={produto._id} className="leilao-card">
            <div className="leilao-card-header">
              <h2 className="produto-nome">{produto.nome}</h2>

              <p className="produto-preco">
                {produto.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            {produto.descricao && (
              <p className="produto-desc">{produto.descricao}</p>
            )}

            <div className="leilao-buttons">
              <button className="btn-primary" onClick={() => copiarTexto(produto)}>
                📋 Copiar texto
              </button>

              <button
                className="btn-secondary"
                onClick={() => baixarImagensZIP(produto)}
                disabled={copiando}
              >
                {copiando ? "Baixando..." : "📦 Baixar imagens"}
              </button>
            </div>

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
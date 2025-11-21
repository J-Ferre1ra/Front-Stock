import { useEffect, useState } from "react";
import { listClients, deleteClient } from "../../services/api";
import "../../assets/styles/Client.css";

import ModalAddCliente from "../../components/ModalAddClient";
import ModalEditCliente from "../../components/ModalEditClient";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro("");
      const resp = await listClients();
      setClientes(resp.data);
    } catch (err) {
      setErro("Erro ao carregar clientes.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const abrirEditar = (cliente) => {
    setClienteEditando(cliente);
    setModalEdit(true);
  };

  const removerCliente = async (id) => {
    if (!confirm("Deseja excluir este cliente?")) return;
    try {
      await deleteClient(id);
      carregar();
    } catch (err) {
      alert("Erro ao excluir cliente.");
    }
  };

  const clientesFiltrados = clientes.filter((c) =>
    (c.nome + " " + c.cpf + " " + c.telefone)
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <div className="clientes-page">
      <header className="clientes-header">
        <div>
          <h1 className="clientes-title">Clientes</h1>
          <p className="clientes-subtitle">
            Gerencie seus clientes e histórico de compras.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setModalAdd(true)}>
          ＋ Novo Cliente
        </button>
      </header>

      <div className="clientes-card">
        <div className="clientes-topbar">
          <h2 className="clientes-card-title">Lista de Clientes</h2>

          <div className="clientes-search">
            <span className="search-icon">🔍</span>
            <input
              placeholder="Buscar clientes..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {erro && <div className="clientes-error">{erro}</div>}

        {carregando ? (
          <p>Carregando clientes...</p>
        ) : (
          <table className="clientes-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map((c) => (
                  <tr key={c._id}>
                    <td>{c.nome}</td>
                    <td>{c.cpf}</td>
                    <td>{c.telefone}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => abrirEditar(c)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => removerCliente(c._id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalAdd && <ModalAddCliente fechar={() => setModalAdd(false)} atualizar={carregar} />}
      {modalEdit && (
        <ModalEditCliente
          fechar={() => setModalEdit(false)}
          cliente={clienteEditando}
          atualizar={carregar}
        />
      )}
    </div>
  );
}

export default Clientes;

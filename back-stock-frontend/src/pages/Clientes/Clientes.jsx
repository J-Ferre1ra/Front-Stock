import { useEffect, useState } from "react";
import { listClients, deleteClient } from "../../services/api";
import "../../assets/styles/Client.css";

import ModalAddCliente from "../../components/ModalAddClient";
import ModalEditCliente from "../../components/ModalEditClient";
import ModalConfirm from "../../components/ModalConfirm";

function formatCpf(cpf) {
  if (!cpf) return "";
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf; 

  return (
    digits.slice(0, 3) +
    "." +
    digits.slice(3, 6) +
    "." +
    digits.slice(6, 9) +
    "-" +
    digits.slice(9, 11)
  );
}

function formatTelefone(telefone) {
  if (!telefone) return "";
  const digits = telefone.replace(/\D/g, "");

  if (digits.length === 11) {
    return (
      "(" +
      digits.slice(0, 2) +
      ") " +
      digits.slice(2, 7) +
      "-" +
      digits.slice(7)
    );
  }

  if (digits.length === 10) {
    return (
      "(" +
      digits.slice(0, 2) +
      ") " +
      digits.slice(2, 6) +
      "-" +
      digits.slice(6)
    );
  }

  return telefone;
}

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

const [confirmarExclusao, setConfirmarExclusao] = useState(null);


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

  const removerCliente = async () => {
  try {
    await deleteClient(confirmarExclusao._id);
    setConfirmarExclusao(null);
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
                    <td>{formatCpf(c.cpf)}</td>
                    <td>{formatTelefone(c.telefone)}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => abrirEditar(c)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => setConfirmarExclusao(c)}
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

      {modalAdd && (
        <ModalAddCliente fechar={() => setModalAdd(false)} atualizar={carregar} />
      )}
      {modalEdit && (
        <ModalEditCliente
          fechar={() => setModalEdit(false)}
          cliente={clienteEditando}
          atualizar={carregar}
        />
      )}
      {confirmarExclusao && (
        <ModalConfirm
          titulo="Confirmar Exclusão"
          mensagem={`Tem certeza que deseja excluir o cliente "${confirmarExclusao.nome}"?`}
          confirmar={removerCliente}
          fechar={() => setConfirmarExclusao(null)}
        />
      )}

    </div>
  );
}

export default Clientes;

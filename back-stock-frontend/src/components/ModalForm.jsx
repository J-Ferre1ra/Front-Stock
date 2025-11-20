
export default function ModalForm({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        {children}
        <div className="modal-footer">
          <button onClick={onClose}>Fechar</button>
          <button>Salvar</button>
        </div>
      </div>
    </div>
  )
}

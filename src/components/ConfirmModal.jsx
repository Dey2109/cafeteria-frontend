import React, { useEffect } from 'react';
import './ConfirmModal.css';

export default function ConfirmModal({ mensaje, textoConfirmar, textoCancelar, peligroso, onConfirmar, onCancelar }) {
  // Permite cerrar el modal presionando la tecla Escape
  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === 'Escape') onCancelar();
    };
    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [onCancelar]);

  return (
    <div className="confirm-overlay" onClick={onCancelar}>
      <div className="confirm-tarjeta" onClick={(e) => e.stopPropagation()}>
        <p className="confirm-mensaje">{mensaje}</p>
        <div className="confirm-botones">
          <button className="confirm-btn-cancelar" onClick={onCancelar}>
            {textoCancelar}
          </button>
          <button
            className={peligroso ? 'confirm-btn-peligroso' : 'confirm-btn-normal'}
            onClick={onConfirmar}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
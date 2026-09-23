import React, { useEffect } from 'react';
import './Toast.css';

export default function Toast({ id, mensaje, tipo, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icono = tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : 'ℹ️';

  return (
    <div className={`toast toast-${tipo}`}>
      <span className="toast-icon">{icono}</span>
      <span className="toast-mensaje">{mensaje}</span>
      <button className="toast-cerrar" onClick={() => onClose(id)}>×</button>
    </div>
  );
}
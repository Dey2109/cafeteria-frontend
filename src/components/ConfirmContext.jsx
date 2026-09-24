import React, { createContext, useContext, useState, useRef } from 'react';
import ConfirmModal from './ConfirmModal';

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [config, setConfig] = useState(null);
  const resolverRef = useRef(null);

  const confirmar = (mensaje, opciones = {}) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setConfig({
        mensaje,
        textoConfirmar: opciones.textoConfirmar || 'Confirmar',
        textoCancelar: opciones.textoCancelar || 'Cancelar',
        peligroso: opciones.peligroso ?? true
      });
    });
  };

  const manejarRespuesta = (resultado) => {
    if (resolverRef.current) {
      resolverRef.current(resultado);
    }
    setConfig(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirmar }}>
      {children}
      {config && (
        <ConfirmModal
          mensaje={config.mensaje}
          textoConfirmar={config.textoConfirmar}
          textoCancelar={config.textoCancelar}
          peligroso={config.peligroso}
          onConfirmar={() => manejarRespuesta(true)}
          onCancelar={() => manejarRespuesta(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => useContext(ConfirmContext);
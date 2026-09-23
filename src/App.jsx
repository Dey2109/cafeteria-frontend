import React from 'react';
import './App.css';
import FormularioVenta from './components/FormularioVenta';
import ListaVentas from './components/ListaVentas';

function App() {
  return (
    <div className="pagina">
      <div className="tarjeta">
        <div className="franja" />
        <header className="encabezado">
          {/* Ícono decorativo hecho en SVG: no depende de internet para cargar, 
              a diferencia de una foto, y se adapta al color de la paleta */}
          <svg className="icono-taza" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24h32v18a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10V24z" fill="none" stroke="currentColor" strokeWidth="3"/>
            <path d="M44 28h4a7 7 0 0 1 0 14h-4" fill="none" stroke="currentColor" strokeWidth="3"/>
            <path d="M18 14c0 3 3 3 3 6M27 14c0 3 3 3 3 6M36 14c0 3 3 3 3 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <h1>Cafetería Escolar</h1>
          <p>Registro diario de ventas</p>
        </header>

        <FormularioVenta />
        <ListaVentas />
      </div>
    </div>
  );
}

export default App;
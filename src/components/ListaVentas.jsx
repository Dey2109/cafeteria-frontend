import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';
import { useToast } from './ToastContext';
import './ListaVentas.css';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  const { addToast } = useToast();

  const cargarVentas = () => {
    setCargando(true);
    api.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => {
        console.error('Error al obtener ventas:', err);
        addToast('Error al cargar las ventas.', 'error');
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      api.delete(`/ventas/${id}`)
        .then(() => {
          addToast('Venta eliminada correctamente.', 'success');
          cargarVentas();
          if (ventaSeleccionada && ventaSeleccionada.id === id) {
            setVentaSeleccionada(null);
          }
        })
        .catch(err => {
          console.error('Error al eliminar venta:', err);
          addToast('Error al eliminar la venta.', 'error');
        });
    }
  };

  const manejarActualizacion = () => {
    cargarVentas();
    setVentaSeleccionada(null);
  };

  if (cargando) {
    return (
      <div className="contenedor-tabla">
        <p className="cargando">Cargando ventas…</p>
      </div>
    );
  }

  return (
    <div className="contenedor-tabla">
      {ventas.length === 0 ? (
        <p className="vacio">Todavía no hay ventas registradas hoy.</p>
      ) : (
        <table className="tabla-ventas">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td data-label="Estudiante">{v.estudiante}</td>
                <td data-label="Producto">
                  <span className="producto-con-icono">
                    <img 
                      src={v.producto_imagen || 'https://cdn-icons-png.flaticon.com/512/720/720826.png'} 
                      alt={v.producto} 
                      className="miniatura-tabla" 
                    />
                    {v.producto}
                  </span>
                </td>
                <td data-label="Cantidad" className="centrado">{v.cantidad}</td>
                <td data-label="Precio">${Number(v.precio).toFixed(2)}</td>
                <td data-label="Total" className="total">${Number(v.total).toFixed(2)}</td>
                <td data-label="Fecha">{v.fecha ? v.fecha.split('T')[0] : ''}</td>
                <td data-label="Acciones">
                  <div className="grupo-acciones">
                    <button className="btn-editar" onClick={() => setVentaSeleccionada(v)}>
                      Editar
                    </button>
                    <button className="btn-eliminar" onClick={() => eliminarVenta(v.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {ventaSeleccionada && (
        <div className="panel-edicion">
          <button className="btn-cancelar" onClick={() => setVentaSeleccionada(null)}>
            Cancelar edición
          </button>
          <EditarVenta venta={ventaSeleccionada} onUpdate={manejarActualizacion} />
        </div>
      )}
    </div>
  );
}

export default ListaVentas;
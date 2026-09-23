import React, { useState, useEffect } from 'react';
import { api } from '../api'; // ✅ Intercomunicador dinámico
import { useToast } from './ToastContext';
import './EditarVenta.css';

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState({
    estudiante_id: venta.estudiante_id,
    producto_id: venta.producto_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha ? venta.fecha.split('T')[0] : ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);
  
  const { addToast } = useToast();

  useEffect(() => {
    // ✅ CAMBIO: Usamos api.get en lugar de axios.get con URL fija
    api.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error('Error al cargar estudiantes:', err));
      
    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ CAMBIO: Usamos api.put en lugar de axios.put con URL fija
    api.put(`/ventas/${venta.id}`, formData)
      .then(() => {
        addToast('Venta actualizada correctamente.', 'success');
        onUpdate();
      })
      .catch(err => {
        console.error('Error al actualizar venta:', err);
        addToast('Error al actualizar la venta.', 'error');
      });
  };

  const productoSeleccionado = productos.find(p => p.id == formData.producto_id);

  return (
    <div className="contenedor-editar">
      <h3>Editar venta #{venta.id}</h3>
      
      {productoSeleccionado && (
        <div className="vista-previa-producto">
          <img 
            src={productoSeleccionado.imagen || 'https://cdn-icons-png.flaticon.com/512/720/720826.png'} 
            alt={productoSeleccionado.nombre} 
            className="miniatura-producto" 
          />
          <div className="info-previa">
            <strong>{productoSeleccionado.nombre}</strong>
            <span className="precio-previa">${Number(productoSeleccionado.precio).toFixed(2)}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario-editar">
        <select
          name="estudiante_id"
          value={formData.estudiante_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione estudiante</option>
          {estudiantes.map(e => (
            <option key={e.id} value={e.id}>
              {e.nombre} - {e.grupo}
            </option>
          ))}
        </select>
        <select
          name="producto_id"
          value={formData.producto_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} - ${p.precio}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          min="1"
          required
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-guardar">
          Actualizar venta
        </button>
      </form>
    </div>
  );
}

export default EditarVenta;
import React, { useState, useEffect } from 'react';
import { api } from '../api'; // ✅ CAMBIO 1: Usamos nuestro intercomunicador dinámico
import { useToast } from './ToastContext';
import './FormularioVenta.css';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [enviando, setEnviando] = useState(false);
  
  const { addToast } = useToast();

  useEffect(() => {
    // ✅ CAMBIO 2: api.get en lugar de axios.get con URL fija
    api.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error('Error al cargar estudiantes:', err));
      
    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const productoSeleccionado = productos.find(p => p.id == formData.producto_id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    
    // ✅ CAMBIO 3: api.post en lugar de axios.post con URL fija
    api.post('/ventas', formData)
      .then(() => {
        addToast('Venta registrada correctamente.', 'success');
        setFormData({ estudiante_id: '', producto_id: '', cantidad: '', fecha: '' });
      })
      .catch(err => {
        console.error('Error al registrar venta:', err);
        addToast('Ocurrió un error al registrar la venta.', 'error');
      })
      .finally(() => setEnviando(false));
  };

  return (
    <div className="contenedor-formulario">
      <h2>Registrar nueva venta</h2>
      
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

      <form onSubmit={handleSubmit} className="formulario-venta">
        <select name="estudiante_id" value={formData.estudiante_id} onChange={handleChange} required>
          <option value="">Seleccione estudiante</option>
          {estudiantes.map(e => (
            <option key={e.id} value={e.id}>{e.nombre} - {e.grupo}</option>
          ))}
        </select>
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
          <option value="">Seleccione producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
          ))}
        </select>
        <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} min="1" required />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <button type="submit" disabled={enviando}>
          {enviando ? 'Registrando…' : 'Registrar venta'}
        </button>
      </form>
    </div>
  );
}

export default FormularioVenta;
import React, { useState } from 'react';
import axios from 'axios';

function SubirImagen({ onImagenSubida }) {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  const manejarCambioArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setVistaPrevia(URL.createObjectURL(file));
    }
  };

  const subirImagen = async () => {
    if (!archivo) return;

    setSubiendo(true);
    const formData = new FormData();
    formData.append('imagen', archivo);

    try {
      const res = await axios.post('http://localhost:3000/upload-imagen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Pasar la URL de Cloudinary al componente padre
      onImagenSubida(res.data.url);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="subir-imagen">
      <input
        type="file"
        accept="image/*"
        onChange={manejarCambioArchivo}
        disabled={subiendo}
      />
      
      {vistaPrevia && (
        <div className="vista-previa-imagen">
          <img src={vistaPrevia} alt="Vista previa" />
        </div>
      )}
      
      {archivo && (
        <button 
          onClick={subirImagen} 
          disabled={subiendo}
          className="btn-subir"
        >
          {subiendo ? 'Subiendo...' : 'Subir a Cloudinary'}
        </button>
      )}
    </div>
  );
}

export default SubirImagen;
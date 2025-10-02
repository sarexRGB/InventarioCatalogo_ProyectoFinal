import React, { useState, useEffect } from 'react';
import CrudInventario from '../services/CrudInventario';
import InventoryCard from './InventoryCard';
import ImagenModal from './ImagenModal';
import '../styles/CatalogoPublic.css'

function CatalogoAlquiler() {
  const [alquilerItems, setAlquilerItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null)
  
  useEffect(() => {
    const fetchAlquilerItems = async () => {
      try {
        const data = await CrudInventario.getInventario();
        const filteredData = data.filter(item => item.paraAlquiler);
        setAlquilerItems(filteredData);
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el catálogo de alquiler.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchAlquilerItems();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Cargando catálogo de alquiler...</div>;
  }

  return (
    <div>
      <div className="catalogPage">
        <div className="headerAlquiler">
          <h1>Catálogo de Alquiler</h1>
          <p>Explora la maquinaria y herramientas disponibles para alquiler.</p>
        </div>
        {/* <div className="searchFilterBar">
          <div className="searchInputGroup">
            <Search size={20} />
            <input type="text" placeholder="Buscar equipos y herramientas..." />
          </div>
          <select className="filterSelect">
            <option>Todas las Categorías</option>
          </select>
          <select className="filterSelect">
            <option>Todos los Precios</option>
          </select>
        </div> */}
        <div className="inventoryListGrid">
          {alquilerItems.map((item) => (
            <InventoryCard
            key={item.id}
            item={item}
            showImage={true}
            onImageClick={handleImageClick}
            viewType="Alquiler"
            />
          ))}
        </div>
      </div>
      <ImagenModal imageUrl={selectedImage} onClose={handleCloseImageModal} />
    </div>
  )
}

export default CatalogoAlquiler
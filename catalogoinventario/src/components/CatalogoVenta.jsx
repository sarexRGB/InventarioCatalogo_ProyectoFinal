import React, { useState, useEffect } from 'react';
import CrudInventario from '../services/CrudInventario';
import InventoryCard from './InventoryCard';
import ImagenModal from './ImagenModal';
import '../styles/CatalogoPublic.css'

function CatalogoVenta() {
  const [ventaItems, setVentaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchVentaItems = async () => {
      try {
        const data = await CrudInventario.getInventario();
        const filteredData = data.filter(item => item.paraVenta);
        setVentaItems(filteredData);
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el catálogo de venta.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchVentaItems();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Cargando catálogo de venta...</div>;
  }

  return (
    <div>
      <div className="catalogPage">
        <div className="headerVenta">
          <h1>Catálogo de Venta</h1>
          <p>Explora la maquinaria y herramientas disponibles para la venta.</p>
        </div>
        {/* <div className="searchFilterBar">
                    <div className="searchInputGroup">
                        <Search size={20} />
                        <input type="text" placeholder="Buscar productos, marcas o modelos..." />
                    </div>
                    <select className="filterSelect">
                        <option>Todas las Categorías</option>
                    </select>
                    <select className="filterSelect">
                        <option>Todas las Condiciones</option>
                    </select>
                    <select className="filterSelect">
                        <option>Todos los Precios</option>
                    </select>
                </div> */}
        <div className="productGrid">
          {ventaItems.map((item) => (
            <InventoryCard
            key={item.id}
            item={item}
            showImage={true}
            onImageClick={handleImageClick}
            viewType="Venta"
            />
          ))}
        </div>
      </div>
      <ImagenModal imageUrl={selectedImage} onClose={handleCloseImageModal} />
    </div>
  )
}

export default CatalogoVenta
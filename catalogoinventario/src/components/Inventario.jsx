import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import '../styles/Inventario.css';
import InventoryCard from './InventoryCard';
import CrudInventario from '../services/CrudInventario';


function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null)

  const categorias = [
    "Maquinaria Pesada",
    "Equipos de Compactación y Movimiento de Tierra",
    "Equipos de Elevación y Andamiaje",
    "Generación de Energía y Equipos Eléctricos",
    "Herramientas Eléctricas y de Demolición",
    "Equipos de Concreto",
    "Bombas y Manejo de Agua",
    "Herramientas Manuales",
    "Seguridad y Accesorios de Obra"
  ];

  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const data = await CrudInventario.getInventario();
        setInventario(data);
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el inventario.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchInventario();
  }, []);

  const addItem = async (item) => {
    try {
      const newItem = await CrudInventario.postInventario(item);
      setInventario(prev => [...prev, newItem]);
      Swal.fire('¡Éxito!', 'Ítem agregado al inventario.', 'success');
    } catch (error) {
      console.error('Error al agregar ítem:', error);
      Swal.fire('Error', 'No se pudo agregar el ítem.', 'error');
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      const result = await CrudInventario.putInventario(id, updatedItem);
      setInventario(prev => prev.map(item => item.id === id ? result : item));
      Swal.fire('¡Éxito!', 'Ítem actualizado correctamente.', 'success');
    } catch (error) {
      console.error('Error al actualizar ítem:', error);
      Swal.fire('Error', 'No se pudo actualizar el ítem.', 'error');
    }
  };

  const deleteItem = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await CrudInventario.deleteInventario(id);
          setInventario(prev => prev.filter(item => item.id !== id));
          Swal.fire('¡Eliminado!', 'El ítem ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error al eliminar ítem:', error);
          Swal.fire('Error', 'No se pudo eliminar el ítem.', 'error');
        }
      }
    });
  };

  const showInventarioModal = (itemToEdit = null) => {
    const isEditing = !!itemToEdit;
    Swal.fire({
      title: isEditing ? 'Editar Ítem' : 'Agregar Ítem',
      html: `
                <div class="swal-form-container">
                    <div class="swal-grid">
                        <div class="swal-input-group">
                            <label for="swal-codigo">Código *</label>
                            <input id="swal-codigo" class="swal2-input" placeholder="Ej: EQ-001" value="${isEditing ? itemToEdit.codigo : ''}">
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-nombre">Nombre *</label>
                            <input id="swal-nombre" class="swal2-input" placeholder="Ej: Excavadora CAT 320" value="${isEditing ? itemToEdit.nombre : ''}">
                        </div>
                    </div> 
                    
                    <div class="swal-input-group full-width">
                        <label for="swal-categoria">Categoría *</label>
                        <select id="swal-categoria" class="swal2-select">
                            <option value="">Seleccione una categoría</option>
                            ${categorias.map(cat => `
                                <option value="${cat}" ${isEditing && itemToEdit.categoria === cat ? 'selected' : ''}>
                                    ${cat}
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="swal-input-group full-width">
                        <label for="swal-descripcion">Descripción</label>
                        <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción del ítem">${isEditing ? itemToEdit.descripcion : ''}</textarea>
                    </div>
                    <div class="swal-input-group full-width">
                        <label for="swal-especificaciones">Especificaciones</label>
                        <input id="swal-especificaciones" class="swal2-input" placeholder="Separar con comas" value="${isEditing ? (itemToEdit.especificaciones || []).join(', ') : ''}">
                    </div>
                    
                    <div class="swal-grid">
                        <div class="swal-input-group">
                            <label for="swal-condicion">Condición</label>
                            <select id="swal-condicion" class="swal2-select">
                                <option value="Nuevo">Nuevo</option>
                                <option value="Excelente">Excelente</option>
                                <option value="Reacondicionado">Reacondicionado</option>
                                <option value="Bueno">Bueno</option>
                                <option value="Regular">Regular</option>
                            </select>
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-ubicacion">Ubicación</label>
                            <input id="swal-ubicacion" class="swal2-input" placeholder="Ej: Bodega A" value="${isEditing ? itemToEdit.ubicacion : ''}">
                        </div>
                    </div>
                    <div class="swal-input-group full-width">
                        <label for="swal-imagen">URL de Imagen</label>
                        <input id="swal-imagen" class="swal2-input" placeholder="https://..." value="${isEditing ? itemToEdit.imagen : ''}">
                    </div>
                    
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
                    
                    <div class="swal-input-group full-width" style="display: flex; justify-content: space-around; gap: 10px;">
                        <div class="checkbox-container">
                            <input type="checkbox" id="swal-paraAlquiler" ${isEditing && itemToEdit.paraAlquiler ? 'checked' : ''}>
                            <label for="swal-paraAlquiler">Para Alquiler</label>
                        </div>
                        <div class="checkbox-container">
                            <input type="checkbox" id="swal-paraVenta" ${isEditing && itemToEdit.paraVenta ? 'checked' : ''}>
                            <label for="swal-paraVenta">Para Venta</label>
                        </div>
                    </div>
                    
                    <div id="alquiler-fields" class="full-width" style="display: none;">
                        <div class="swal-grid">
                            <div class="swal-input-group">
                                <label for="swal-tarifa-diaria">Tarifa Diaria *</label>
                                <input id="swal-tarifa-diaria" class="swal2-input" type="number" placeholder="0" value="${isEditing && itemToEdit.preciosAlquiler ? itemToEdit.preciosAlquiler.diario : ''}">
                            </div>
                            <div class="swal-input-group">
                                <label for="swal-estado-alquiler">Estado</label>
                                <select id="swal-estado-alquiler" class="swal2-select">
                                    <option value="Disponible">Disponible</option>
                                    <option value="Alquilado">Alquilado</option>
                                    <option value="En Reparación">En Reparación</option>
                                    <option value="Fuera de Servicio">Fuera de Servicio</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div id="venta-fields" class="full-width" style="display: none;">
                        <div class="swal-grid">
                            <div class="swal-input-group">
                                <label for="swal-precio-venta">Precio *</label>
                                <input id="swal-precio-venta" class="swal2-input" type="number" placeholder="0" value="${isEditing && itemToEdit.precioVenta ? itemToEdit.precioVenta : ''}">
                            </div>
                            <div class="swal-input-group">
                                <label for="swal-stock">Stock</label>
                                <input id="swal-stock" class="swal2-input" type="number" placeholder="0" value="${isEditing && itemToEdit.stockVenta ? itemToEdit.stockVenta : ''}">
                            </div>
                        </div>
                        <div class="swal-grid">
                            <div class="swal-input-group">
                                <label for="swal-precio-original">Precio Original</label>
                                <input id="swal-precio-original" class="swal2-input" type="number" placeholder="Si está en oferta" value="${isEditing && itemToEdit.precioOriginalVenta ? itemToEdit.precioOriginalVenta : ''}">
                            </div>
                            <div class="swal-input-group checkbox-container">
                                <input type="checkbox" id="swal-en-oferta" ${isEditing && itemToEdit.enOferta ? 'checked' : ''}>
                                <label for="swal-en-oferta">En Oferta</label>
                            </div>
                        </div>
                        <div class="swal-input-group full-width">
                            <label for="swal-garantia">Garantía</label>
                            <input id="swal-garantia" class="swal2-input" placeholder="Ej: 1 año" value="${isEditing ? itemToEdit.garantia : ''}">
                        </div>
                    </div>
                </div>
            `,
      showCancelButton: true,
      confirmButtonText: isEditing ? 'Guardar Cambios' : 'Agregar',
      cancelButtonText: 'Cancelar',
      width: '700px',
      didOpen: (popup) => {
        if (isEditing) {
          popup.querySelector('#swal-condicion').value = itemToEdit.condicion || '';
          popup.querySelector('#swal-categoria').value = itemToEdit.categoria || '';
          if (itemToEdit.paraAlquiler) {
            popup.querySelector('#swal-estado-alquiler').value = itemToEdit.estadoAlquiler || '';
          }
        }

        const paraAlquilerCheckbox = popup.querySelector('#swal-paraAlquiler');
        const paraVentaCheckbox = popup.querySelector('#swal-paraVenta');
        const alquilerFields = popup.querySelector('#alquiler-fields');
        const ventaFields = popup.querySelector('#venta-fields');

        alquilerFields.style.display = (paraAlquilerCheckbox.checked || (isEditing && itemToEdit.paraAlquiler)) ? 'block' : 'none';
        ventaFields.style.display = (paraVentaCheckbox.checked || (isEditing && itemToEdit.paraVenta)) ? 'block' : 'none';

        paraAlquilerCheckbox.addEventListener('change', () => {
          alquilerFields.style.display = paraAlquilerCheckbox.checked ? 'block' : 'none';
        });

        paraVentaCheckbox.addEventListener('change', () => {
          ventaFields.style.display = paraVentaCheckbox.checked ? 'block' : 'none';
        });
      },
      preConfirm: () => {
        const codigo = Swal.getPopup().querySelector('#swal-codigo').value;
        const nombre = Swal.getPopup().querySelector('#swal-nombre').value;
        const categoria = Swal.getPopup().querySelector('#swal-categoria').value;
        const descripcion = Swal.getPopup().querySelector('#swal-descripcion').value;
        const especificaciones = Swal.getPopup().querySelector('#swal-especificaciones').value;
        const condicion = Swal.getPopup().querySelector('#swal-condicion').value;
        const ubicacion = Swal.getPopup().querySelector('#swal-ubicacion').value;
        const imagen = Swal.getPopup().querySelector('#swal-imagen').value;
        const paraAlquiler = Swal.getPopup().querySelector('#swal-paraAlquiler').checked;
        const paraVenta = Swal.getPopup().querySelector('#swal-paraVenta').checked;

        if (!codigo || !nombre || !categoria || (!paraAlquiler && !paraVenta)) {
          Swal.showValidationMessage('Código, Nombre, Categoría y al menos un tipo son obligatorios.');
          return false;
        }

        const diario = paraAlquiler ? Number(Swal.getPopup().querySelector('#swal-tarifa-diaria').value) : null;
        const estadoAlquiler = paraAlquiler ? Swal.getPopup().querySelector('#swal-estado-alquiler').value : null;
        const precioVenta = paraVenta ? Number(Swal.getPopup().querySelector('#swal-precio-venta').value) : null;
        const stockVenta = paraVenta ? Number(Swal.getPopup().querySelector('#swal-stock').value) : null;
        const enOferta = paraVenta ? Swal.getPopup().querySelector('#swal-en-oferta').checked : false;
        const precioOriginalVenta = paraVenta && Swal.getPopup().querySelector('#swal-precio-original').value ? Number(Swal.getPopup().querySelector('#swal-precio-original').value) : null;
        const garantia = paraVenta ? Swal.getPopup().querySelector('#swal-garantia').value : null;

        const item = {
          codigo,
          nombre,
          categoria,
          descripcion,
          condicion,
          ubicacion,
          especificaciones: especificaciones.split(',').map(s => s.trim()).filter(s => s),
          imagen,
          paraAlquiler,
          paraVenta,
          preciosAlquiler: diario !== null ? {
            diario,
            semanal: diario * 6,
            mensual: diario * 22,
          } : null,
          estadoAlquiler,
          precioVenta,
          stockVenta,
          enOferta,
          precioOriginalVenta,
          garantia,
        };

        if (paraAlquiler && !diario) {
          Swal.showValidationMessage('La Tarifa Diaria es obligatoria para ítems de alquiler.');
          return false;
        }

        if (paraVenta && !precioVenta) {
          Swal.showValidationMessage('El Precio es obligatorio para ítems de venta.');
          return false;
        }

        return item;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (isEditing) {
          updateItem(itemToEdit.id, result.value);
        } else {
          addItem(result.value);
        }
      }
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Cargando inventario...</div>;
  };

  return (
    <div>
      <div className="inventario">
        <div className="inventarioHeader">
          <div className="titleGroup">
            <h2>Inventario de Equipos</h2>
            <p>Gestión de seguimiento de herramientas y equipos</p>
          </div>
          <button className="addBtn" onClick={() => showInventarioModal()}><Plus size={18} />Agregar Equipo</button>
        </div>
        <div className="inventorySearchAndDFilter">
          <div className="inventorySearchBar">
            <Search className="searchIcon" size={18} />
            <input type="text" placeholder='Buscar equipos...' />
          </div>
        </div>

        <div className="inventoryListGrid">
          {inventario.map((item) => (
            <InventoryCard
              key={item.id}
              item={item}
              onEdit={() => showInventarioModal(item)}
              onDelete={() => deleteItem(item.id)}
              onImageClick={handleImageClick}
              showImage={false}
              showStock={true}
            />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Inventario;
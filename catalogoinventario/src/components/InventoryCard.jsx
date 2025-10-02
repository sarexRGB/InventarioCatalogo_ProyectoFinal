import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Package } from 'lucide-react'; 
import '../styles/InventoryCard.css';

function InventoryCard({ item, onEdit, onDelete, showImage = true, onImageClick, showStock = false, viewType }) {
    const [openMenu, setOpenMenu] = useState(false);
    const showAdminActions = onEdit && onDelete;
    const formatPrice = (price) => price ? `₡${price.toLocaleString('es-CR')}` : 'Consultar';

    const getEstadoClass = () => {
        if (item.paraAlquiler) {
            switch (item.estadoAlquiler) {
                case "Disponible": return "estado-disponible";
                case "Alquilado": return "estado-alquilado";
                case "En Reparación": return "estado-reparacion";
                case "Fuera de Servicio": return "estado-fuera-servicio";
                default: return "";
            }
        }
        return "";
    };

    const getEstadoInfo = () => {
        if (item.paraAlquiler) {
            return item.estadoAlquiler;
        }
        if (item.paraVenta && !item.paraAlquiler) {
            return "Venta"; 
        }
        return "No definido";
    };

    const getAlquilerPrice = () => {
        return item.preciosAlquiler?.diario ? `₡${item.preciosAlquiler.diario.toLocaleString('es-CO')}` : 'N/A';
    };

    const getVentaPrice = () => {
        return item.precioVenta ? `₡${item.precioVenta.toLocaleString('es-CO')}` : 'N/A';
    };

    const handleImageClick = () => {
        if (item.imagen && onImageClick) {
            onImageClick(item.imagen);
        }
    };

    return (
        <div className="inventoryCard">
            {item.imagen && showImage && (
                <div className="cardImageContainer" onClick={handleImageClick}>
                    <img src={item.imagen} alt={item.nombre} className="cardImage" />
                </div>
            )}
            <div className="cardHeader">
                <div className="headerLeft">
                    <h3 className="equipoNombre">{item.nombre}</h3>
                    
                    {showStock && (
                        <>
                            {item.paraVenta && (
                                <span className={`estadoTag ${item.stockVenta > 0 ? 'estado-disponible' : 'estado-fuera-servicio'}`}>
                                    Stock Venta: {item.stockVenta}
                                </span>
                            )}
                            {item.paraAlquiler && (
                                <span className={`estadoTag ${getEstadoClass()}`}>
                                    {getEstadoInfo()}
                                </span>
                            )}
                        </>
                    )}
                    
                </div>
                {showAdminActions && (
                    <div className="cardMenu">
                        <button className="menuBtn" onClick={() => setOpenMenu(!openMenu)}>
                            <MoreHorizontal size={18} />
                        </button>
                        {openMenu && (
                            <div className="dropdownMenu">
                                <button onClick={() => { onEdit(); setOpenMenu(false); }} className="menuItem">
                                    <Edit size={16} /> Editar
                                </button>
                                <button onClick={() => { onDelete(); setOpenMenu(false); }} className="menuItem delete-item">
                                    <Trash2 size={16} /> Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="card-info">
                {showStock && (
                    <>
                        <div className="infoGroup">
                            <p className="infoLabel">Código:</p>
                            <p className="infoValue">{item.codigo}</p>
                        </div>
                        <div className="infoGroup">
                            <p className="infoLabel">Ubicación:</p>
                            <p className="infoValue">{item.ubicacion}</p>
                        </div>
                    </>
                )}
                
                <div className="infoGroup">
                    <p className="infoLabel">Categoría:</p>
                    <p className="infoValue">{item.categoria}</p>
                </div>
                
                {item.paraVenta && viewType === 'Venta' && (
                    <>
                        <div className="infoGroup">
                            <p className="infoLabel">Precio Venta:</p>
                            <p className="infoValue">{getVentaPrice()}</p>
                        </div>
                        <div className="infoGroup">
                            <p className="infoLabel">Garantía:</p>
                            <p className="infoValue">{item.garantia || 'N/A'}</p>
                        </div>
                    </>
                )}

                {item.paraAlquiler && viewType === 'Alquiler' && (
                    <>
                        <div className="infoGroup">
                            <p className="infoLabel">Tarifa Diaria:</p>
                            <p className="infoValue">{getAlquilerPrice()}</p>
                        </div>
                        <div className="infoGroup">
                            <p className="infoLabel">Condición:</p>
                            <p className="infoValue">{item.condicion}</p>
                        </div>
                    </>
                )}
                
                {showStock && !viewType && (
                    <>
                         {item.paraVenta && (
                            <div className="infoGroup">
                                <p className="infoLabel">Precio Venta:</p>
                                <p className="infoValue">{getVentaPrice()}</p>
                            </div>
                        )}
                        {item.paraAlquiler && (
                            <div className="infoGroup">
                                <p className="infoLabel">Tarifa Diaria:</p>
                                <p className="infoValue">{getAlquilerPrice()}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default InventoryCard;
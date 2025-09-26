import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import '../styles/InventoryCard.css';

function InventoryCard({ item, onEdit, onDelete, showImage }) {
    const [openMenu, setOpenMenu] = useState(false);
    const showAdminActions = onEdit && onDelete;

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
        if (item.paraVenta && !item.paraAlquiler) {
            return `Stock: ${item.stockVenta}`;
        }
        if (item.paraAlquiler) {
            return item.estadoAlquiler;
        }
        return "No definido";
    };

    const getTarifa = () => {
        if (item.paraVenta && item.precioVenta) {
            return `$${item.precioVenta.toLocaleString('es-CO')}`;
        }
        if (item.paraAlquiler && item.preciosAlquiler) {
            return `$${item.preciosAlquiler.diario.toLocaleString('es-CO')} /día`;
        }
        return "N/A";
    };

    return (
        <div className="inventoryCard">
            {showImage && item.imagen && (
                <div className="card-image-container">
                    <img src={item.imagen} alt={item.nombre} className="card-image" />
                </div>
            )}
            <div className="cardHeader">
                <div className="headerLeft">
                    <h3 className="equipoNombre">{item.nombre}</h3>
                    <span className={`estadoTag ${getEstadoClass()}`}>{getEstadoInfo()}</span>
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
                <div className="infoGroup">
                    <p className="infoLabel">ID:</p>
                    <p className="infoValue">{item.id}</p>
                </div>
                <div className="infoGroup">
                    <p className="infoLabel">Categoría:</p>
                    <p className="infoValue">{item.categoria}</p>
                </div>
                <div className="infoGroup">
                    <p className="infoLabel">Ubicación:</p>
                    <p className="infoValue">{item.ubicacion}</p>
                </div>
                
                {item.paraVenta && (
                    <>
                        <div className="infoGroup">
                            <p className="infoLabel">Tarifa/Precio:</p>
                            <p className="infoValue">{getTarifa()}</p>
                        </div>
                        <div className="infoGroup">
                            <p className="infoLabel">Stock:</p>
                            <p className="infoValue">{item.stockVenta}</p>
                        </div>
                        <div className="infoGroup">
                            <p className="infoLabel">Garantía:</p>
                            <p className="infoValue">{item.garantia || 'N/A'}</p>
                        </div>
                    </>
                )}

                {item.paraAlquiler && !item.paraVenta && (
                    <>
                        <div className="infoGroup">
                            <p className="infoLabel">Tarifa/Precio:</p>
                            <p className="infoValue">{getTarifa()}</p>
                        </div>
                        <div className="infoGroup">
                            <p className="infoLabel">Condición:</p>
                            <p className="infoValue">{item.condicion}</p>
                        </div>
                    </>
                )}

                {item.paraAlquiler && item.paraVenta && (
                    <>
                        <div className="infoGroup">
                            <p className="infoLabel">Precio:</p>
                            <p className="infoValue">${item.precioVenta.toLocaleString('es-CO')}</p>
                        </div>
                        <div className="infoGroup">
                            <p className="infoLabel">Tarifa Diaria:</p>
                            <p className="infoValue">${item.preciosAlquiler.diario.toLocaleString('es-CO')}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default InventoryCard;
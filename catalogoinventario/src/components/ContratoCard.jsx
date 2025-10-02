import React, { useState } from 'react'
import { MoreHorizontal, User, Calendar, Truck, ReceiptCentIcon, MapPin, FileText, CheckCircle } from "lucide-react";

function ContratoCard( {contrato, onEdit, onFinalize, onStatusChange} ) {
    const [openMenu, setOpenMenu] = useState(false)

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "Activo":
            case "En Curso":
                return "estado-activo";
            case "Pendiente Entrega":
                return "estado-pendiente-entrega";
            case "Cerrado":
                return "estado-finalizado";
            default:
                return "";
        }
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setOpenMenu(!openMenu);
    };
    
    const handleStatusChangeClick = (e, newStatus) => {
        e.stopPropagation();
        setOpenMenu(false);
        if (onStatusChange) {
            onStatusChange(contrato.id, newStatus);
        }
    };

    const formatPeriodo = () => {
        if (contrato.tipo === 'Alquiler' && contrato.periodoInicio && contrato.periodoFin) {
            return `${contrato.periodoInicio} - ${contrato.periodoFin}`;
        }
        return contrato.tipo === 'Venta' ? 'Venta Única' : 'N/A';
    };

    const showChofer = contrato.metodoEntrega === 'Entrega con Chofer';
    const nombrePrincipal = contrato.empresa || contrato.contacto || 'Cliente No Definido';

    return (
        <div>
            <div className="contratoCard">
                <div className="cardHeader">
                    <div className="contratoIdGroup">
                        <h3>Contrato #{contrato.id}</h3>
                        <span className={`estadoTag ${getEstadoClass(contrato.estado)}`}>{contrato.estado}</span>
                    </div>
                    <div className="contratoTotalGroup">
                        <p>{contrato.valorTotal ? `₡${contrato.valorTotal.toFixed(2)}` : 'N/A'}</p>
                        <span className="totalLabel">Valor Total</span>
                    </div>
                    <div className="cardMenu">
                        <button className="menuBtn" onClick={handleMenuClick}>
                            <MoreHorizontal size={18} />
                        </button>
                        {openMenu && (
                            <div className="dropdownMenu">
                                
                                {contrato.estado === 'Pendiente Entrega' && onStatusChange && (
                                    <button 
                                        className="menuItem action-change-status" 
                                        onClick={(e) => handleStatusChangeClick(e, 'Activo')}
                                    >
                                        <CheckCircle size={16} /> Marcar como Entregado
                                    </button>
                                )}
                                
                                <button className="menuItem" onClick={() => { onEdit(); setOpenMenu(false); }}>
                                    <FileText size={16} /> Ver/Editar
                                </button>
                                
                                {contrato.estado !== 'Cerrado' && onFinalize && (
                                    <button className="menuItem delete-item" onClick={() => { onFinalize(); setOpenMenu(false); }}>
                                        <Truck size={16} /> Marcar como Cerrado
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <p className="empresaNombre">{nombrePrincipal}</p>

                <div className="cardDetailsGrid">
                    <div className="detailGroup">
                        <User size={16} className="detailIcon" />
                        <div className="detailInfo">
                            <p className="detailLabel">{contrato.tipoCliente === 'Empresa' ? 'Contacto' : 'Tipo Cliente'}</p>
                            <p className="detailValue">
                                {contrato.tipoCliente === 'Empresa' ? (contrato.contacto || 'N/A') : (contrato.tipoCliente || 'N/A')}
                            </p>
                        </div>
                    </div>
                    <div className="detailGroup">
                        <Calendar size={16} className="detailIcon" />
                        <div className="detailInfo">
                            <p className="detailLabel">Período/Tipo</p>
                            <p className="detailValue">{formatPeriodo()}</p>
                        </div>
                    </div>
                    
                    <div className="detailGroup">
                        {showChofer ? (
                            <>
                                <Truck size={16} className="detailIcon" />
                                <div className="detailInfo">
                                    <p className="detailLabel">Chofer Asignado</p>
                                    <p className="detailValue">{contrato.chofer || 'Pendiente'}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <MapPin size={16} className="detailIcon" />
                                <div className="detailInfo">
                                    <p className="detailLabel">Logística</p>
                                    <p className="detailValue">Cliente Retira</p>
                                </div>
                            </>
                        )}
                    </div>
                    
                    <div className="detailGroup">
                        <ReceiptCentIcon size={16} className="detailIcon" />
                        <div className="detailInfo">
                            <p className="detailLabel">Valor Diario</p>
                            <p className="detailValue">
                                {contrato.tipo === 'Alquiler' && contrato.valorDiario 
                                    ? `₡${contrato.valorDiario.toFixed(2)}` 
                                    : contrato.tipo === 'Venta' ? 'N/A' : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="equiposContainer">
                    <p className="equiposLabel">Equipos Incluidos:</p>
                    <div className="equiposList">
                        {contrato.equipos && contrato.equipos.length > 0 ? (
                            contrato.equipos.map((eq, idx) => (
                                <span key={idx} className="equipoItem">{eq}</span>
                            ))
                        ) : (
                            <span className="equipoItem no-equipos">Ninguno</span>
                        )}
                    </div>
                </div>

                {showChofer && (
                    <div className="direccionContainer">
                        <MapPin size={16} className="direccionIcon" />
                        <p className="direccionText">Dirección de Entrega: <span className="direccion-value">{contrato.direccionEntrega || 'Pendiente de Definir'}</span></p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContratoCard
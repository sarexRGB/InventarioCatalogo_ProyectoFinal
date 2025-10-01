import React, { useState } from 'react'
import { MoreHorizontal, User, Calendar, Truck, DollarSign, MapPin } from "lucide-react";

function ContratoCard( {contrato, onEdit, onDelete} ) {
    const [openMenu, setOpenMenu] = useState(false)

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "Activo":
                return "estado-activo";
            case "Pendiente Entrega":
                return "estado-pendiente-entrega";
            case "Finalizado":
                return "estado-finalizado";
            default:
                return "";
        }
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setOpenMenu(!openMenu);
    };

    const formatPeriodo = () => {
        if (contrato.periodoInicio && contrato.periodoFin) {
            return `${contrato.periodoInicio} - ${contrato.periodoFin}`;
        }
        return 'N/A';
    };

  return (
    <div>
        <div className="contratoCard">
            <div className="cardHeader">
                <div className="contratoIdGroup">
                    <h3>Contrato #{contrato.id}</h3>
                    <span className={`estadoTag ${getEstadoClass(contrato.estado)}`}>{contrato.estado}</span>
                </div>
                <div className="contratoTotalGroup">
                    <p>{contrato.valorTotal ? `$${contrato.valorTotal.toFixed(2)}` : 'N/A'}</p>
                    <span className="totalLabel">Valor Total</span>
                </div>
                <div className="cardMenu">
                    <button className="menuBtn" onClick={handleMenuClick}>
                        <MoreHorizontal size={18} />
                    </button>
                    {openMenu && (
                        <div className="dropdownMenu">
                            <button className="menuItem" onClick={() => { onEdit(); setOpenMenu(false); }}>
                                <FileText size={16} /> Ver/Editar
                            </button>
                            <button className="menuItem delete-item" onClick={() => { onDelete(); setOpenMenu(false); }}>
                                <Truck size={16} /> Cerrar Contrato
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <p className="empresaNombre">{contrato.empresa || 'Empresa No Asignada'}</p>

            <div className="cardDetailsGrid">
                <div className="detailGroup">
                    <User size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Contacto</p>
                        <p className="detailValue">{contrato.contacto || 'N/A'}</p>
                    </div>
                </div>
                <div className="detailGroup">
                    <Calendar size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Período</p>
                        <p className="detailValue">{formatPeriodo()}</p>
                    </div>
                </div>
                <div className="detailGroup">
                    <Truck size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Chofer Asignado</p>
                        <p className="detailValue">{contrato.chofer || 'Pendiente'}</p>
                    </div>
                </div>
                <div className="detailGroup">
                    <DollarSign size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Valor Diario</p>
                        <p className="detailValue">{contrato.valorDiario ? `$${contrato.valorDiario.toFixed(2)}` : 'N/A'}</p>
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

            <div className="direccionContainer">
                <MapPin size={16} className="direccionIcon" />
                <p className="direccionText">Dirección de Entrega: <span className="direccion-value">{contrato.direccionEntrega || 'N/A'}</span></p>
            </div>
        </div>

    </div>
  )
}

export default ContratoCard
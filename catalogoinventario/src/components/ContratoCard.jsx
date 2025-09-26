import React, { useState } from 'react'
import { MoreHorizontal, User, Calendar, Truck, DollarSign, MapPin } from "lucide-react";

function ContratoCard( {contrato} ) {
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

  return (
    <div>
        <div className="contratoCard">
            <div className="cardHeader">
                <div className="contratoIdGroup">
                    <h3>Contrato #{contrato.id}</h3>
                    <span className={`estadoTag ${getEstadoClass(contrato.estado)}`}>{contrato.estado}</span>
                </div>
                <div className="contratoTotalGroup">
                    <p>{contrato.valorTotal}</p>
                    <span className="totalLabel">Valor Total</span>
                </div>
                <div className="cardMenu">
                    <button className="menuBtn" onClick={() => setOpenMenu(!openMenu)}>
                        <MoreHorizontal size={18} />
                    </button>
                    {openMenu && (
                        <div className="dropdownMenu">
                            <a href="#" className="menuItem">Ver detalles</a>
                            <a href="#" className="menuItem">Editar</a>
                            <a href="#" className="menuItem">Eliminar</a>
                        </div>
                    )}
                </div>
            </div>

            <p className="empresaNombre">{contrato.empresa}</p>

            <div className="cardDetailsGrid">
                <div className="detailGroup">
                    <User size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Contacto</p>
                        <p className="detailValue">{contrato.contacto}</p>
                    </div>
                </div>
                <div className="detailGroup">
                    <Calendar size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Periodo</p>
                        <p className="detailValue">{contrato.periodo}</p>
                    </div>
                </div>
                <div className="detailGroup">
                    <Truck size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Chofer Asignado</p>
                        <p className="detailValue">{contrato.chofer}</p>
                    </div>
                </div>
                <div className="detailGroup">
                    <DollarSign size={16} className="detailIcon" />
                    <div className="detailInfo">
                        <p className="detailLabel">Valor Diario</p>
                        <p className="detailValue">{contrato.valorDiario}</p>
                    </div>
                </div>
            </div>

            <div className="equiposContainer">
                <p className="equiposLabel">Equipos Incluidos:</p>
                <div className="equiposList">
                    {contrato.equipos.map((eq, idx) => (
                        <span key={idx} className="equipoItem">{eq}</span>
                    ))}
                </div>
            </div>

            <div className="direccionContainer">
                <MapPin size={16} className="direccionIcon" />
                <p className="direccionText">Dirección de Entrega: <span className="direccion-value">{contrato.direccion}</span></p>
            </div>
        </div>

    </div>
  )
}

export default ContratoCard
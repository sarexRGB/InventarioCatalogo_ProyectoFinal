import React, { useState } from "react";
import { MoreHorizontal, Edit, Trash2, User, Phone, Mail, Truck, MapPin, CheckCircle } from "lucide-react";
import '../styles/ChoferesCard.css'

function ChoferCard({ chofer, onEdit, onDelete }) {
    const [openMenu, setOpenMenu] = useState(false);

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "Disponible":
                return "estado-disponible";
            case "En Ruta":
                return "estado-en-ruta";
            default:
                return "";
        }
    };

    const hasActiveService = chofer.estado === "En Ruta";

    return (
        <div>
            <div className="choferCard">
                <div className="cardContentWrapper">
                    <div className="choferAvatarGroup">
                        <div className="avatar">{chofer.iniciales}</div>
                        <div className="infoMain">
                            <div className="infoHeader">
                                <h3 className="choferName">{chofer.nombre}</h3>
                                <span className={`estadoTag ${getEstadoClass(chofer.estado)}`}>{chofer.estado}</span>
                            </div>
                            <div className="infoRow">
                                <div className="detailGroup">
                                    <Mail size={16} className="detailIcon" />
                                    <p className="detailValue">{chofer.email}</p>
                                </div>
                                <div className="detailGroup">
                                    <Phone size={16} className="detailIcon" />
                                    <p className="detailValue">{chofer.telefono}</p>
                                </div>
                                <div className="detailGroup">
                                    <User size={16} className="detailIcon" />
                                    <p className="detailValue">Licencia: {chofer.licencia?.numero}</p>
                                    {chofer.licencia?.tipo && (
                                        <span className="detailValue licenseType">Tipo: {chofer.licencia.tipo}</span>
                                    )}
                                </div>
                            </div>
                            <div className="infoRow">
                                <div className="detailGroup">
                                    <Truck size={16} className="detailIcon" />
                                    <p className="detailValue">{chofer.vehiculo} <span className="placa-text">Placa: {chofer.placa}</span></p>
                                </div>
                                <div className="detailGroup">
                                    <MapPin size={16} className="detailIcon" />
                                    <p className="detailValue">Ubicación: {chofer.ubicacion}</p>
                                </div>
                                <div className="detailGroup">
                                    <CheckCircle size={16} className="detailIcon" />
                                    <p className="detailValue">Experiencia: {chofer.experiencia}</p>
                                </div>
                            </div>
                            <div className="totalEntregasGroup">
                                <p className="totalEntregasLabel">Entregas Totales: <span className="total-entregas-value">{chofer.entregas}</span></p>
                                <p className="totalEntregasLabel">Última Entrega: <span className="total-entregas-value">{chofer.ultimaEntrega}</span></p>
                            </div>
                        </div>
                    </div>

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
                </div>
                {hasActiveService && (
                    <div className="activeServiceSection">
                        <p className="activeServiceLabel">En servicio activo</p>
                        <p className="activeServiceInfo">
                            Contrato: <span className="activeServiceValue">{chofer.servicioActivo.contrato}</span> | Última Entrega: <span className="active-service-value">{chofer.servicioActivo.ultimaEntrega}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChoferCard
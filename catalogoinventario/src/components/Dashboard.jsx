import React, { useState } from 'react'
import DashboardCard from './DashboardCard';
import '../styles/Dashboard.css'
import { Truck, CheckCircle, Clock } from 'lucide-react';

function Dashboard() {
    const [inventarioData] = useState([
        { estado: "Disponible", valor: 180, color: "#22c55e" },
        { estado: "Alquilado", valor: 45, color: "#3b82f6" },
        { estado: "En Reparación", valor: 15, color: "#f59e0b" },
        { estado: "Fuera de Servicio", valor: 7, color: "#ef4444" },
    ]);

    const [alquileresRecientes] = useState([
        { id: "R001", equipo: "Excavadora CAT 320", empresa: "Constructora ABC", chofer: "Juan Pérez", estado: "Entregado", fecha: "2024-01-15" },
        { id: "R002", equipo: "Compresor Atlas 105", empresa: "Edificaciones XYZ", chofer: "María García", estado: "Pendiente", fecha: "2024-01-16" },
        { id: "R003", equipo: "Martillo Neumático", empresa: "Obras Civiles S.A", chofer: "Carlos López", estado: "En Tránsito", fecha: "2024-01-16" },
    ]);

    const totalEquipos = 247;
    const contratosActivos = 34;
    const choferesDisponibles = 8;

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "Entregado":
                return "estado-entregado";
            case "Pendiente":
                return "estado-pendiente";
            case "En Tránsito":
                return "estado-transito";
            default:
                return "";
        }
    };

    return (
        <div>
            <div className="dashboard">
                <div className="dashboardHeader">
                    <h2>Dashboard</h2>
                    <p className='subtitulo'>Resumen general del inventario y operaciones</p>
                </div>

                <div className="metricasGrid">
                    <DashboardCard
                        title="Equipos Totales"
                        value={totalEquipos}
                        variation="+12% desde el mes pasado"
                    />
                    <DashboardCard
                        title="Contratos Activos"
                        value={contratosActivos}
                        variation="+5% desde el mes pasado"
                    />
                    <DashboardCard
                        title="Choferes Disponibles"
                        value={choferesDisponibles}
                        variation="-1 desde el mes pasado"
                    />
                </div>

                <div className="contentArea">
                    <div className="graficoCard">
                        <h3>Estado del Inventario</h3>
                        <div className="horizontalBars">
                            {inventarioData.map((d, i) => (
                                <div key={i} className="barRow">
                                    <div className="barLabelWrapper">
                                        <span className="dot" style={{ backgroundColor: d.color }}></span>
                                        <span className="barLabel">{d.estado}</span>
                                    </div>
                                    <div className="barBackground">
                                        <div
                                            className="barFill"
                                            style={{ width: `${d.valor}%`, backgroundColor: d.color }}
                                        ></div>
                                    </div>
                                    <span className="barValue">{d.valor}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="alquileresCard">
                        <h3>Alquileres Recientes</h3>
                        <ul className="alquileresList">
                            {alquileresRecientes.map((alq) => (
                                <li key={alq.id} className="alquilerItem">
                                    <div className="alquilerInfo">
                                        <p className="alquilerEquipo"><strong>{alq.equipo}</strong></p>
                                        <p className="alquilerEmpresa">{alq.empresa}</p>
                                        <p className="alquilerChofer">Chofer: {alq.chofer}</p>
                                    </div>
                                    <div className="alquilerMeta">
                                        <span className={`alquilerEstado ${getEstadoClass(alq.estado)}`}>
                                            {alq.estado === "En Tránsito" && <Truck size={14} />}
                                            {alq.estado === "Entregado" && <CheckCircle size={14} />}
                                            {alq.estado === "Pendiente" && <Clock size={14} />}
                                            {alq.estado}
                                        </span>
                                        <p className="alquilerFecha">{alq.fecha}</p>
                                        <p className="alquilerId">#{alq.id}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
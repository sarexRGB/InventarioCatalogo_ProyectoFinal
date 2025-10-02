import React, { useState, useEffect } from 'react'
import DashboardCard from './DashboardCard';
import CrudContratos from '../services/CrudContratos';
import CrudInventario from '../services/CrudInventario';
import CrudChoferes from '../services/CrudChoferes';
import '../styles/Dashboard.css'
import { Truck, CheckCircle, Clock, Loader, AlertCircle } from 'lucide-react';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [metricas, setMetricas] = useState({
        totalEquipos: 0,
        contratosActivos: 0,
        choferesDisponibles: 0,
        inventarioData: [],
        alquileresRecientes: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contratos, inventario, choferes] = await Promise.all([
                    CrudContratos.getContratos(),
                    CrudInventario.getInventario(),
                    CrudChoferes.getChoferes(),
                ]);

                const totalEquipos = inventario.length;
                const contratosActivos = contratos.filter(c => c.estado === 'Activo' || c.estado === 'Pendiente Entrega').length;
                const choferesDisponibles = choferes.filter(ch => ch.disponibilidad === 'Disponible').length;

                const estados = inventario.reduce((acc, equipo) => {
                    const estado = equipo.estadoAlquiler || 'No Definido';
                    acc[estado] = (acc[estado] || 0) + 1;
                    return acc;
                }, {});

                const inventarioDataCalculada = Object.keys(estados).map(estado => {
                    const valor = estados[estado];
                    const porcentaje = (valor / totalEquipos) * 100;

                  let color = "#95a5a6";
                    if (estado === "Disponible") color = "#22c55e";
                    if (estado === "Alquilado" || estado === "Vendido") color = "#3b82f6";
                    if (estado === "En Reparación") color = "#f59e0b";
                    if (estado === "Fuera de Servicio") color = "#ef4444";

                    return {
                        estado: estado,
                        valor: valor,
                        porcentaje: porcentaje > 0 ? Math.max(5, porcentaje) : 0,
                        color: color
                    };
                }).sort((a, b) => b.valor - a.valor);

                const alquileresRecientes = contratos
                    .filter(c => c.estado === 'Pendiente Entrega' || c.estado === 'Activo')
                    .sort((a, b) => new Date(b.id) - new Date(a.id))
                    .slice(0, 5)
                    .map(c => ({
                        id: c.id,
                        equipo: c.equipos && c.equipos.length > 0 ? c.equipos[0] + (c.equipos.length > 1 ? ` (+${c.equipos.length - 1} más)` : '') : 'N/A',
                        empresa: c.empresa || c.contacto || 'Cliente Particular',
                        chofer: c.chofer || 'N/A',
                        estado: c.estado === 'Pendiente Entrega' ? 'Pendiente' : c.estado, 
                        fecha: c.periodoInicio || 'N/A'
                    }));

                setMetricas({
                    totalEquipos,
                    contratosActivos,
                    choferesDisponibles,
                    inventarioData: inventarioDataCalculada,
                    alquileresRecientes
                });

            } catch (err) {
                console.error("Error al cargar datos del dashboard:", err);
                setError("Error al cargar los datos. Verifique la conexión a la base de datos.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "Activo":
            case "Entregado":
                return "estado-Entregado";
            
        
            case "Pendiente":
            case "Pendiente Entrega":
                return "estado-pendiente";
            case "En Tránsito":
                return "estado-transito";
            default:
                return "";
        }
    };

    if (loading) {
        return <div className="loading-state-full"><Loader className="spinner" size={40} /> Cargando Dashboard...</div>;
    }

    if (error) {
        return <div className="error-state-full"><AlertCircle size={40} /> {error}</div>;
    }

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
                        value={metricas.totalEquipos}
                        variation={`Alquilados: ${metricas.inventarioData.find(d => d.estado === 'Alquilado')?.valor || 0}`}
                    />
                    <DashboardCard
                        title="Contratos Activos"
                        value={metricas.contratosActivos}
                        variation="Activos y Pendientes de Entrega"
                    />
                    <DashboardCard
                        title="Choferes Disponibles"
                        value={metricas.choferesDisponibles}
                        variation={`Total Choferes: ${metricas.choferesDisponibles}`}
                    />
                </div>

                <div className="contentArea">
                    <div className="graficoCard">
                        <h3>Estado del Inventario ({metricas.totalEquipos} total)</h3>
                        <div className="horizontalBars">
                            {metricas.inventarioData.map((d, i) => (
                                <div key={i} className="barRow">
                                    <div className="barLabelWrapper">
                                        <span className="dot" style={{ backgroundColor: d.color }}></span>
                                        <span className="barLabel">{d.estado}</span>
                                    </div>
                                    <div className="barBackground">
                                        <div
                                            className="barFill"
                                            style={{ width: `${d.porcentaje}%`, backgroundColor: d.color }}
                                        ></div>
                                    </div>
                                    <span className="barValue">{d.valor}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="alquileresCard">
                        <h3>Contratos Recientes (Activos/Pendientes)</h3>
                        <ul className="alquileresList">
                            {metricas.alquileresRecientes.length > 0 ? (
                                metricas.alquileresRecientes.map((alq) => (
                                    <li key={alq.id} className="alquilerItem">
                                        <div className="alquilerInfo">
                                            <p className="alquilerEquipo"><strong>{alq.equipo}</strong></p>
                                            <p className="alquilerEmpresa">{alq.empresa}</p>
                                            <p className="alquilerChofer">Chofer: {alq.chofer}</p>
                                        </div>
                                        <div className="alquilerMeta">
                                            <span className={`alquilerEstado ${getEstadoClass(alq.estado)}`}>
                                                {alq.estado === "En Tránsito" && <Truck size={14} />}
                                                {alq.estado === "Activo" && <CheckCircle size={14} />}
                                                {alq.estado === "Pendiente" && <Clock size={14} />}
                                                {alq.estado}
                                            </span>
                                            <p className="alquilerFecha">{alq.fecha}</p>
                                            <p className="alquilerId">#{alq.id}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="no-data-item">No hay contratos recientes Activos o Pendientes.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import mixer from '../img/mixer.png'
import { ChartColumn, Package, FileText, Users, Wrench, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import '../styles/SideBar.css'

function SideBar({ isExpanded, toggleSidebar }) {
    const navegar = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/AdminPanel') {
            return location.pathname === '/AdminPanel' || location.pathname === '/';
        }
        return location.pathname.endsWith(path);
    };

    const handleNavigate = (path) => {
        navegar(path)
    }

    const cerrarSession = () => {
        localStorage.clear
        navegar('/login')
    }

    return (
        <div>
            <div className={`sideBar ${isExpanded ? "expanded" : "collapsed"}`}>
                <div className="sidebarTop">
                    <div className="sidebarHeader">
                        {isExpanded && (
                            <div className="logoSection">
                                <img src={mixer} alt="CdHLogo" className='sideBarLogo' />
                                <div className="nameSection">
                                    <h3>Central de Herramientas</h3>
                                    <p>Inventario & Gestión</p>
                                </div>
                            </div>
                        )}
                        <button className="toggleBtn" onClick={toggleSidebar}>
                            {isExpanded ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    <div className="navMenu">
                        <button
                            className={`navBtn ${isActive('/AdminPanel') ? 'active' : ''}`}
                            onClick={() => handleNavigate('/AdminPanel')}
                        >
                            <ChartColumn size={20} className="navIcon" />
                            {isExpanded && <span>Dashboard</span>}
                        </button>

                        <button
                            className={`navBtn ${isActive('inventario') ? 'active' : ''}`}
                            onClick={() => handleNavigate('inventario')}
                        >
                            <Package size={20} className="navIcon" />
                            {isExpanded && <span>Inventario</span>}
                        </button>

                        <button
                            className={`navBtn ${isActive('contratos') ? 'active' : ''}`}
                            onClick={() => handleNavigate('contratos')}
                        >
                            <FileText size={20} className="navIcon" />
                            {isExpanded && <span>Contratos</span>}
                        </button>

                        <button
                            className={`navBtn ${isActive('choferes') ? 'active' : ''}`}
                            onClick={() => handleNavigate('choferes')}
                        >
                            <Users size={20} className="navIcon" />
                            {isExpanded && <span>Choferes</span>}
                        </button>

                        <button
                            className={`navBtn ${isActive('alquiler') ? 'active' : ''}`}
                            onClick={() => handleNavigate('alquiler')}
                        >
                            <Wrench size={20} className="navIcon" />
                            {isExpanded && <span>Catálogo Alquiler</span>}
                        </button>

                        <button
                            className={`navBtn ${isActive('venta') ? 'active' : ''}`}
                            onClick={() => handleNavigate('venta')}
                        >
                            <ShoppingCart size={20} className="navIcon" />
                            {isExpanded && <span>Catálogo Venta</span>}
                        </button>
                    </div>
                </div>

                <div className="sidebarBottom">
                    <button className="logoutBtn" onClick={cerrarSession}>
                        <LogOut size={20} className="logoutIcon" />
                        {isExpanded && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
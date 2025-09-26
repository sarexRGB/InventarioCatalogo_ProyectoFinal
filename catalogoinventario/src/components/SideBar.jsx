import React from 'react'
import { useNavigate } from 'react-router-dom'
import mixer from '../img/mixer.png'
import { ChartColumn, Package, FileText, Users, Wrench, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import '../styles/SideBar.css'

function SideBar({ isExpanded, toggleSidebar }) {
    const navegar = useNavigate()

    return (
        <div>
            <div className={`sideBar ${isExpanded ? "expanded" : "collapsed"}`}>
                <div className="sidebarTop">
                    <div className="sidebarHeader">
                        <div className="logoSection">
                            <img src={mixer} alt="CdHLogo" className='sideBarLogo' />
                            {isExpanded && (
                                <div className="nameSection">
                                    <h3>Central de Herramientas</h3>
                                    <p>Inventario & Gestión</p>
                                </div>
                            )}
                        </div>
                        <button className="toggleBtn" onClick={toggleSidebar}>
                            {isExpanded ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    <div className="navMenu">
                        <button className="navBtn" onClick={() => navegar('/AdminPanel')}>
                            <ChartColumn size={20} className="navIcon" />
                            {isExpanded && <span>Dashboard</span>}
                        </button>
                        <button className="navBtn" onClick={() => navegar('inventario')}>
                            <Package size={20} className="navIcon" />
                            {isExpanded && <span>Inventario</span>}
                        </button>
                        <button className="navBtn" onClick={() => navegar('contratos')}>
                            <FileText size={20} className="navIcon" />
                            {isExpanded && <span>Contratos</span>}
                        </button>
                        <button className="navBtn" onClick={() => navegar('choferes')}>
                            <Users size={20} className="navIcon" />
                            {isExpanded && <span>Choferes</span>}
                        </button>
                        <button className="navBtn" onClick={() => navegar('alquiler')}>
                            <Wrench size={20} className="navIcon" />
                            {isExpanded && <span>Catálogo Alquiler</span>}
                        </button>
                        <button className="navBtn" onClick={() => navegar('venta')}>
                            <ShoppingCart size={20} className="navIcon" />
                            {isExpanded && <span>Catálogo Venta</span>}
                        </button>
                    </div>
                </div>

                <div className="sidebarBottom">
                    <button className="logoutBtn" onClick={() => navegar('/')}>
                        <LogOut size={20} className="logoutIcon" />
                        {isExpanded && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
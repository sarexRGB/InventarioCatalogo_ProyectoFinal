import React from 'react'
import mixer from '../img/mixer.png'
import "../styles/Header.css"
import { Link, useLocation } from 'react-router-dom'
import { Package, ShoppingCart, Phone, Mail, User } from 'lucide-react';

function Header() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div>
                <div className="header">
                    <Link to="/" className='navDiv'>
                        <div className="headerLogo">
                            <div className="logoCircle">
                                <img src={mixer} alt="CDH Logo" className="logoImg" />
                            </div>
                            <div className="headerText">
                                <h1 className="headerTitle">Central de Herramientas</h1>
                                <p className="headerSubtitle">Alquiler, Reparación y Venta</p>
                            </div>
                        </div>
                    </Link>
                    <nav className="headerNav">
                        <Link
                            to="/CatalogoAlquiler"
                            className={`navLink ${isActive('/CatalogoAlquiler') ? 'active' : ''}`}
                        >
                            <Package size={17} />
                            <span>Catálogo Alquiler</span>
                        </Link>

                        <Link
                            to="/CatalogoVenta"
                            className={`navLink ${isActive('/CatalogoVenta') ? 'active' : ''}`}
                        >
                            <ShoppingCart size={17} />
                            <span>Catálogo Venta</span>
                        </Link>
                    </nav>
                    <div className="headerContact">
                        <p className="contactItem"><Phone size={17} /> +506 8888 8888</p>
                        <p className="contactItem"><Mail size={17} /> centralherr@gmail.com</p>
                    </div>
                </div>
        </div>
    )
}

export default Header
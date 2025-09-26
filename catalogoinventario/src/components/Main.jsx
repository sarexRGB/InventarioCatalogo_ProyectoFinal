import React from 'react'
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Wrench, Clock, Shield, Star } from 'lucide-react'
import '../styles/Main.css'

function Main() {
    return (
        <div>
            <div className="main">
                <div className="heroSection">
                    <h1 className="heroTitle">
                        Tu Socio en <span className="highlightText">Construcción</span>
                    </h1>
                    <p className="heroSubtitle">
                        Encuentra las mejores herramientas y equipos para tus proyectos. Alquiler, venta y reparación con la calidad que necesitas.
                    </p>
                </div>

                <div className="sectionContainer servicesSection">
                    <div className="sectionHeader">
                        <h2 className="sectionTitle">Nuestros Servicios</h2>
                        <p className="sectionSubtitle">Ofrecemos soluciones completas para todos tus proyectos de construcción</p>
                    </div>
                    <div className="cardsGrid">
                        <div className="card serviceCard">
                            <div className="iconCircle">
                                <Package size={30} className='bigIcon' />
                            </div>
                            <h3 className="cardTitle">Alquiler de Equipos</h3>
                            <p className="cardText">Amplio catálogo de herramientas y maquinaria para alquiler</p>
                        </div>
                        <div className="card serviceCard">
                            <div className="iconCircle">
                                <ShoppingCart size={30} className='bigIcon' />
                            </div>
                            <h3 className="cardTitle">Venta de Herramientas</h3>
                            <p className="cardText">Herramientas nuevas y usadas con garantía</p>
                        </div>
                        <div className="card serviceCard">
                            <div className="iconCircle">
                                <Wrench size={30} className='bigIcon' />
                            </div>
                            <h3 className="cardTitle">Reparación y Mantenimiento</h3>
                            <p className="cardText">Servicio técnico especializado para tus equipos</p>
                        </div>
                    </div>
                </div>

                <div className="sectionContainer featuresSection">
                    <div className="sectionHeader">
                        <h2 className="sectionTitle">¿Por Qué Elegirnos?</h2>
                        <p className="sectionSubtitle">Características que nos hacen únicos en el mercado</p>
                    </div>
                    <div className="cardsGrid">
                        <div className="card featureCard">
                            <div className="iconCircle small">
                                <Clock size={24} className='smalIcon' />
                            </div>
                            <h3 className="cardTitle">Entrega Rápida</h3>
                            <p className="cardText">Entregamos en el menor tiempo posible</p>
                        </div>
                        <div className="card featureCard">
                            <div className="iconCircle small">
                                <Shield size={24} className='smalIcon' />
                            </div>
                            <h3 className="cardTitle">Equipos Certificados</h3>
                            <p className="cardText">Todos nuestros equipos están verificados y en óptimas condiciones</p>
                        </div>
                        <div className="card featureCard">
                            <div className="iconCircle small">
                                <Star size={24} className='smalIcon' />
                            </div>
                            <h3 className="cardTitle">Calidad Garantizada</h3>
                            <p className="cardText">Más de 10 años de experiencia nos respaldan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
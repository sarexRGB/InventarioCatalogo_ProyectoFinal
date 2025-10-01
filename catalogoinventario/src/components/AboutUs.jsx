import React from 'react';
import mixer from '../img/mixer.png';
import logo from '../img/CdH-Logo.jpg'
import '../styles/AboutUs.css'
import { Hammer, Truck, Shield, Clock, Handshake } from 'lucide-react';

function AboutUs() {
    return (
        <div>
            <div className="aboutContainer">
                <header className="aboutHeader">
                    <h1>Acerca de Nosotros</h1>
                    <p className="aboutParraf">
                        En central de Herramientas nos especializamos en la venta, alquiler y reparación de herramientas y equipos de construcción,
                        ofreciendo soluciones confiables y de calidad para profesionales, empresas y proyectos de todo tamaño.
                        <br /> <br />
                        Desde nuestros inicios, hemos trabajado con el compromiso de brindar a nuestros clientes  no solo productos de alto
                        rendimiento, sino también un servicio cercano, ágil y responsable. Nuestro objetivo es facilitar cada etapa de la construcción,
                        asegurando que siempre cuentes con el equipo adecuando cuando lo necesites.
                        <br /> <br />
                        Contamos con un amplio catálogo de herramientas y equipos de marcas reconocidas, que abarca desde soluciones básicas para
                        el trabajo diario hasta maquinaria especializada para proyectos de mayor exigencia. Además, nuestro equipo técnico capacitado
                        se encarga de realizar mantenimiento y reparación con dedicación y profecionalismo, para que tus herramientas sigan rindiendo
                        al máximo.
                        <br /> <br />
                        En Central de Herramientas no solo somos proveedores: somos aliados de tu proyecto, acompañandote con soluciones prácticas y
                        un servicio en el que puedes confiar.
                    </p>
                </header>

                <section className="aboutMission">
                    <div className="misionText">
                        <h2>Nuestra misión y Visión</h2>
                        <div className="misionVision">
                            <p>
                                <strong>Misión:</strong> Facilitar el trabajo de nuestros clientes ofreciendo un amplio catálogo de herramientas y equipos
                                confiables, junto con un servicio cercano y responsable que asegura el éxito de cada proyecto.
                            </p>

                            <p>
                                <strong>Visión:</strong> Convertirnos en la primera opción en soluciones para la construcción, reconocidos por la variedad
                                de productos, la calidad de nuestro servicio y la confianza que generamos en cada cliente.
                            </p>
                        </div>
                    </div>
                    <div className="misionImg">
                        <img src={logo} alt="Logo CdH" />
                    </div>
                </section>

                <div className="separador"></div>

                <section className="abotValues">
                    <h2>¿Por qué elegirnos? Nuestros Valores</h2>
                    <div className="valueGrid">
                        <div className="valueItem">
                            <Clock size={40} className='valueIcon' />
                            <h3>Experiencia comprobada</h3>
                            <p>Más de 10 años respaldan nuestro compromiso con la industria de la construcción.</p>
                        </div>
                        <div className="valueItem">
                            <Hammer size={40} className='valueIcon' />
                            <h3>Servicio integral</h3>
                            <p>Venta, alquiler y reparación de equipos en un mismo lugar, con soluciones prácticas para cada necesidad.</p>
                        </div>
                        <div className="valueItem">
                            <Truck size={40} className='valueIcon' />
                            <h3>Entrega flexible y logística confiable</h3>
                            <p>Llevamos los equipos directamente a tu obra o, si prefieres puedes recogerlos en nuestras instalaciones, siempre de forma rápida y segura</p>
                        </div>
                        <div className="valueItem">
                            <Shield size={40} className='valueIcon' />
                            <h3>Calidad y seguridad garantizadas</h3>
                            <p>Cada herramienta y equipo pasa por controles de mantenimiento que aseguran su rendimiento y un uso seguro en obra</p>
                        </div>
                        <div className="valueItem">
                            <Handshake size={40} className='valueIcon' />
                            <h3>Atención cercana e innovadora</h3>
                            <p>Escuchamos y entendemos tus necesidades, ofreciendo soluciones prácticas, modernas y confiables para facilitar tu trabajo</p>
                        </div>
                    </div>
                </section>

                <div className="separador"></div>

                <section className="aboutContact">
                    <h2>¿Listo para empezar tu proyecto?</h2>
                    <p>
                        Visítanos o contactanos hoy mismo. Estamos ubicados en: <br />
                        <strong>Esparza, al lado de la central 06 de taxis de San Juan Chiquito.</strong> <br />
                        Teléfono: <strong>+506 8888 8888</strong>
                    </p>
                    <a href="mailto:centralherr@gmail.com" className="contactBtn">
                        Enviar Correo a centralherr@gmail.com
                    </a>
                </section>
            </div>
        </div>
    )
}

export default AboutUs
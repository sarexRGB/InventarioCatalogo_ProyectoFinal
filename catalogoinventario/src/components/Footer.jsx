import React from 'react'
import "../styles/Footer.css"
import mixer from '../img/mixer.png'
import { Phone, MapPin } from 'lucide-react';

function Footer() {
    return (
        <div>
            <div className="footer">
                <div className="footerContent">
                    <div className="footerSection footerAbout">
                        <div className="footerLogo">
                            <div className="logoCircle">
                                <img src={mixer} alt="Central de Herramientas Logo" className="footerLogo" />
                            </div>
                            <h3 className="footerTitle">Central de Herramientas</h3>
                        </div>
                        <p className="footerText">
                            Tu socio confiable en herramientas y equipos de construcción. <br /> Alquiler, venta y reparación con más de 10 años de experiencia.
                        </p>
                    </div>

                    <div className="footerSection footerContact">
                        <h3 className="sectionTitle">Contacto</h3>
                        <div className="contactItem">
                            <Phone size={16} />
                            <p>+506 8888 8888</p>
                        </div>
                        <div className="contactItem">
                            <MapPin size={16} />
                            <p>Al lado de la central 06 de taxis de San Juan Chiquito, Esparza, Costa Rica</p>
                        </div>
                    </div>

                    <div className="footerSection footerHours">
                        <h3 className="sectionTitle">Horarios</h3>
                        <p>Lunes a Sábado: 7:30AM - 4:30PM</p>
                        <p>Domingos: Cerrado</p>
                    </div>
                </div>

                <div className="footerBottom">
                    <hr />
                    <p className="footerCopyright">© 2024 Central de Herramientas. Todos los derechos reservados.</p>
                </div>
            </div>

        </div>
    )
}

export default Footer
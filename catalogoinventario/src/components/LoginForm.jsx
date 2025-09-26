import React, {useState} from 'react'
import mixer from '../img/mixer.png'
import { Link, useNavigate } from 'react-router-dom'
import CrudUsuarios from '../services/CrudUsuarios';
import "../styles/LoginForm.css"
import { Lock, User, Eye, ArrowLeft } from 'lucide-react';

function LoginForm() {
    const navegar = useNavigate();

    const [nombre, setNombre] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const iniciarSess = async () => {
        const nombreLimpio = nombre.trim();
        const passwordLimpio = password.trim();

        if (!nombreLimpio || !passwordLimpio) {
            Swal.fire("⚠️ Campos vacíos", "Debes llenar todos los campos", "warning");
        }

        try {
            const admin = await CrudUsuarios.loginUsuarios(nombreLimpio, passwordLimpio)
            console.log(admin);
            if (admin) {
                localStorage.setItem("user", JSON.stringify({nombre: admin.nombre}))
                localStorage.setItem("token", admin.id)

                Swal.fire(`Hola ${admin.nombre}`, "", "success").then(() => {
                    navegar("/AdminPanel");
                });
            } else {
                Swal.fire("❌ Error", "Credenciales incorrectas", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("⚠️ Error", "Ocurrió un problema en el servidor", "error");
        }
    }

    const passwordShown = () => {
        setShowPassword(!showPassword)
    }

    const regresar = () =>{
        navegar("/")
    }

  return (
    <div>
        <div className="adminAccess">
           <div className="loginHeader">
                <div>
                    <img src={mixer} alt="CDH Logo" className='logoImgLogin' />
                </div>
                <h2>Central de Herramientas</h2>
                <p>Acceso Administrativo</p>
            </div>
            <div className="loginFormCard">
                <div className="formHeader">
                    <button onClick={regresar} className="backButton">
                        <ArrowLeft size={16} />
                    </button>
                    <div className="loginTitleWrapper">
                        <Lock size={16} />
                        <h3>Iniciar Sesión</h3>
                    </div>
                </div>
                <p className="loginDescription">Ingresa tus credenciales para acceder al panel administrativo</p>
                <form className="loginForm">
                    <div className="inputGroup">
                        <label htmlFor="user">Usuario</label>
                        <div className="inputWithIcon">
                            <User size={18} className="inputIcon" />
                            <input
                                type="text"
                                id="user"
                                placeholder='Ingresa tu usuario'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Contraseña</label>
                        <div className="inputWithIcon">
                            <Lock size={18} className="inputIcon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder='Ingresa tu contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Eye
                                size={18}
                                className="showPasswordIcon"
                                onClick={passwordShown}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="loginButton"
                        onClick={iniciarSess}
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
            <p className="loginHelpText">¿No tienes acceso? Contacta al administrador del sistema</p>
        </div>
    </div>
  )
}

export default LoginForm
async function loginUsuarios(nombre, password) {
    try {
        const response = await fetch("http://localhost:3001/usuarios");
        if (!response.ok) {
            throw new Error("Error al conectar con el servidor");
        }

        const usuarios = await response.json();

        const usuario = usuarios.find(
            (u) => u.nombre === nombre && u.password === password
        );

        return usuario || null;
    } catch (error) {
        console.error("Hay un problema al iniciar sesión:", error);
        return null;
    }
}

export default { loginUsuarios }
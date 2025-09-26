async function getEquiposAlquiler() {
    try {
        const response = await fetch(`http://localhost:3001/equiposAlquiler`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los equipos: ${response.statusText}`);
        }

        const equipos = await response.json();
        return equipos;

    } catch (error) {
        console.error("Hay un error al obtener los equipos", error);
        throw error;
    }
}

async function postEquipoAlquiler(equipo) {
    try {
        const response = await fetch(`http://localhost:3001/equiposAlquiler`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipo)
        });

        if (!response.ok) {
            throw new Error(`Error al agregar el equipo: ${response.statusText}`);
        }

        const nuevoEquipo = await response.json();
        return nuevoEquipo;

    } catch (error) {
        console.error("Hay un error al agregar el equipo", error);
        throw error;
    }
}

async function putEquipoAlquiler(id, datosActualizados) {
    try {
        const response = await fetch(`http://localhost:3001/equiposAlquiler${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el equipo: ${response.statusText}`);
        }

        const equipoActualizado = await response.json();
        return equipoActualizado;

    } catch (error) {
        console.error("Hay un error al actualizar el equipo", error);
        throw error;
    }
}

async function deleteEquipoAlquiler(id) {
    try {
        const response = await fetch(`http://localhost:3001/equiposAlquiler${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el equipo con ID ${id}: ${response.statusText}`);
        }

        return true;

    } catch (error) {
        console.error("Hay un error al eliminar el equipo", error);
        throw error;
    }
}

export default { getEquiposAlquiler, postEquipoAlquiler, putEquipoAlquiler, deleteEquipoAlquiler }
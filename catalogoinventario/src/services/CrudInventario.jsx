async function getInventario() {
    try {
        const response = await fetch(`http://localhost:3001/inventario`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener el inventario:", error);
        throw error;
    }
};

async function postInventario(item) {
    try {
        const response = await fetch(`http://localhost:3001/inventario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al agregar ítem al inventario:", error);
        throw error;
    }
};

async function putInventario(id, updatedItem) {
    try {
        const response = await fetch(`http://localhost:3001/inventario/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar ítem en el inventario:", error);
        throw error;
    }
};

async function putEquipoEstado(id, updateData) {
    try {
        const response = await fetch(`http://localhost:3001/inventario/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error al actualizar el estado del equipo:", error);
        throw error;
    }
}

async function deleteInventario(id) {
    try {
        const response = await fetch(`http://localhost:3001/inventario/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar ítem del inventario:", error);
        throw error;
    }
};

export default { getInventario, postInventario, putInventario, putEquipoEstado, deleteInventario }
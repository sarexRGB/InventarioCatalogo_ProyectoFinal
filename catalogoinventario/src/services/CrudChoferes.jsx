async function getChofer() {
    try {
        const response = await fetch(`http://localhost:3001/choferes`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener el chofer:", error);
        throw error;
    }
};

async function postChofer(newChofer) {
    try {
        const response = await fetch(`http://localhost:3001/choferes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newChofer)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al agregar el chofer:", error);
        throw error;
    }
};

async function putChofer(id, updateChofer) {
    try {
        const response = await fetch(`http://localhost:3001/choferes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateChofer)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar el chofer", error);
        throw error;
    }
};

async function deleteChofer(id) {
    try {
        const response = await fetch(`http://localhost:3001/choferes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar el chofer", error);
        throw error;
    }
};

export default { getChofer, postChofer, putChofer, deleteChofer }
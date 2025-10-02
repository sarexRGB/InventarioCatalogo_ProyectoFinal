async function getContratos() {
    try {
        const response = await fetch(`http://localhost:3001/contratos`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener el contrato:", error);
        throw error;
    }
};

async function postContrato(newContrato) {
    try {
        const response = await fetch(`http://localhost:3001/contratos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContrato)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al agregar el contrato:", error);
        throw error;
    }
};

async function putContrato(id, updateContrato) {
    try {
        const response = await fetch(`http://localhost:3001/contratos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateContrato)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar el contrato", error);
        throw error;
    }
};

async function deleteContrato(id) {
    try {
        const response = await fetch(`http://localhost:3001/contratos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar el contrato", error);
        throw error;
    }
};

export default { getContratos, postContrato, putContrato, deleteContrato }
async function getProductosVenta() {
    try {
        const response = await fetch(`http://localhost:3001/productosVenta`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los productos: ${response.statusText}`);
        }

        const productos = await response.json();
        return productos;

    } catch (error) {
        console.error("Hay un error al obtener los productos", error);
        throw error;
    }
}

async function postProductoVenta(producto) {
    try {
        const response = await fetch(`http://localhost:3001/productosVenta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error(`Error al agregar el producto: ${response.statusText}`);
        }

        const nuevoProducto = await response.json();
        return nuevoProducto;

    } catch (error) {
        console.error("Hay un error al agregar el producto", error);
        throw error;
    }
}

async function putProductoVenta(id, datosActualizados) {
    try {
        const response = await fetch(`http://localhost:3001/productosVenta/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el producto: ${response.statusText}`);
        }

        const productoActualizado = await response.json();
        return productoActualizado;

    } catch (error) {
        console.error("Hay un error al actualizar el producto", error);
        throw error;
    }
}

async function deleteProductoVenta(id) {
    try {
        const response = await fetch(`http://localhost:3001/productosVenta/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el producto con ID ${id}: ${response.statusText}`);
        }

        return true;

    } catch (error) {
        console.error("Hay un error al eliminar el producto", error);
        throw error;
    }
}

export default { getProductosVenta, postProductoVenta, putProductoVenta, deleteProductoVenta }
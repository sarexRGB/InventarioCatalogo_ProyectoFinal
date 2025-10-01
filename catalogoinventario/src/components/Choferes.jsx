import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronDown } from "lucide-react";
import ChoferCard from './ChoferCard';
import '../styles/Choferes.css'
import CrudChoferes from '../services/CrudChoferes';

function Choferes() {
    const [choferes, setChoferes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChoferes = async () => {
            try {
                const data = await CrudChoferes.getChoferes();
                setChoferes(data);
            } catch (error) {
                Swal.fire('Error', 'No se pudo cargar la lista de choferes.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchChoferes();
    }, []);

    const addChofer = async (chofer) => {
        try {
            const newChofer = await CrudChoferes.postChofer(chofer);
            setChoferes(prev => [...prev, newChofer]);
            Swal.fire('¡Éxito!', 'Chofer agregado al sistema.', 'success');
        } catch (error) {
            console.error('Error al agregar chofer:', error);
            Swal.fire('Error', 'No se pudo agregar el chofer.', 'error');
        }
    };

    const updateChofer = async (id, updatedChofer) => {
        try {
            const result = await CrudChoferes.putChofer(id, updatedChofer);
            setChoferes(prev => prev.map(chofer => chofer.id === id ? result : chofer));
            Swal.fire('¡Éxito!', 'Chofer actualizado correctamente.', 'success');
        } catch (error) {
            console.error('Error al actualizar chofer:', error);
            Swal.fire('Error', 'No se pudo actualizar el chofer.', 'error');
        }
    };

    const deleteChofer = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await CrudChoferes.deleteChofer(id);
                    setChoferes(prev => prev.filter(chofer => chofer.id !== id));
                    Swal.fire('¡Eliminado!', 'El chofer ha sido eliminado.', 'success');
                } catch (error) {
                    console.error('Error al eliminar chofer:', error);
                    Swal.fire('Error', 'No se pudo eliminar el chofer.', 'error');
                }
            }
        });
    };

    const showChoferModal = (choferToEdit = null) => {
        const isEditing = !!choferToEdit;
        
        Swal.fire({
            title: isEditing ? 'Editar Chofer' : 'Agregar Nuevo Chofer',
            html: `
            <div class="swal-form-container">
                <h3>Información Personal</h3>
                <div class="swal-grid">
                    <div class="swal-input-group">
                        <label for="swal-nombre">Nombre Completo *</label>
                        <input id="swal-nombre" class="swal2-input" placeholder="Juan Pérez" value="${isEditing ? choferToEdit.nombre : ''}">
                    </div>
                    <div class="swal-input-group">
                        <label for="swal-email">Email *</label>
                        <input id="swal-email" class="swal2-input" placeholder="juan.perez@empresa.com" value="${isEditing ? choferToEdit.email : ''}">
                    </div>
                    <div class="swal-input-group full-width">
                        <label for="swal-telefono">Teléfono *</label>
                        <input id="swal-telefono" class="swal2-input" placeholder="+57 300 123 4567" value="${isEditing ? choferToEdit.telefono : ''}">
                    </div>
                </div>

                <h3 style="margin-top: 20px;">Información de Licencia</h3>
                <div class="swal-grid">
                    <div class="swal-input-group">
                        <label for="swal-licencia-numero">Número de Licencia *</label>
                        <input id="swal-licencia-numero" class="swal2-input" placeholder="12345678" value="${isEditing ? choferToEdit.licencia?.numero : ''}">
                    </div>
                    <div class="swal-input-group">
                        <label for="swal-licencia-tipo">Tipo de Licencia</label>
                        <select id="swal-licencia-tipo" class="swal2-select">
                            <option value="B1">B1 Vehículos hasta 4 ton</option>
                            <option value="B2">B2 Vehículos > 8 ton</option>
                            <option value="B3">B3 Camiones Rígidos Pesados </option>
                        </select>
                    </div>
                </div>

                <h3 style="margin-top: 20px;">Vehículo Asignado</h3>
                <div class="swal-grid">
                    <div class="swal-input-group">
                        <label for="swal-vehiculo">Vehículo</label>
                        <input id="swal-vehiculo" class="swal2-input" placeholder="Camión Ford F-350" value="${isEditing ? choferToEdit.vehiculo : ''}">
                    </div>
                    <div class="swal-input-group">
                        <label for="swal-placa">Placa del Vehículo</label>
                        <input id="swal-placa" class="swal2-input" placeholder="ABC-123" value="${isEditing ? choferToEdit.placa : ''}">
                    </div>
                </div>

                <h3 style="margin-top: 20px;">Estado y Ubicación</h3>
                <div class="swal-grid">
                    <div class="swal-input-group">
                        <label for="swal-estado">Estado</label>
                        <select id="swal-estado" class="swal2-select">
                            <option value="Disponible">Disponible</option>
                            <option value="En Ruta">En Ruta</option>
                            <option value="En Descanso">En Descanso</option>
                        </select>
                    </div>
                    <div class="swal-input-group">
                        <label for="swal-experiencia">Experiencia</label>
                        <input id="swal-experiencia" class="swal2-input" placeholder="5 años" value="${isEditing ? choferToEdit.experiencia : ''}">
                    </div>
                    <div class="swal-input-group">
                        <label for="swal-ubicacion">Ubicación Actual</label>
                        <input id="swal-ubicacion" class="swal2-input" placeholder="Bodega Principal" value="${isEditing ? choferToEdit.ubicacion : ''}">
                    </div>
                </div>

                <h3 style="margin-top: 20px;">Notas Adicionales</h3>
                <div class="swal-input-group full-width">
                    <label for="swal-notas">Observaciones, certificaciones especiales, etc.</label>
                    <textarea id="swal-notas" class="swal2-textarea" placeholder="Escribe aquí...">${isEditing ? choferToEdit.notas : ''}</textarea>
                </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: isEditing ? 'Actualizar Chofer' : 'Agregar Chofer',
            cancelButtonText: 'Cancelar',
            width: '800px',
            didOpen: (popup) => {
                if (isEditing) {
                    popup.querySelector('#swal-licencia-tipo').value = choferToEdit.licencia?.tipo || '';
                    popup.querySelector('#swal-estado').value = choferToEdit.estado || '';
                }
            },
            preConfirm: () => {
                const nombre = Swal.getPopup().querySelector('#swal-nombre').value;
                const email = Swal.getPopup().querySelector('#swal-email').value;
                const telefono = Swal.getPopup().querySelector('#swal-telefono').value;
                const licenciaNumero = Swal.getPopup().querySelector('#swal-licencia-numero').value;
                const licenciaTipo = Swal.getPopup().querySelector('#swal-licencia-tipo').value;
                const vehiculo = Swal.getPopup().querySelector('#swal-vehiculo').value;
                const placa = Swal.getPopup().querySelector('#swal-placa').value;
                const estado = Swal.getPopup().querySelector('#swal-estado').value;
                const experiencia = Swal.getPopup().querySelector('#swal-experiencia').value;
                const ubicacion = Swal.getPopup().querySelector('#swal-ubicacion').value;
                const notas = Swal.getPopup().querySelector('#swal-notas').value;

                if (!nombre || !email || !telefono || !licenciaNumero) {
                    Swal.showValidationMessage('Nombre, Email, Teléfono y Número de Licencia son obligatorios.');
                    return false;
                }

                return {
                    id: isEditing ? choferToEdit.id : `CH-${Date.now()}`,
                    nombre,
                    email,
                    telefono,
                    licencia: { numero: licenciaNumero, tipo: licenciaTipo },
                    vehiculo,
                    placa,
                    estado,
                    experiencia,
                    ubicacion,
                    notas
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (isEditing) {
                    updateChofer(choferToEdit.id, result.value);
                } else {
                    addChofer(result.value);
                }
            }
        });
    };

    if (loading) {
        return <div>Cargando choferes...</div>;
    }

    return (
        <div>
            <div className="choferes">
                <div className="choferHeader">
                    <div className="titleGroup">
                        <h2>Choferes</h2>
                        <p>Gestión del personal de transporte</p>
                    </div>
                    <button onClick={() => showChoferModal()} className="addChoferBtn">
                        <Plus size={18} /> Nuevo Chofer
                    </button>
                </div>
                <div className="choferesSearch">
                    <Search className="searchIcon" size={18} />
                    <input type="text" placeholder='Buscar choferes por nombre, email o vehículo...' />
                </div>
                <div className="choferesList">
                    {choferes.map((ch) => (
                        <ChoferCard
                            key={ch.id}
                            chofer={ch}
                            onDelete={() => deleteChofer(ch.id)}
                            onEdit={() => showChoferModal(ch)}
                           
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Choferes
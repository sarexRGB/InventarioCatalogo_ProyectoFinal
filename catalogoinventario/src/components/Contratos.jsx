import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronDown } from "lucide-react"
import ContratoCard from './ContratoCard';
import CrudContratos from '../services/CrudContratos';
import CrudChoferes from '../services/CrudChoferes';
import CrudInventario from '../services/CrudInventario';
import '../styles/Contrato.css'

function Contratos() {
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);

    const showContratoModal = async (contratoToEdit = null) => {
        const isEditing = !!contratoToEdit;

        let choferes = [];
        let inventario = [];

        Swal.fire({
            title: 'Cargando Datos...',
            text: 'Obteniendo listas de choferes y equipos.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            [choferes, inventario] = await Promise.all([
                CrudChoferes.getChoferes(),
                CrudInventario.getInventario()
            ]);
            Swal.close();
        } catch (error) {
            Swal.fire('Error de Carga', 'No se pudo obtener la lista de Choferes o Inventario. Intente de nuevo.', 'error');
            return;
        }

        const generateOptions = (data, selectedValue) => {
            return data.map(item =>
                `<option value="${item.nombre}" ${item.nombre === selectedValue ? 'selected' : ''}>${item.nombre}</option>`
            ).join('');
        };

        const generateEquiposCheckboxes = (inventario, selectedEquipos = []) => {
            return inventario.map(item => `
                   <div class="CheckboxItem">
                        <input
                            type="checkbox"
                            id="equipo${item.id}"
                            value="${item.nombre}"
                            ${selectedEquipos.includes(item.nombre) ? 'checked' : ''}
                        >
                        <label for="equipo${item.id}">${item.nombre}</label>
                    </div>
                `).join('');
        };

        Swal.fire({
            title: isEditing ? `Editar Contrato #${contratoToEdit.id}` : 'Crear Nuevo Contrato',
            html: `
                <div class="swal-form-container" style="text-align: left;">
                    <div class="swal-section-title">Datos del Cliente</div>
                    <div class="swal-grid-2">
                        <div class="swal-input-group">
                            <label for="swal-empresa">Empresa</label>
                            <input id="swal-empresa" class="swal2-input" value="${isEditing ? contratoToEdit.empresa : ''}">
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-contacto">Contacto (Nombre)</label>
                            <input id="swal-contacto" class="swal2-input" value="${isEditing ? contratoToEdit.contacto : ''}">
                        </div>
                    </div>
                    <div class="swal-section-title">Período y Logística</div>
                    <div class="swal-grid-3">
                        <div class="swal-input-group">
                            <label for="swal-inicio">Fecha Inicio</label>
                            <input id="swal-inicio" class="swal2-input" type="date" value="${isEditing ? contratoToEdit.periodoInicio : ''}">
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-fin">Fecha Fin</label>
                            <input id="swal-fin" class="swal2-input" type="date" value="${isEditing ? contratoToEdit.periodoFin : ''}">
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-chofer">Chofer Asignado</label>
                            <select id="swal-chofer" class="swal2-select">
                               <option value="">Seleccione un chófer</option>
                               ${generateOptions(choferes, isEditing ? contratoToEdit.chofer : '')}
                            </select>
                        </div>
                    </div>
                    <div class="swal-input-group full-width">
                        <label for="swal-direccion">Dirección de Entrega</label>
                        <input id="swal-direccion" class="swal2-input" value="${isEditing ? contratoToEdit.direccionEntrega : ''}">
                    </div>
                    <div class="swal-section-title">Equipos y Precios</div>
                    <div class="swal-grid-2">
                        <div class="swal-input-group">
                            <label for="swal-valor-diario">Valor Diario Contrato ($)</label>
                            <input id="swal-valor-diario" class="swal2-input" type="number" step="0.01" value="${isEditing ? contratoToEdit.valorDiario : ''}">
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-valor-total">Valor Total Contrato ($)</label>
                            <input id="swal-valor-total" class="swal2-input" type="number" step="0.01" value="${isEditing ? contratoToEdit.valorTotal : ''}">
                        </div>
                    </div>
                    <div class="swal-input-group full-width" style="margin-top: 20px;">
                        <label>Selección de Equipos:</label>
                        <div id="equipos-checkboxes" class="equipos-grid">
                            ${generateEquiposCheckboxes(inventario, isEditing ? contratoToEdit.equipos : [])}
                        </div>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: isEditing ? 'Guardar Cambios' : 'Crear Contrato',
            cancelButtonText: 'Cancelar',
            width: '800px',
            customClass: {
                container: 'swal2-contrato-container',
                popup: 'swal2-contrato-popup'
            },
            
            preConfirm: () => {
                 const empresa = Swal.getPopup().querySelector('#swal-empresa').value;
                 const contacto = Swal.getPopup().querySelector('#swal-contacto').value;
                 const periodoInicio = Swal.getPopup().querySelector('#swal-inicio').value;
                 const periodoFin = Swal.getPopup().querySelector('#swal-fin').value;
                 const choferSelect = Swal.getPopup().querySelector('#swal-chofer');
                 const choferNombre = choferSelect.options[choferSelect.selectedIndex].value;
                 const direccionEntrega = Swal.getPopup().querySelector('#swal-direccion').value;
                 const valorDiario = Number(Swal.getPopup().querySelector('#swal-valor-diario').value);
                 const valorTotal = Number(Swal.getPopup().querySelector('#swal-valor-total').value);
    
                 const equipos = Array.from(Swal.getPopup().querySelectorAll('#equipos-checkboxes input:checked'))
                                    .map(input => input.value);
    
                 if (!empresa || !contacto || !periodoInicio || !periodoFin || !valorDiario || equipos.length === 0) {
                     Swal.showValidationMessage('Por favor, complete los campos obligatorios y seleccione al menos un equipo.');
                     return false;
                 }
    
                 return {
                     empresa, contacto, periodoInicio, periodoFin, 
                     chofer: choferNombre || null, direccionEntrega, valorDiario, valorTotal, equipos,
                     estado: isEditing ? contratoToEdit.estado : 'Pendiente Entrega', 
                 };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (isEditing) {
                        const updatedContrato = await CrudContratos.putContrato(contratoToEdit.id, result.value);
                        setContratos(prev => prev.map(c => c.id === contratoToEdit.id ? updatedContrato : c));
                        Swal.fire('¡Éxito!', 'Contrato actualizado correctamente.', 'success');
                    } else {
                       const newContrato = await CrudContratos.postContrato(result.value);
                        setContratos(prev => [...prev, newContrato]);
                        Swal.fire('¡Éxito!', 'Contrato creado correctamente.', 'success'); 
                    }
                } catch (error) {
                    Swal.fire('Error', 'Hubo un error al guardar el contrato.', 'error');
                }
            }
        });
    };

    useEffect(() => {
        const fetchContratos = async () => {
            try {
                const data = await CrudContratos.getContratos();
                setContratos(data);
            } catch (error) {
                console.error("Error al cargar contratos:", error);
                Swal.fire('Error', 'No se pudieron cargar los contratos.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchContratos();
    }, []);

    const handleCloseContrato = (id) => {
        Swal.fire({
            title: '¿Cerrar Contrato?',
            text: '¿Deseas cerrar el contrato ' + id + '? Esta acción es irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#27ae60',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Cerrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await CrudContratos.deleteContrato(id);
                    setContratos(prev => prev.filter(c => c.id !== id));
                    Swal.fire('¡Cerrado!', `El contrato ${id} ha sido cerrado.`, 'success');
                } catch (error) {
                    Swal.fire('Error', 'No se pudo cerrar el contrato.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div className="loading-message">Cargando contratos...</div>;
    }

    return (
        <div>
            <div className="admin-page-wrapper">
                <div className="contratos">
                    <div className="contratosHeader">
                        <div className="titleGroup">
                            <h2>Contratos</h2>
                            <p>Gestión y seguimiento de contratos activos</p>
                        </div>
                        <button className="addContratoBtn" onClick={() => showContratoModal(null)}>
                            <Plus size={18} /> Nuevo Contrato
                        </button>
                    </div>
                    <div className="contratosActions">
                        <div className="searchBar">
                            <Search className="searchIcon" size={18} />
                            <input type="text" placeholder='Buscar contratos, clientes o equipos...' />
                        </div>
                        <button className="filterBtn">Todos los Estados <ChevronDown size={16} /></button>
                    </div>
                    <div className="contratosList">
                        {contratos.length === 0 ? (
                            <p className="no-items-message">No hay contratos registrados. ¡Crea el primero!</p>
                        ) : (
                            contratos.map((ct) => (
                                <ContratoCard
                                    key={ct.id}
                                    contrato={ct}
                                    onEdit={() => showContratoModal(ct)} // Pasar función de edición
                                    onDelete={() => handleCloseContrato(ct.id)} // Pasar función de cierre
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contratos
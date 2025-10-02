import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronDown } from "lucide-react"
import ContratoCard from './ContratoCard';
import CrudContratos from '../services/CrudContratos';
import CrudChoferes from '../services/CrudChoferes';
import CrudInventario from '../services/CrudInventario';
import '../styles/Contrato.css'

const getDaysBetweenDates = (start, end) => {
    if (!start || !end) return 0;
    const date1 = new Date(start + 'T00:00:00');
    const date2 = new Date(end + 'T00:00:00');
    const diffTime = Math.abs(date2 - date1);
    if (diffTime < 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

function Contratos() {
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateInventoryStatus = async (contrato, equiposAnteriores = []) => {
        const equiposActuales = contrato.equipos || []; 
        const tipoContrato = contrato.tipo;

        const equiposALiberar = equiposAnteriores.filter(nombre => !equiposActuales.includes(nombre));
        const equiposAOcupar = equiposActuales.filter(nombre => !equiposAnteriores.includes(nombre));

        const inventarioCompleto = await CrudInventario.getInventario();
        const updates = [];

        for (const nombre of equiposALiberar) {
            const equipo = inventarioCompleto.find(i => i.nombre === nombre);
            if (equipo) {
                updates.push(CrudInventario.putEquipoEstado(equipo.id, {
                    estadoAlquiler: "Disponible" 
                }));
            }
        }

        const nuevoEstado = tipoContrato === 'Alquiler' ? 'Alquilado' : 'Vendido';
        
        for (const nombre of equiposAOcupar){
            const equipo = inventarioCompleto.find(i => i.nombre === nombre);
            if (equipo) {
                updates.push(CrudInventario.putEquipoEstado(equipo.id, {
                    estadoAlquiler: nuevoEstado 
                }));
            }
        }

        return Promise.all(updates)
    };

    const handleStatusChange = async (id, newStatus) => {
        const contrato = contratos.find(c => c.id === id);
        if (!contrato) return;

        try {
            const updatedContrato = await CrudContratos.putContrato(id, { estado: newStatus });
            
            setContratos(prev => prev.map(c => c.id === id ? updatedContrato : c));

            if (newStatus === 'Cerrado') {
                await updateInventoryStatus(
                    { equipos: [], tipo: contrato.tipo },
                    contrato.equipos
                );
            }

            Swal.fire('Estado Actualizado', `El contrato #${id} ha cambiado a **${newStatus}**.`, 'success');
        } catch (error) {
            console.error("Error al actualizar el estado del contrato:", error);
            Swal.fire('Error', 'No se pudo actualizar el estado del contrato.', 'error');
        }
    };


    const showContratoModal = async (contratoToEdit = null) => {
        const isEditing = !!contratoToEdit;
        const equiposAnteriores = isEditing ? [...contratoToEdit.equipos] :[];

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

        const inventarioFiltrado = inventario.filter(item =>
            item.estadoAlquiler === 'Disponible' || equiposAnteriores.includes(item.nombre)
        );

        const generateOptions = (data, selectedValue) => {
            return data.map(item =>
                `<option value="${item.nombre}" ${item.nombre === selectedValue ? 'selected' : ''}>${item.nombre}</option>`
            ).join('');
        };

        const generateEquiposCheckboxes = (inventario, selectedEquipos = [], tipoContrato) => {
            let filteredInventario = [];

            if (tipoContrato === 'Alquiler') {
                filteredInventario = inventario.filter(item => item.paraAlquiler); 
            } else if (tipoContrato === 'Venta') {
                filteredInventario = inventario.filter(item => item.paraVenta);
            } else {
                return '<p style="text-align: center; color: #888;">Seleccione un Tipo de Contrato primero.</p>'
            }

            if (filteredInventario.length === 0) {
                 return `<p style="text-align: center; color: #888;">No hay equipos disponibles para ${tipoContrato}.</p>`;
            }

            return filteredInventario.map(item => `
                    <div class="CheckboxItem">
                        <input
                            type="checkbox"
                            id="equipo${item.id}"
                            value="${item.nombre}"
                            ${selectedEquipos.includes(item.nombre) ? 'checked' : ''}
                            data-precio-venta="${item.precioVenta || 0}"
                        >
                        <label for="equipo${item.id}">${item.nombre}</label>
                    </div>
                `).join('');
        };

        const initialClientName = isEditing 
            ? (contratoToEdit.tipoCliente === 'Empresa' ? contratoToEdit.empresa : contratoToEdit.contacto) 
            : '';

        Swal.fire({
            title: isEditing ? `Editar Contrato #${contratoToEdit.id}` : 'Crear Nuevo Contrato',
            html: `
                <div class="swal-form-container" style="text-align: left;">
                    <div class="swal-section-title">Datos Generales</div>
                    <div class="swal-grid-2">
                        <div class="swal-input-group">
                            <label for="swal-tipo-contrato">Tipo de Contrato *</label>
                            <select id="swal-tipo-contrato" class="swal2-select">
                                <option value="">Seleccione...</option>
                                <option value="Alquiler" ${contratoToEdit?.tipo === 'Alquiler' ? 'selected' : ''}>Alquiler</option>
                                <option value="Venta" ${contratoToEdit?.tipo === 'Venta' ? 'selected' : ''}>Venta</option>
                            </select>
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-tipo-cliente">Tipo de Cliente *</label>
                            <select id="swal-tipo-cliente" class="swal2-select">
                                <option value="">Seleccione...</option>
                                <option value="Empresa" ${contratoToEdit?.tipoCliente === 'Empresa' ? 'selected' : ''}>Empresa</option>
                                <option value="Particular" ${contratoToEdit?.tipoCliente === 'Particular' ? 'selected' : ''}>Particular</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="swal-section-title">Datos del Cliente</div>
                    <div class="swal-grid-2">
                        <div class="swal-input-group" id="nombre-cliente-group">
                            <label for="swal-nombre-cliente">Nombre del Cliente *</label>
                            <input id="swal-nombre-cliente" class="swal2-input" value="${initialClientName}" placeholder="Nombre o Razón Social">
                        </div>
                        <div class="swal-input-group" id="contacto-group">
                            <label for="swal-contacto">Nombre de Contacto (si es empresa)</label>
                            <input id="swal-contacto" class="swal2-input" value="${isEditing ? contratoToEdit.contacto : ''}" placeholder="Persona a contactar">
                        </div>
                    </div>
                    <div class="swal-input-group full-width" id="direccion-input-group">
                        <label for="swal-direccion">Dirección de Entrega</label>
                        <input id="swal-direccion" class="swal2-input" value="${isEditing ? contratoToEdit.direccionEntrega : ''}">
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
                            <label for="swal-metodo-entrega">Método de Entrega *</label>
                            <select id="swal-metodo-entrega" class="swal2-select">
                                <option value="">Seleccione...</option>
                                <option value="Cliente Retira" ${contratoToEdit?.metodoEntrega === 'Cliente Retira' ? 'selected' : ''}>Cliente Retira</option>
                                <option value="Entrega con Chofer" ${contratoToEdit?.metodoEntrega === 'Entrega con Chofer' ? 'selected' : ''}>Entrega con Chofer</option>
                            </select>
                        </div>
                    </div>

                    <div class="swal-grid-3" id="chofer-assignment-group" style="display: none;">
                        <div class="swal-input-group full-width">
                            <label for="swal-chofer">Chofer Asignado *</label>
                            <select id="swal-chofer" class="swal2-select">
                               <option value="">Seleccione un chófer</option>
                               ${generateOptions(choferes, isEditing ? contratoToEdit.chofer : '')}
                            </select>
                        </div>
                    </div>

                    <div class="swal-section-title">Equipos y Precios</div>
                    <div class="swal-grid-3">
                        <div class="swal-input-group" id="valor-diario-group">
                            <label for="swal-valor-diario">Valor Diario (₡)</label>
                            <input id="swal-valor-diario" class="swal2-input" type="number" step="0.01" value="${isEditing ? contratoToEdit.valorDiario : ''}">
                        </div>
                        <div class="swal-input-group">
                            <label for="swal-valor-total">Valor Total (₡) *</label>
                            <input id="swal-valor-total" class="swal2-input" type="number" step="0.01" value="${isEditing ? contratoToEdit.valorTotal : ''}" readonly>
                        </div>
                        <div class="swal-input-group" id="duracion-group">
                            <label>Duración (Días)</label>
                            <input id="swal-duracion" class="swal2-input" type="number" value="${isEditing ? getDaysBetweenDates(contratoToEdit.periodoInicio, contratoToEdit.periodoFin) : 0}" readonly>
                        </div>
                    </div>

                    <div class="swal-input-group full-width" style="margin-top: 20px;">
                        <label>Selección de Equipos:</label>
                        <div id="equipos-checkboxes" class="equipos-grid">
                            ${generateEquiposCheckboxes(inventarioFiltrado, isEditing ? contratoToEdit.equipos : [], contratoToEdit?.tipo)}
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
            
            didOpen: (popup) => {
                const tipoSelect = popup.querySelector('#swal-tipo-contrato');
                const tipoClienteSelect = popup.querySelector('#swal-tipo-cliente');
                const nombreClienteInput = popup.querySelector('#swal-nombre-cliente');
                const nombreClienteLabel = popup.querySelector('#nombre-cliente-group label');
                const contactoGroup = popup.querySelector('#contacto-group');

                const inicioInput = popup.querySelector('#swal-inicio');
                const finInput = popup.querySelector('#swal-fin');
                const valorDiarioInput = popup.querySelector('#swal-valor-diario');
                const valorTotalInput = popup.querySelector('#swal-valor-total');
                const duracionInput = popup.querySelector('#swal-duracion');
                const equiposContainer = popup.querySelector('#equipos-checkboxes');
                const duracionGroup = popup.querySelector('#duracion-group');
                const valorDiarioGroup = popup.querySelector('#valor-diario-group');

                const metodoEntregaSelect = popup.querySelector('#swal-metodo-entrega');
                const choferAssignmentGroup = popup.querySelector('#chofer-assignment-group');
                const choferSelect = popup.querySelector('#swal-chofer');
                const direccionInput = popup.querySelector('#swal-direccion');
                const direccionInputGroup = popup.querySelector('#direccion-input-group');

                const updateDeliveryUI = () => {
                    const metodo = metodoEntregaSelect.value;
                    const requiresChofer = metodo === 'Entrega con Chofer';
                    
                    choferAssignmentGroup.style.display = requiresChofer ? 'grid' : 'none';
                    
                    direccionInputGroup.style.display = requiresChofer ? 'block' : 'none';

                    if (direccionInputGroup) {
                        direccionInputGroup.style.display = requiresChofer ? 'block' : 'none';
                    }

                    if (!requiresChofer) {
                        choferSelect.value = '';
                        if (direccionInput) {
                            direccionInput.value = '';
                        }
                    }
                };
                
                const updateClientUI = () => {
                    const tipoCliente = tipoClienteSelect.value;
                    const isEmpresa = tipoCliente === 'Empresa';
                    
                    if (isEmpresa) {
                        nombreClienteLabel.textContent = 'Razón Social (Empresa) *';
                        nombreClienteInput.placeholder = 'Nombre de la empresa';
                        contactoGroup.style.display = 'block';
                    } else if (tipoCliente === 'Particular') {
                        nombreClienteLabel.textContent = 'Nombre Completo del Particular *';
                        nombreClienteInput.placeholder = 'Nombre y Apellidos del particular';
                        contactoGroup.style.display = 'none';
                    } else {
                        nombreClienteLabel.textContent = 'Nombre del Cliente *';
                        nombreClienteInput.placeholder = 'Nombre o Razón Social';
                        contactoGroup.style.display = 'block';
                    }
                };

                const updateContractUI = () => {
                    const tipo = tipoSelect.value;
                    const inicio = inicioInput.value;
                    const fin = finInput.value;
                    let valorDiario = parseFloat(valorDiarioInput.value) || 0; 
                    
                    const isAlquiler = tipo === 'Alquiler';

                    inicioInput.parentElement.style.display = isAlquiler ? 'block' : 'none';
                    finInput.parentElement.style.display = isAlquiler ? 'block' : 'none';
                    duracionGroup.style.display = isAlquiler ? 'block' : 'none';
                    valorDiarioGroup.style.display = isAlquiler ? 'block' : 'none';
                    
                    const selectedEquipos = Array.from(equiposContainer.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
                    const newEquiposHtml = generateEquiposCheckboxes(inventarioFiltrado, selectedEquipos, tipo);
                    
                    if (equiposContainer.innerHTML !== newEquiposHtml) {
                        equiposContainer.innerHTML = newEquiposHtml;
                        equiposContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                            checkbox.addEventListener('change', updateContractUI);
                        });
                    }

                    let total = 0;
                    
                    if (isAlquiler) {
                        valorTotalInput.readOnly = true;

                        if (inicio && fin) {
                            const dias = getDaysBetweenDates(inicio, fin);
                            duracionInput.value = dias;
                            
                            if (valorDiario <= 0 && selectedEquipos.length > 0) {
                                 const primerEquipo = inventarioFiltrado.find(item => item.nombre === selectedEquipos[0]);
                                 if (primerEquipo && primerEquipo.preciosAlquiler?.diario) {
                                     valorDiario = primerEquipo.preciosAlquiler.diario;
                                     valorDiarioInput.value = valorDiario.toFixed(2);
                                 }
                            }

                            if (valorDiario > 0) {
                                total = dias * valorDiario * selectedEquipos.length; 
                            }

                        } else {
                            duracionInput.value = 0;
                        }

                    } else if (tipo === 'Venta') {
                        valorTotalInput.readOnly = false;
                        valorDiarioInput.value = ''; 
                        duracionInput.value = '';

                        const equiposSeleccionadosDetalle = inventarioFiltrado.filter(item => selectedEquipos.includes(item.nombre));
                        
                        total = equiposSeleccionadosDetalle.reduce((sum, item) => sum + (item.precioVenta || 0), 0);

                    } else {
                        valorTotalInput.readOnly = true;
                        duracionInput.value = '';
                        valorDiarioInput.value = '';
                        total = 0;
                    }

                    if (tipo) {
                        valorTotalInput.value = total.toFixed(2);
                    } else {
                        valorTotalInput.value = '';
                    }
                };

                tipoSelect.addEventListener('change', updateContractUI);
                tipoClienteSelect.addEventListener('change', () => {
                    updateClientUI();
                    updateContractUI();
                });
                inicioInput.addEventListener('change', updateContractUI);
                finInput.addEventListener('change', updateContractUI);
                valorDiarioInput.addEventListener('input', updateContractUI); 
                metodoEntregaSelect.addEventListener('change', updateDeliveryUI);
                
                equiposContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', updateContractUI);
                });
                
                updateContractUI();
                updateDeliveryUI();
                updateClientUI();
            },
            
            preConfirm: () => {
                const popup = Swal.getPopup();
                const tipo = popup.querySelector('#swal-tipo-contrato').value;
                const tipoCliente = popup.querySelector('#swal-tipo-cliente').value;
                const nombreCliente = popup.querySelector('#swal-nombre-cliente').value;
                const contactoInput = popup.querySelector('#swal-contacto');

                let empresa = null;
                let contacto = null;

                if (tipoCliente === 'Empresa') {
                    empresa = nombreCliente;
                    contacto = contactoInput.value;
                } else if (tipoCliente === 'Particular') {
                    contacto = nombreCliente;
                    empresa = null;
                }

                const periodoInicio = popup.querySelector('#swal-inicio').value;
                const periodoFin = popup.querySelector('#swal-fin').value;

                const metodoEntrega = popup.querySelector('#swal-metodo-entrega').value;
                const choferSelect = popup.querySelector('#swal-chofer');
                const choferNombre = choferSelect.options[choferSelect.selectedIndex].value || '';

                const direccionEntrega = popup.querySelector('#swal-direccion').value;
                const valorDiario = tipo === 'Alquiler' ? Number(popup.querySelector('#swal-valor-diario').value) : 0;
                const valorTotal = Number(popup.querySelector('#swal-valor-total').value);
                const equipos = Array.from(popup.querySelectorAll('#equipos-checkboxes input:checked')).map(input => input.value);
    
                if (!tipo || !tipoCliente || !nombreCliente || !valorTotal || equipos.length === 0 || !metodoEntrega) {
                    Swal.showValidationMessage('Por favor, complete los campos obligatorios (*).');
                    return false;
                }

                if (tipoCliente === 'Empresa' && !contacto) {
                    Swal.showValidationMessage('Si el cliente es una Empresa, debe especificar un Nombre de Contacto.');
                    return false;
                }

                if (tipo === 'Alquiler' && (!periodoInicio || !periodoFin || !valorDiario || valorDiario <= 0)) {
                    Swal.showValidationMessage('Para Alquiler, debe especificar el período y un valor diario mayor a cero.');
                    return false;
                }

                if (metodoEntrega === 'Entrega con Chofer' && (!choferNombre || !direccionEntrega)) {
                    Swal.showValidationMessage('Debe seleccionar un chofer y especificar la dirección si el método de entrega es "Entrega con Chofer".');
                    return false;
                }
    
                return {
                    tipo, 
                    tipoCliente, 
                    empresa, 
                    contacto, 
                    periodoInicio, periodoFin, 
                    metodoEntrega, 
                    chofer: metodoEntrega === 'Entrega con Chofer' ? choferNombre : null, 
                    direccionEntrega: metodoEntrega === 'Entrega con Chofer' ? direccionEntrega : null, 
                    valorDiario, valorTotal, equipos,
                    estado: isEditing ? contratoToEdit.estado : 'Pendiente Entrega', 
                };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                let savedContrato = null
                try {
                    if (isEditing) {
                        savedContrato = await CrudContratos.putContrato(contratoToEdit.id, result.value);
                        setContratos(prev => prev.map(c => c.id === contratoToEdit.id ? savedContrato : c));
                        await updateInventoryStatus(savedContrato, equiposAnteriores);
                        Swal.fire('¡Éxito!', 'Contrato actualizado correctamente y el inventario ajustado.', 'success');
                    } else {
                        const newContrato = await CrudContratos.postContrato(result.value);
                        setContratos(prev => [...prev, newContrato]);
                        await updateInventoryStatus(newContrato); 
                        Swal.fire('¡Éxito!', 'Contrato creado correctamente y el inventario ajustado.', 'success'); 
                    }
                } catch (error) {
                    console.error("Fallo durante la operación:", error);
                    Swal.fire('Error Crítico', 'El contrato se guardó, pero hubo un error al actualizar el inventario. Revise los logs.', 'error');
                }
            }
        });
    };

    const handleFinalizeContrato = (id) => {
        const contratoAFinalizar = contratos.find(c => c.id === id); 

        Swal.fire({
            title: '¿Finalizar Contrato?',
            text: '¿Deseas marcar el contrato ' + id + ' como **Cerrado**? Los equipos volverán a estar disponibles.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#27ae60',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Finalizar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (!contratoAFinalizar) {
                          throw new Error("Contrato no encontrado.");
                    }
                    
                    const updatedContrato = await CrudContratos.putContrato(id, { estado: 'Cerrado' });

                    await updateInventoryStatus(
                        { equipos: [], tipo: contratoAFinalizar.tipo }, 
                        contratoAFinalizar.equipos 
                    );
                    
                    setContratos(prev => prev.map(c => c.id === id ? updatedContrato : c)); 

                    Swal.fire('¡Contrato Cerrado!', `El contrato ${id} ha sido **Cerrado** y el inventario ajustado.`, 'success');
                } catch (error) {
                    console.error("Error al finalizar contrato:", error);
                    Swal.fire('Error', 'No se pudo finalizar el contrato o ajustar el inventario. Revise los logs.', 'error');
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
                    
                    <div className="contratosList">
                        {contratos.length === 0 ? (
                            <p className="no-items-message">No hay contratos registrados. ¡Crea el primero!</p>
                        ) : (
                            contratos.map((ct) => (
                                <ContratoCard
                                    key={ct.id}
                                    contrato={ct}
                                    onEdit={() => showContratoModal(ct)}
                                    onFinalize={() => handleFinalizeContrato(ct.id)} 
                                    onStatusChange={handleStatusChange}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contratos;
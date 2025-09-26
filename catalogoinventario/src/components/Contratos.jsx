import React from 'react'
import { Plus, Search, ChevronDown } from "lucide-react"
import ContratoCard from './ContratoCard';
import '../styles/Contrato.css'

function Contratos() {
    const contratos = [
    {
      id: "C001",
      estado: "Activo",
      empresa: "Constructora ABC S.A.",
      valorTotal: "$9.500",
      contacto: "Pedro González",
      periodo: "2024-01-15 - 2024-01-25",
      chofer: "Juan Pérez",
      valorDiario: "$863,64",
      equipos: ["Excavadora CAT 320", "Compresor Atlas 185"],
      direccion: "Av. Principal 123, Sector Norte",
    },
    {
      id: "C002",
      estado: "Pendiente Entrega",
      empresa: "Constructora XYZ Ltda.",
      valorTotal: "$450",
      contacto: "María Rodríguez",
      periodo: "2024-01-16 - 2024-01-20",
      chofer: "Carlos López",
      valorDiario: "$90",
      equipos: ["Martillo Neumático", "Taladro Industrial"],
      direccion: "Calle Central 456, Sector Este",
    },
  ];
  return (
    <div>
        <div className="contratos">
            <div className="contratosHeader">
                <div className="titleGroup">
                    <h2>Contratos</h2>
                    <p>Gestión y seguimiento de contratos activos</p>
                </div>
                <button className="addContratoBtn">
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
                {contratos.map((ct) => (
                    <ContratoCard key={ct.id} contrato={ct} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Contratos
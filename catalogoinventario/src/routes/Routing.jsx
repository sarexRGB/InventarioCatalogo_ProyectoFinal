import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Lobby from '../pages/Lobby';
import AlquilerPublic from '../pages/AlquilerPublic';
import VentaPublic from '../pages/VentaPublic';
import AdminLogin from '../pages/AdminLogin';
import PrivateLayout from '../layouts/PrivateLayout';
import AdminPanel from '../pages/AdminPanel';
import AdminInventario from '../pages/AdminInventario';
import AdminChoferes from '../pages/AdminChoferes';
import AdminContratos from '../pages/AdminContratos';
import AdminCatalogoAlquiler from '../pages/AdminCatalogoAlquiler';
import AdminCatalogoVenta from '../pages/AdminCatalogoVenta';
import PrivateRoute from './PrivateRoute';

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Lobby />} />
            <Route path='/CatalogoAlquiler' element={<AlquilerPublic />} />
            <Route path='/CatalogoVenta' element={<VentaPublic />} />
          </Route>
          <Route path='/login' element={<AdminLogin />} />

          <Route path='/AdminPanel' element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
            <Route index element={<AdminPanel />} />
            <Route path='inventario' element={<AdminInventario />} />
            <Route path='contratos' element={<AdminContratos />} />
            <Route path='choferes' element={<AdminChoferes />} />
            <Route path='alquiler' element={<AdminCatalogoAlquiler />} />
            <Route path='venta' element={<AdminCatalogoVenta />} />
          </Route>

        </Routes>

      </Router>
    </div>
  )
}

export default Routing
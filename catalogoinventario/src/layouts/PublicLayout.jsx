import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function PublicLayout() {
  return (
    <div>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default PublicLayout
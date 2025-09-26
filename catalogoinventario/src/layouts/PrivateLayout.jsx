import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import '../styles/PrivateLayout.css';


function PrivateLayout() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    return (
        <div>
            <div className={`admin-container ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
                <SideBar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default PrivateLayout
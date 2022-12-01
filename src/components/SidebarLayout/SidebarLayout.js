import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { NavLink, Outlet } from 'react-router-dom'
import './SidebarLayout.css'

const SidebarLayout = ({ role }) => {
    return (
        <div className="layout-wrapper">
            <Sidebar className="sidebar-wrapper" role={role} />
            <Outlet className="outlet-wrapper" />
        </div>
    )
}

export default SidebarLayout

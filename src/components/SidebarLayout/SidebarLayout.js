import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { NavLink, Outlet } from 'react-router-dom'
import './SidebarLayout.css'

const SidebarLayout = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <Sidebar className="sidebar-wrapper" />
            <Outlet className="outlet-wrapper" />
        </div>
    )
}

export default SidebarLayout

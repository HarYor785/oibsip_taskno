import React from 'react'
import './sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { IoMdRestaurant } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../../state/settingsSlice';
import { IoMdCart } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { logoutSlice } from '../../state/userSlice';

const Sidebar = () => {
    const location = useLocation()
    const {sidebar} = useSelector((state)=>state.settings)
    const dispatch = useDispatch()

    const handletoggleSidebar = () => {
        dispatch(toggleSideBar(!sidebar))
    }
  return (
    <div 
    className={`sidebar ${sidebar ? 'active' : ''}`}
    >
        <div className="sidebar__overlay" 
        onClick={handletoggleSidebar}
        ></div>
        <div className="sidebar__container">
            <h4 className="sidebar__logo">OVEN FRESH PIZZA</h4>
            <div className="sidebar__items">
                <Link to={'/'} className={`sidebar__link ${
                    location.pathname === '/' && 'active'
                }`}>
                    <MdOutlineDashboard  size={20} 
                    className='sidebar__icon'/>
                    Dashboard
                </Link>
                <Link to={'/menu'} className={`sidebar__link ${
                    location.pathname === '/menu' && 'active'
                }`}>
                    <IoMdRestaurant size={20} 
                    className='sidebar__icon'/>
                    Menu
                </Link>
                <Link to={'/orders'} className={`sidebar__link ${
                    location.pathname === '/orders' && 'active'
                }`}>
                    <IoMdCart size={20} 
                    className='sidebar__icon'/>
                    Orders
                </Link>
                <Link to={'/customers'} className={`sidebar__link ${
                    location.pathname === '/customers' && 'active'
                }`}>
                    <FaUsers  size={20} 
                    className='sidebar__icon'/>
                    Customers
                </Link>
                <Link to={'/'} className={`sidebar__link ${
                    location.pathname === '/settings' && 'active'
                }`}>
                    <IoSettingsOutline size={20} 
                    className='sidebar__icon'/>
                    Settings
                </Link>
                <Link onClick={()=>dispatch(logoutSlice())}
                className={`sidebar__link`}>
                    <MdLogout  size={20} 
                    className='sidebar__icon'/>
                    Logout
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
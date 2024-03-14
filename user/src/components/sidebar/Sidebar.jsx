import React from 'react'
import './sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineDashboard , MdOutlineShoppingCart, MdLogout } from "react-icons/md";
import { IoMdRestaurant, IoMdLocate  } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { handleCart } from '../../state/cartSlice';
import { openSidebar } from '../../state/settingsSlice';
import { logoutSlice } from '../../state/userSlice';

const Sidebar = () => {
    const location = useLocation()
    const {toggle} = useSelector((state)=>state.cart)
    const {sidebar} = useSelector((state)=>state.settings)
    const dispatch = useDispatch()

    const handleTogleCart = () => {
        dispatch(handleCart(!toggle))
    }

    const handletoggleSidebar = () => {
        dispatch(openSidebar(!sidebar))
    }

  return (
    <div className={`sidebar ${sidebar ? 'active' : ''}`}>
        <div className="sidebar__overlay" onClick={handletoggleSidebar}></div>
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
                <Link to={'/favourite'} className={`sidebar__link ${
                    location.pathname === '/favourite' && 'active'
                }`}>
                    <FaRegHeart size={20} 
                    className='sidebar__icon'/>
                    Favourite
                </Link>
                <Link to={'/orders'} className={`sidebar__link ${
                    location.pathname === '/orders' && 'active'
                }`}>
                    <IoMdLocate  size={20} 
                    className='sidebar__icon'/>
                    Track Orders
                </Link>
                <Link onClick={handleTogleCart}
                className={`sidebar__link ${
                    location.pathname === '/cart' && 'active'
                }`}>
                    <MdOutlineShoppingCart  size={20} 
                    className='sidebar__icon'/>
                    Cart
                </Link>
                <Link to={'/settings'} className={`sidebar__link ${
                    location.pathname === '/settings' && 'active'
                }`}>
                    <IoSettingsOutline size={20} 
                    className='sidebar__icon'/>
                    Settings
                </Link>
                <Link onClick={()=>dispatch(logoutSlice())}
                className={`sidebar__link ${
                    location.pathname === '/logout' && 'active'
                }`}>
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
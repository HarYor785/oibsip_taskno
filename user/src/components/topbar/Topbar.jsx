import React, { useState } from 'react'
import './topbar.css'
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";
import { BiTransfer } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar } from '../../state/settingsSlice';
import { logoutSlice } from '../../state/userSlice';
import { IoMdCart } from "react-icons/io";
import { handleCart } from '../../state/cartSlice';



const ProfileDropdown = ({setProfile, user}) => {
  const dispatch = useDispatch()

  return (
    <div className='topbar__dropdown'>
      <div className="topbar__dropdown-overlay" 
      onClick={()=>setProfile(false)}></div>
      <div className="topbar__dropdown-box">
        <Link to={'/settings'} className='topbar__dropdown-link'>
          Profile
        </Link>
        <Link onClick={()=>dispatch(logoutSlice())}
        className='topbar__dropdown-link'>
          Logout
        </Link>
        <div className="topbar__dropdown-item">
          <h5 className="topbar__dropdown-title">Balance</h5>
          <span className="topbar__dropdown-balance">
            ${parseFloat(user?.balance).toFixed(2)}
          </span>
          <div className="topbar__dropdown-buttons">
            <button className="topbar__dropdown-button">
              <CgLogOut size={15} className='topbar__dropdown-icon'/>
              Top up
            </button>
            <button className="topbar__dropdown-button">
              <BiTransfer size={15} className='topbar__dropdown-icon'/>
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Topbar = () => {
  const [profile, setProfile] = useState(false)
  const {user} = useSelector((state)=>state.user)
  const {sidebar} = useSelector((state)=>state.settings)
  const {cart, toggle} = useSelector((state)=>state.cart)
  const dispatch = useDispatch()

  const handleOpenSidebar = () => {
    dispatch(openSidebar(!sidebar))
  }

  const handleTogleCart = () => {
    dispatch(handleCart(!toggle))
}
  return (
    <div className='topbar'>
      {profile && <ProfileDropdown user={user} setProfile={setProfile}/>}
      
      <div className="topbar__container">
        <IoMenu onClick={handleOpenSidebar}
        className='topbar__toggle-icon'/>
        <h4 className="topbar__title">
          Dashboard
        </h4>
        <div className="topbar__content">
          <div className="topbar__search">
              <IoSearch size={20} className='topbar__search-icon'/>
              <input type="text" className="topbar__search-input" 
              placeholder='Search...'/>
          </div>
          <div className="topbar__notification">
            <IoMdNotificationsOutline size={20} className='topbar__notification-icon'/>
          </div>
          <div onClick={handleTogleCart}
          className="topbar__notification">
            <IoMdCart size={20} className='topbar__notification-icon'/>
            <span className="topbar__icon-count">{cart?.length}</span>
          </div>
          <div className="topbar__profile" onClick={()=>setProfile(!profile)}>
            <img src={avatar} alt="" className="topbar__profile-img" />
            <span className="topbar__profile-name">
              {user?.firstName + ' ' + user?.lastName}
            </span>
              <FaChevronDown size={12} className='topbar__profile-icon'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
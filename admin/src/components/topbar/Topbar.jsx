import React, { useState } from 'react'
import './topbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNotification, toggleSideBar } from '../../state/settingsSlice'
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { logoutSlice } from '../../state/userSlice';



const ProfileDropdown = ({setProfile, handleLogout}) => {

    return (
    <div className='topbar__dropdown'>
        <div className="topbar__dropdown-overlay" 
        onClick={()=>setProfile(false)}></div>
        <div className="topbar__dropdown-box">
            <Link to={'/'} className='topbar__dropdown-link'>
            Profile
            </Link>
            <Link onClick={handleLogout}
            className='topbar__dropdown-link'>
            Logout
            </Link>
        </div>
    </div>
    )
  }


const Topbar = () => {
    const [profile, setProfile] = useState(false)
    const {sidebar, notification} = useSelector((state)=>state.settings)
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const handleOpenSidebar = () => {
        dispatch(toggleSideBar(!sidebar))
    }

    const handleOpenNot = () => {
        dispatch(toggleNotification(!notification))
    }

    const handleLogout = () =>{
        dispatch(logoutSlice())
    }
  return (
    <div className='topbar'>
        {profile && <ProfileDropdown setProfile={setProfile} handleLogout={handleLogout}/>}
    
        <div className="topbar__container">
            <IoMenu size={25} onClick={handleOpenSidebar}
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
            <button className="topbar__notification"
            onClick={handleOpenNot}>
                <IoMdNotificationsOutline size={25} 
                className='topbar__notification-icon'/>
                <span>3</span>
            </button>
            <div className="topbar__profile" onClick={()=>setProfile(!profile)}>
                <img src={avatar} alt="" className="topbar__profile-img" />
                <span className="topbar__profile-name">{user?.firstName}</span>
                <FaChevronDown size={12} className='topbar__profile-icon'/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar
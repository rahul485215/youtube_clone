import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_pic from '../../assets/rahul.jpeg'
import { Link } from 'react-router-dom'

const NavBar = ({setSideBar}) => {
  return (
    <nav className='flex-div'>
       <div className='nav-left flex-div'>
         <img className='menu-icon' src={menu_icon} alt="menuicon"
          onClick={()=>setSideBar(prev=>prev===false?true:false)} />
         <Link to ='/'><img className='logo' src={logo} alt="logo" /></Link>
       </div>

       <div className="nav-middle flex-div">
        <div className="search-box flex-div">
            <input type="text" placeholder='Search'/>
            <img src={search_icon} alt="searchicon" />   
        </div>
       </div>

       <div className="nav-right flex-div">
         <img src={upload_icon} alt="uploadicon" />
         <img src={more_icon} alt="moreicon" />
         <img src={notification_icon} alt="notificationicon" />
         <img className='user-icon' src={profile_pic} alt="profileicon" />
       </div>
    </nav>
  )
}

export default NavBar
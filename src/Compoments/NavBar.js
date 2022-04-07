import React , { useState , useContext } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { Logo } from './SubCompoments'
import { FaAlignLeft , FaAngleDown , FaAngleUp , FaRegUserCircle , FaCaretUp } from 'react-icons/fa'

const NavBar = (props) => {

    const navigate = useNavigate()
    const { user , setUser , showSidebar , setShowSidebar } = useContext(AppContext)
    const [ showLogout , setShowLogout ] = useState(false)

    const logoutHandler = () => {
        localStorage.clear()
        setUser({
            authenticated : false,
            name : "",
            token : ""
        })
        setShowLogout(false)
        navigate('/')   
    }

    if(user.authenticated){
        return (
        
            <nav>
                <div className='sidebar-toggle-btn-container'>
                    <FaAlignLeft className='sidebar-toggle-btn' onClick={() => setShowSidebar(!showSidebar)}/>
                </div>
                <div className='navbar-text'>
                    dashboard
                </div>
                <div className='user-info-container'>
                    <div className='user-info' onClick={() => setShowLogout(!showLogout)}>
                        <FaRegUserCircle />
                        <p className='user-name'>
                            { user.name.substring(0,10) }
                        </p>
                        {
                            showLogout ? <FaAngleUp /> :<FaAngleDown /> 
                        }
                    </div>
                    {
                        showLogout ?
                        <div className='logout-btn' onClick={logoutHandler}>
                            <FaCaretUp className='arraw'/>
                            <p>logout</p> 
                        </div>
                        : 
                        null     
                    }
                </div>
            </nav>
        )
    }
    else{
        return (
            <nav>
                <Logo />
            </nav>
        )
    }
}

export default NavBar
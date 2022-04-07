import React from 'react'
import {FaTasks} from 'react-icons/fa'

const Logo = () => {
    return (
        <div className='logo'>
            <FaTasks className='logo-icon'/>
            <h3 className='logo-text'>To Do Tasks</h3>
        </div>
    )
}

export default Logo
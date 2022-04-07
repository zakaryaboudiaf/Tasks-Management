import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className='home-page'>
            <div className='about-app-container'>
                <div className='about-app'>
                    <h3 >you want to manage and organise your tasks easaly?</h3>
                    <p>
                        By creating a simple To-Do List, You can manage, organize 
                        and keep tracking your work and duties directly from your 
                        web browser in a sophisticated manner, so you never forget anything.
                    </p>
                    <button className='start-btn' onClick={() => navigate('/authentication')}>
                        start now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
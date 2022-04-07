import React , { useState , useEffect } from 'react'
import { BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom'
import { Home , Authentication , Dashboard , AddJob , AllJobs , Profile , NotFound , NavBar , SideBar } from './Compoments'
import axios from 'axios';

const AppContext = React.createContext();

const url = "https://to-do-tasks-api2.herokuapp.com/api/v1/tasks/"

const userName = localStorage.getItem('name')
const userToken = localStorage.getItem('token')

const App = () => {

    const [user , setUser] = useState({
        authenticated : userName && userToken ? true : false,
        name : userName || "user" ,
        token : userToken || ''
    })
    const [userTasks , setUserTasks] = useState([])
    const [loadingUserTasks , setLoadingUserTasks] = useState(false)
    const [showSidebar , setShowSidebar] = useState(window.innerWidth >= '850' ? true : false)

    const getAllTasks = async() => {
        setLoadingUserTasks(true)
        try{
            const response = await axios.get(url , { 
                headers : {
                    authentication : user.token
                }
            })
            if(response.status === 200){
                setUserTasks(response.data)
            }  
        }
        catch(error){
            const response = error.response
            if(response){
                console.log(response.data.error)
                if(response.status === 401 && response.data.error['0'] === 'Invalid Token'){
                    localStorage.clear()
                    setUser({
                        authenticated : false,
                        name : "",
                        token : ""
                    })
                }
            }
        }
        setLoadingUserTasks(false)
    }

    useEffect(() => {
        if(user.authenticated){
            getAllTasks()
        }
    } , [])

    useEffect(() => {
        if(user.authenticated){
            getAllTasks()
        }
    } , [user])



    return (
    <AppContext.Provider value = { { user , setUser , userTasks , setUserTasks , showSidebar , setShowSidebar , loadingUserTasks , setLoadingUserTasks} } >
        <Router>
            <div className='app'>
                    <div>
                        {
                            user.authenticated ? <SideBar /> : null
                        } 
                    </div>
                <div className='app-content'>
                        <NavBar/>
                        <Routes>
                            <Route exact path='/' element={ user.authenticated ? <Navigate to='/dashboard'/> : <Home />}/>
                            <Route exact path='/authentication' element={ user.authenticated ? <Navigate to='/dashboard'/> : < Authentication/>} />
                            <Route exact path='/dashboard' element={ user.authenticated ? <Dashboard/> : <Navigate to='/authentication' />} /> 
                            <Route exact path='/alljobs' element={user.authenticated ? <AllJobs /> : <Navigate to='/authentication' />}/>
                            <Route exact path='/profile' element={ user.authenticated ? <Profile /> : <Navigate to='/authentication' />} /> 
                            <Route exact path='*' element={ <NotFound />} /> 
                        </Routes>
                </div>
            </div>
        </Router>
    </AppContext.Provider>
    )
}

export { App , AppContext }
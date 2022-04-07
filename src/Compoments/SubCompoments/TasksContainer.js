import React , { useContext , useEffect , useState } from 'react'
import { AppContext } from '../../App'
import { AllTasksContext } from '../AllJobs'
import {FaCalendarAlt} from 'react-icons/fa'
import {GrStatusUnknown} from 'react-icons/gr'
import Loading from './Loading'
import axios from 'axios'

const url = "https://to-do-tasks-api2.herokuapp.com/api/v1/tasks/"

const TasksContainer = () => {

    const { modal , setModal , filtredTasks , setFiltredTasks , editAdd , setEditAdd } = useContext(AllTasksContext)
    const { user , setUser ,userTasks , setUserTasks , loadingUserTasks , setLoadingUserTasks } = useContext(AppContext)
    


    const deleteTask = async(id) => {
        setLoadingUserTasks(true)
        try{
            const response = await axios.delete(`${url}${id}` , {
                headers : {
                    authentication : user.token
                }
            })
            if(response.status === 200){
                const newTasks = userTasks.filter((item) => item._id !== id)
                setUserTasks(newTasks)
                setModal({
                    status : "fail",
                    show : true,
                    messages : ['Task Deleted']
                })
                
            }
        }
        catch(error){
            const response = error.response
            if (response){
                setModal({
                    status : "fail",
                    show : true,
                    messages : response.data.error || []
                })
            }  
        }
        setLoadingUserTasks(false)
    }

    const deleteTaskHandler = (id) => {
        deleteTask(id)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const editTaskHandler = (task) => {
        setEditAdd ({
            showForm : true ,
            edit : true ,
            editedTask : task
        })
    }

    return (
        <div>

            <div className='tasks-header'>
                <h3>my tasks</h3>
                <div className='line-title'></div>
            </div>
            {
                loadingUserTasks ? <Loading /> : null
            }
            
            {
                filtredTasks.tasks.length !== 0 ? 
                <div className="tasks-container">
                    {
                        filtredTasks.tasks.map((task , index) => {
                            return (
                                <div className="task" key={index}>
                                    <div className='task-wrapper'>
                                        <div className='task-title'>
                                            <p>
                                            {task.name} 
                                            </p>
                                        </div>
                                        <div className='task-info'>
                                            <div>
                                                <div style={{posituin : 'relative'}}>
                                                <FaCalendarAlt className='icon'/>
                                                </div>
                                                <p>{`Created on: ${task.createdAt.slice(0,10)}`}</p>
                                            </div>
                                            <div>
                                                <GrStatusUnknown className='icon' />
                                                <p>{`Status: ${task.status === 'notstarted' ? 'Not Started' : task.status}`}</p>
                                            </div>
                                        </div>
                                        <div className='task-btns'>
                                            <button className='edit' onClick={ () => { editTaskHandler(task) } }>Edit</button>
                                            <button className='delete' onClick={() => {deleteTaskHandler(task._id)}}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                </div>
                : 
                <div className='empty-tasks'>
                {
                    loadingUserTasks ?  null : <h1>{`you have no ${filtredTasks.filtredBy === "all" ? '' : filtredTasks.filtredBy} Tasks`}</h1> 
                }
                </div>
            }
        </div>
    )
}

export default TasksContainer
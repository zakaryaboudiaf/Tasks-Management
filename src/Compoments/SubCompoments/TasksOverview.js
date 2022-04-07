import React , { useState , useContext , useEffect } from 'react'
import { BiTask , BiTaskX , BiClipboard } from 'react-icons/bi'
import { AppContext } from '../../App'

const tasksInitialStatus = [

        { 
            status : 'notstarted' ,
            number : 0 ,
            icon : <BiTaskX/> ,
            text : 'Not started tasks'
        },
        { 
            status : 'started' ,
            number : 0 ,
            icon : <BiClipboard/> ,
            text : 'Started tasks'
        },
        { 
            status : 'done' ,
            number : 0 ,
            icon : <BiTask/>,
            text : 'Finished tasks'
        }
    ]

const TasksOverview = () => {
    
    const { userTasks , setUserTasks } = useContext(AppContext)
    const [ tasksStatus , setTasksStatus ] = useState(tasksInitialStatus)

    useEffect(() => {
     
        const newTasksStatus = tasksStatus.map((item) => {
            const number = userTasks.filter((task) => task.status === `${item.status}`).length
            return (
                {...item , number : number}
            )
        })
        setTasksStatus(newTasksStatus)
        
    } , [userTasks])

    return (
    <>
    {
        tasksStatus.map((item , index) => {
            const { status , number , icon , text } = item
            return(
                <div className='task-status-container' key={index}>
                    <div className='task-status'>
                        <div className={`task-status-num s${status}`}>
                            {number || 0}
                            {icon}
                        </div>
                        <div className='task-status-text'>
                            {text}
                        </div> 
                    </div>
                </div>
            )
        })
    }
    </>
    )
}

export default TasksOverview
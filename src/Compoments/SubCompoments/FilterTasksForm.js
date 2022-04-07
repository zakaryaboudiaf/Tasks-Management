import React , {useContext} from 'react'
import { AllTasksContext } from '../AllJobs'
import { AppContext } from '../../App'

const FilterTasksForm = () => {


    const { modal , setModal , filtredTasks , setFiltredTasks , editAdd , setEditAdd } = useContext(AllTasksContext)
    const { userTasks , setUserTasks } = useContext(AppContext)


    const filterHandler = () => {

        const filtredStatus = document.querySelector('.filter-tasks-form').status.value;
        let newFiltredTasks = []
        console.log(newFiltredTasks)
        if(filtredStatus === "all"){
            newFiltredTasks = userTasks
        }
        else{
            newFiltredTasks = userTasks.filter((task) => task.status === filtredStatus)
            
        }
        setFiltredTasks({ filtredBy : filtredStatus , tasks : newFiltredTasks})

    }


    return (
        <div className='filter-tasks-form-container'>

                <form className='filter-tasks-form'> 
                    <div>
                        <label>Filter Tasks by Status</label>
                        <select name="status" id="status" className='filter-tasks-form-select' onChange={filterHandler}>
                            <option value="all">All</option>
                            <option value="notstarted">Not Started</option>
                            <option value="started">Started</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </form>
                <button className='filter-tasks-clear-btn' onClick={() => setEditAdd({showForm : true , edit : false , editedObj : null})}>Add New Task</button>
            </div>
    )
}

export default FilterTasksForm
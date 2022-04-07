import React , {useEffect , useState , useContext} from 'react'
import { AllTasksContext } from '../AllJobs'
import { AppContext } from '../../App'
import Loading from './Loading'
import axios from 'axios'

const url = "https://to-do-tasks-api2.herokuapp.com/api/v1/tasks/"


const AddEditForm = () => {

    const {modal , setModal , filtredTasks , setFiltredTasks , editAdd , setEditAdd } = useContext(AllTasksContext)
    const { user , setUser , userTasks , setUserTasks } = useContext(AppContext)
    const [loading , setLoading] = useState(false)


    const createTask = async(taskName , taskStatus) => {
        setLoading(true)
        try{
            const response = await axios.post (url , {
                "name" : taskName,
                "status" : taskStatus
            },
            {
                headers : {
                    authentication : user.token
                }
            })
            if(response.status === 201){
                const newTasks = [ ...userTasks , response.data]
                setUserTasks(newTasks)
                setModal({
                    status : "success",
                    show : true,
                    messages : ['Task Added']
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
        setLoading(false)
    }

     const editTask = async (name , status , task) => {
        setLoading(true)
        try{
            const response = await axios.patch(`${url}${task._id}` , {

                    "name" : name,
                    "status " : status
                },
                {
                    headers : {
                        authentication : user.token
                    }
                }
            )
            if (response.status === 200){
                const newTasks = userTasks.map((item) => {
                    if (item._id === task._id){
                        return response.data
                    }
                    else{
                        return item
                    }
                })

                setUserTasks(newTasks)
                setEditAdd({
                    showForm : false,
                    edit : false ,
                    editedObj : null
                })
                setModal({
                    status : "success",
                    show : true,
                    messages : ['Task Updated']
                })
            }
            setLoading(false)
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
    }

    useEffect (() => {
        if(editAdd.edit){
            document.querySelector('form').name.value = editAdd.editedTask.name;
            document.querySelector('form').status.value = editAdd.editedTask.status;
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

    } , [editAdd])


    const submitHandler = (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        const taskName = form.name.value
        const taskStatus = form.status.value
        const editedTask = editAdd.editedTask
        editAdd.edit ?  editTask(taskName , taskStatus , editedTask) :createTask(taskName , taskStatus)
        form.name.value = ""
        form.status.value = "notstarted"
    }

    
    return (
        <div className='add-form-container'>
            {
                loading ? <Loading /> : null
            }
            <div>
                <h3 className='tasks-header'>{editAdd.edit ? <>Edit Tasks</> : <>Add Task</> }</h3>
            </div>
            <form onSubmit={(e) => submitHandler(e)}>
                <div className='add-form'>
                    <div className="form-item-container">
                        <input type="text" name='name' id='name' placeholder='Task Name' className='form-item form-input'/>
                    </div>
                    <div className="form-item-container">
                        <select name="status" id="status" className='form-item form-select'>
                                <option value="notstarted">Not Started</option>
                                <option value="started">Started</option>
                                <option value="done">Done</option>
                        </select>
                    </div>
                </div>
                <div className="form-item-container">
                    <button type='submit' className='form-item form-btn'>
                        Submit
                    </button>
                </div>
            </form>
            <div className="form-item-container" onClick={() => setEditAdd({showForm : false , edit : false , editedObj : null})}>
                    <button className='form-item form-btn'>
                        Filter Tasks
                    </button>
                </div>
        </div>
    )
}

export default AddEditForm
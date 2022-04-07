import React , { useContext , useEffect , useState , createContext} from 'react'
import { AppContext } from '../App'
import { FilterTasksForm , TasksContainer , AddEditForm , Modal} from './SubCompoments'

const AllTasksContext = createContext()

const AllJobs = () => {

    const { userTasks , setUserTasks } = useContext(AppContext)
    const [ filtredTasks , setFiltredTasks ] = useState({ filtredBy : "all" , tasks : userTasks})
    const [ editAdd , setEditAdd ] = useState({showForm : false , edit : false , editedTask : null})
    const [modal , setModal] = useState({ show :false , status : 'success' , messages : [''] })


    useEffect(() => {
        if(modal.show){
            setTimeout(() => {
                setModal({...modal , show : false})
            } , 3000)
        }

    } , [modal.show])

    useEffect(() => {
        setFiltredTasks({...filtredTasks , tasks : userTasks})
    } , [userTasks])

    return (
    <AllTasksContext.Provider value={ {modal , setModal , filtredTasks , setFiltredTasks , editAdd , setEditAdd } }>
        <div className='all-jobs-container'>
            <div className='modal-container'>
            {
                modal.show ? <Modal modalObj={modal} /> : null
            }
            </div>
           
            {
                editAdd.showForm ? <AddEditForm /> : <FilterTasksForm />
            }
            <TasksContainer filtredTasks={filtredTasks}/>
      
        </div>
    </AllTasksContext.Provider>
    )
}

export {AllJobs , AllTasksContext} 
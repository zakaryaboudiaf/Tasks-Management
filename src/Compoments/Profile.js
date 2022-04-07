import React , { useEffect , useState , useContext , useRef} from 'react'
import { Modal , Loading } from './SubCompoments'
import { AppContext } from '../App'
import axios from 'axios'


const url = "https://to-do-tasks-api2.herokuapp.com/api/v1/user"



const Profile = () => {

    const { user , setUser , showSidebar } = useContext(AppContext)
    const [ userData , setUserData ] = useState({})
    const [ modal , setModal ] = useState({ show : false , status : 'success' , messages : [''] })
    const [ loadding , setLoading ] = useState(false)
    const [ showDeleteForm , setShowDeleteForm ] = useState(false)
    const fullPageRef = useRef(null)
    const dialogPageRef = useRef(null)

    const handleUser = async (method , body) => {
        let operation = axios.get(url,
                {
                    headers : {
                        authentication : user.token
                    }
                })
        if( method === 'patch'){
            operation = axios.patch(url, body || {} ,
                {
                    headers : {
                        authentication : user.token
                    }
                })
        }
        if( method === 'delete'){
            operation = axios.delete(url,{
                    headers : {
                        authentication : user.token
                    }, 
                data : body || {} 
                })
        }

        setLoading(true)
        try{
            const response = await operation
            if(response.status === 200){
                setUserData(response.data)
            }
            if(method && method === 'patch'){
                setModal({
                    status : "success",
                    show : true,
                    messages : ['user Profile was Updated successfuly']
                })
            }
            if(method && method === 'delete'){
                setUser({})
            }

        }catch(error){
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

    const profileUpdateHandler = (e) => {
        e.preventDefault()
        const profileForm = document.querySelector('#profile-update-form')
        const name = profileForm.name.value || ''
        const lastName = profileForm.lastName.value || ''
        const email = profileForm.email.value || '' 
        handleUser('patch' , {name : name , lastName : lastName , email : email}) 
    }

    const profileDeleteHandler = (e) => {
        e.preventDefault()
        const profileForm = document.querySelector('#profile-delete-form')
        const password = profileForm.password.value
        handleUser('delete' , {password : password})
        profileForm.password.value = ""
        setShowDeleteForm(false)
        
    }

    const adjustDialogBoxContainerSise = () => {
        const pageWidth = fullPageRef.current.getBoundingClientRect().width
        dialogPageRef.current.style.width = `${pageWidth}px`

    }
    const resiseHander = () => {
        adjustDialogBoxContainerSise()
    }

    useEffect(() => {
        let pageWidth = fullPageRef.current.getBoundingClientRect().width
        if(pageWidth >= 850){
            pageWidth = showSidebar ? pageWidth - 250 : pageWidth + 250
        }
        dialogPageRef.current.style.width = `${pageWidth}px`
    } , [showSidebar])

    useEffect(() => {
        handleUser()
        window.addEventListener('resize' , () => resiseHander())
        adjustDialogBoxContainerSise()
        return (() => {
            window.removeEventListener('resize' , () => resiseHander())
        })
    } , [])


    useEffect(() => {
        if(modal.show){
            setTimeout(() => {
                setModal({...modal , show : false})
            } , 3000)
        }

    } , [modal.show])

    useEffect(() => {
        dialogPageRef.current.style.zIndex = showDeleteForm ? "15" : "-1"
    } , [showDeleteForm])

    useEffect(() => {
        const {name , lastName , email} = userData
        const profileForm = document.querySelector('#profile-update-form')
        profileForm.name.value = name || ''
        profileForm.lastName.value = lastName || ''
        profileForm.email.value = email || ''
    } , [userData])


    return (
    <>
        <div className='profile-page' ref={fullPageRef}>
        
            <div className="dialog-box" ref={dialogPageRef}>
                <div>
                    <form id='profile-delete-form' className='delete-form' onSubmit={ (e) => profileDeleteHandler(e)}>
                        <h4>Please Confirm your password </h4>
                        <input type="password" name='password' placeholder='Password' className='profile-form-input' />
                        <div>
                            <button type='button' className='edit' onClick={() => {setShowDeleteForm(false)}}>cancel</button>
                            <button type='submit' className='delete'> Delete</button>
                        </div>
                        
                    </form>
                </div>
            </div>


            <div className='profile-form-container' >
                {
                    modal.show ? <Modal modalObj={ modal } /> : null
                }
                {
                    loadding ? <Loading /> : null
                }
                <>
                    <h3>Profile</h3>
                    <form id='profile-update-form' onSubmit={(e) => {profileUpdateHandler(e)}}>
                        <div className='profile-form-inputs'>
                            <input type='text' name='name' id='name' placeholder='Name' className='profile-form-input'/>
                            <input type='text' name='lastname' id='lastName' placeholder='Last Name' className='profile-form-input'/>
                            <input type='email' name='email' id='email' placeholder='Email' className='profile-form-input'/>
                        </div>
                        <button type='submit' className='profile-form-btn'>Save Changes</button>  
                    </form>
                    <button className='delete padding' onClick={() => {setShowDeleteForm(true)}}>Unregister</button>
                </>
            </div>

        </div>
    </>
    )
}

export default Profile
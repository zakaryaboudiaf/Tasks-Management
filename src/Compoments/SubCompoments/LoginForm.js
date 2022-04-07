import React , {useContext} from 'react'
import { AppContext } from '../../App'
import { AuthContext } from '../Authentication'
import axios from 'axios'

const loginUrl = "https://to-do-tasks-api2.herokuapp.com/api/v1/auth/login"

const LoginForm = () => {

    const { setUser } = useContext(AppContext)
    const { loading , setLoading , modal , setModal } = useContext(AuthContext)

    const loginUser = async( email , password) => {
        
        setLoading(true)

        try{
            const response = await axios.post( loginUrl , {
                "email" : email,
                "password" : password
            })
            if(response.status === 200){
                localStorage.setItem("name" , response.data.user.name)
                localStorage.setItem("token" , `Bearer ${response.data.token}`)
                setUser({
                    authenticated : true,
                    name : localStorage.getItem('name'),
                    token : localStorage.getItem('token')
                })  
            }
        }
        catch(error){

            const response = error.response

            if(response){
                setModal({
                    status : "fail",
                    show : true ,
                    messages : response.data.error
                 })
                localStorage.clear()
            }
            setLoading(false)
        } 
    }


    const sbmitHandler = (e) => {
        e.preventDefault()
        const form = document.querySelector("#login-form")
        const email = form.email.value
        const password = form.password.value
        loginUser(email , password)
        form.password.value = ""

    }

    return (  
    <>
        <form id='login-form' className='formm' onSubmit={(e) => sbmitHandler (e)} >
            <p>login</p>
            <input type="email" name='email' placeholder='Email' maxLength="45" />
            <input type="password" name='password' placeholder='Password' maxLength="45"/>
            <button type='submit' >Login</button>
        </form>
    </>
    )
}

export default LoginForm
import React , {useContext} from 'react'
import { AppContext } from '../../App'
import { AuthContext } from '../Authentication'
import axios from 'axios'

const registerUrl = "https://to-do-tasks-api2.herokuapp.com/api/v1/auth/register"

const RegisterForm = () => {

    const {setUser } = useContext(AppContext)
    const {loading , setLoading , modal , setModal} = useContext(AuthContext)

    const registerUser = async (name , email , password) => {

        setLoading(true)

        try{
            const response = await axios.post(registerUrl , {
                "name" : name,
                "email" : email,
                "password" : password
            })
            if( response.status === 201 ){

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
        const form = document.querySelector("#register-form")
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        registerUser(name , email , password)
        form.password.value = '' 

    }

    return (
        <form id='register-form' className='formm' onSubmit={(e) => sbmitHandler (e)}>
            <p>register</p>
            <input type="text" name='name' placeholder='Name' maxLength="45" />
            <input type="email" name='email' placeholder='Email' maxLength="45" />
            <input type="password" name='password' placeholder='Password' maxLength="45"/>
            <button type='submit' >register</button>
        </form>
    )
}

export default RegisterForm
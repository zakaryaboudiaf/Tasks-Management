import React , {useState , useEffect , useContext , createContext} from 'react'
import { LoginForm , RegisterForm , Loading , Modal} from './SubCompoments'

const AuthContext = createContext()

const Authentication = () => {

    const [login , setLogin] = useState(true)
    const [loading , setLoading] = useState(false)
    const [modal , setModal] = useState({ show : false , status : 'success' , messages : [] })


    useEffect(() => {
        if(modal.show){
            setTimeout(() => {
                setModal({...modal , show : false})
            } , 3000)
        }

    } , [modal.show])

    return (
    <AuthContext.Provider value={{loading , setLoading , modal , setModal}}>
        <div className='authentication-page'>
            <div className='form'>
                <div className="auth-form">
                    <div>
                    {
                        loading ? <Loading /> : null
                    }
                    {
                        modal.show ? <Modal modalObj={modal}/> : null
                    }
                    </div>
                    <div className="form-container">
                    {
                        login ? <LoginForm /> : <RegisterForm />
                    }
                    </div>
                    <div className='form-toggle'>
                        <p>
                        {
                            login ? 'Do not have an account?' : 'Already have an account?'
                        }
                        </p>
                        <button onClick={ () => setLogin(!login) }>
                        {
                            login ? 'register' : 'log in'
                        }
                        </button>
                    </div>
                </div>
            </div>     
        </div>
    </AuthContext.Provider>
    )
}

export { Authentication , AuthContext }
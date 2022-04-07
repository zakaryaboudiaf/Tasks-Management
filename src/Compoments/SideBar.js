import React , { useRef , useState , useEffect , useContext } from 'react'
import { AppContext } from '../App'
import { RiDashboardLine , RiLineChartFill , RiAddBoxLine , RiProfileLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Logo } from './SubCompoments'


const SideBar = (props) => {

    const {showSidebar , setShowSidebar} = useContext(AppContext)
    const [isMobile , setisMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    const sidebarRef = useRef(null)

    const checkSize = () => {
        const windowSize =  window.innerWidth
        if(!isMobile){
            if( windowSize >= '850'){
                sidebarRef.current.style.width = showSidebar ? '250px' : '0px'
            } 
            if( windowSize <= '850'){
                if(sidebarRef.current.style){
                    sidebarRef.current.style.width = '0vw'
                }
                
            }
        } 
    }

    const linkClickHandler = () => {
        const screenWidth = window.innerWidth
        if(screenWidth <= '850'){
            setShowSidebar(false)
        }

    }



    useEffect(() => {
        window.addEventListener('resize' , () => checkSize())

        document.querySelectorAll('.link-container').forEach((item) => {
            item.addEventListener('click' , () => linkClickHandler())
        })

        return (() => {
            window.removeEventListener('resize' , () => checkSize())

            document.querySelectorAll('.link-container').forEach((item) => {
                item.removeEventListener('click' , () => linkClickHandler())
            })

        })

    } , [])


    useEffect(() => {

        const screenWidth = window.innerWidth
        if(screenWidth >= '850'){
            sidebarRef.current.style.width = showSidebar ? '250px' : '0px'
        }
        else{
            sidebarRef.current.style.width = showSidebar ? '95vw' : '0vw'
        }
    } , [showSidebar])

    return (
            <aside className='app-sidebar' ref={sidebarRef}>
                <div className='sidebar-logo'>
                    <Logo />    
                </div>
                <div className='sidebar-links'>
                    <div className='link-container'>
                        <Link to='/dashboard' className='link'><RiDashboardLine className='link-icon'/>dashboard</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/alljobs' className='link'><RiLineChartFill className='link-icon' />all tasks</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/alljobs' className='link'><RiAddBoxLine className='link-icon'/>add task</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='profile' className='link'><RiProfileLine className='link-icon'/>profile</Link>
                    </div>
                </div>  
            </aside>
    )
}

export default SideBar
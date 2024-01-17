

import './LandingPage.css'
import { NavLink } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
const LandingPage = () => { 

    const {setModalContent} = useModal()

    const handleLogin = () => { 
        
      setModalContent(<LoginFormModal />)
    }
    
    const handleSingUp = () => { 
        setModalContent(<SignupFormModal />)
    }

    return (

        <div className='main-center'>
    <div className="welcome-message">
        <h1>Welcome to Carsy!</h1>
        <NavLink to='/product'  className="mainpage-button">View Cars</NavLink>
      <button onClick={handleLogin} className="mainpage-button">Log In</button>
      <button onClick={handleSingUp} className="mainpage-button">Sign Up</button>
    </div>
      

</div>

    )
}


export default LandingPage
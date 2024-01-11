

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

        <div>
    <div className="welcome-message">
        <h1>Welcome to Carsy!</h1>
        <NavLink to='/product'  className="mainpage-button">View Cars</NavLink>
      <button onClick={handleLogin} className="mainpage-button">Log In</button>
      <button onClick={handleSingUp} className="mainpage-button">Sign Up</button>
      <p>Designed and developed by <a href="https://github.com/Azadcelik/project-trial">Azad Celik</a></p>
    </div>
      

</div>

    )
}


export default LandingPage
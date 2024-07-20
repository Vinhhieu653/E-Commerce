import './Navbar.css'
import nav_logo from '../../assets/nav-logo.svg'
import nav_profile from '../../assets/nav-profile.svg'


const Navbar = () => {
    return (
        <div className="navbar">
            <img className='nav-logo' src={nav_logo} alt='Logo' />
            <img className='nav-profile' src={nav_profile} alt='Profile' />
        </div>
    )
}

export default Navbar
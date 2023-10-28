import Logo from './images/ST Transparent.png';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
    const loc = useLocation()
    const logoutHandler = (e) => {
        localStorage.removeItem("userToken");
        
    }
    return (

                <div className="navbar">
                    <img src={Logo} alt="LOGO" className='logoimage' />
                    <div className='buttons'>
                        <Link to="/home" className='homebutton'> Home </Link>

                        {/* <button className='Coursesbutton'> Courses </button> */}
                        <button className='Logoutbutton' onClick={logoutHandler}> Logout </button>
                    </div>
                </div>

    );
}

export default Navbar;
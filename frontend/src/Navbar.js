import Logo from './images/ST Transparent.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (

                <div className="navbar">
                    <img src={Logo} alt="LOGO" className='logoimage' />
                    <div className='buttons'>
                        <Link to="/home" className='homebutton'> Home </Link>

                        {/* <button className='Coursesbutton'> Courses </button> */}
                        <button className='Logoutbutton'> Logout </button>
                    </div>
                </div>

    );
}

export default Navbar;
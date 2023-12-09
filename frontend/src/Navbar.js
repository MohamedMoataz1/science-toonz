import { Button } from '@mui/material';
import Logo from './images/ST Transparent.png';
import { Link, useLocation, useHistory } from 'react-router-dom';
const Navbar = () => {
    const history = useHistory();
    const loc = useLocation()
    const logoutHandler = (e) => {
        localStorage.removeItem("userToken");
        history.push('/');
    }
    return (

        <div className="navbar">
            <img src={Logo} alt="LOGO" className='logoimage' />
            <ul className='buttonlist'>
                <Link to="/home" className='navbuttons' > Home </Link>
                <Link to="/home/RegisterStudent" className='navbuttons'> Register Student </Link>
                <Link to="/home/addcourse" className='navbuttons' tabindex="0" title="AddCourse" >
                    Create Course
                </Link>

                <Link to = "/home/ShowStudents" className='navbuttons' tabindex="0" >Students</Link>
                <a onClick={logoutHandler} className='navbuttons'> Logout </a>



            </ul>
        </div>

    );
}

export default Navbar;
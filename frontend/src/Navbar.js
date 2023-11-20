import Logo from './images/ST Transparent.png';
import { Link, useLocation ,useHistory} from 'react-router-dom';
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
                    <div className='buttons'>
                        <Link to="/home" className='homebutton'> Home </Link>

                        {/* <button className='Coursesbutton'> Courses </button> */}
                        <button className='Logoutbutton' onClick={logoutHandler}> Logout </button>
                    </div>
                </div>

    );
}

export default Navbar;
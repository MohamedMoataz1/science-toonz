import Logo from './images/ST Transparent.png';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Navbar = () => {
    const Token = localStorage.getItem("userToken")
    const loc = useLocation();
    const history = useHistory();
    const logoutHandler = (e) => {

        localStorage.removeItem("userToken");
        history.push('/');

    }
    return (
        <div>
            {Token &&
                <div className="navbar">
                    <img src={Logo} alt="LOGO" className='logoimage' />
                    <div className='buttons'>


                        <button className='Logoutbutton' onClick={logoutHandler}> Logout </button>
                    </div>
                </div>

            }

        </div>



    );
}

export default Navbar;
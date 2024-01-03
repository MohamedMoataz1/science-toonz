import { Button } from '@mui/material';
import Logo from './images/ST Transparent.png';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ClassNames } from '@emotion/react';
import { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MobileMenu from './components/MobileMenu';
const Navbar = ({isMobile ,setisMobile ,toggleMenuModal}) => {
    const history = useHistory();
    const loc = useLocation()
    
    const logoutHandler = (e) => {
        localStorage.removeItem("userToken");
        history.push('/');
    }
    
    return (
        <nav className="navbar">

            <IonMenuButton onClick={toggleMenuModal} class='menu-button'></IonMenuButton>
            
            <div className='logo'>
                <img src={Logo} alt="ScienceToonzLogo" />
            </div>

            <ul className="nav-links">
                <Link to="/home" className="home">
                    <li>Home</li>
                </Link>
                <Link to="/home/RegisterStudent" className="register">
                    <li>Register Student</li>
                </Link>
                <Link to="/home/addcourse" className="add-course">
                    <li>Create Course</li>
                </Link>
                <Link to="/home/ShowStudents" className="show-student">
                    <li>Students</li>

                </Link>
                <Link to="/home/mergecourses" className="merge-courses">
                    <li>Merge Courses</li>
                
                </Link>
                <div className="logout" onClick={logoutHandler}>
                    <li>
                        Logout
                    </li>
                </div>

            </ul>



        </nav>
    );
}

export default Navbar;
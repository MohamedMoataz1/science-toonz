import "../cssFiles/Home.css"
import { Link, useHistory } from 'react-router-dom';
const MobileMenu = ({toggleMenuModal}) => {

    const history = useHistory();
    const logoutHandler = (e) => {
        localStorage.removeItem("userToken");
        history.push('/');
    }
    return (
    <div className="modal-menu">
        <ul className="nav-links-mobile">
            <Link to="/home" className="home">
                <li onClick={toggleMenuModal}>Home</li>
            </Link>
            <Link to="/home/RegisterStudent" className="register">
                <li onClick={toggleMenuModal}>Register Student</li>
            </Link>
            <Link to="/home/addcourse" className="add-course">
                <li onClick={toggleMenuModal}>Create Course</li>
            </Link>
            <Link to="/home/ShowStudents" className="show-student">
                <li onClick={toggleMenuModal}>Students</li>

            </Link>
            <Link onClick={toggleMenuModal} to="/home/mergecourses" className="merge-courses">
                    <li>Merge Courses</li>
                
                </Link>
            <div className="logout" onClick={logoutHandler}>
                <li onClick={toggleMenuModal}>
                    Logout
                </li>
            </div>
        </ul>
        <div className="close-menu" onClick={toggleMenuModal}>
            
        </div>
        
    </div>



    );
}

export default MobileMenu;
import Navbar from './Navbar';
import NavbarStudent from './NavbarStudent';
import './cssFiles/CourseDetails.css';
import * as React from 'react';
import './cssFiles/Home.css';
import { useEffect, useState, } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './cssFiles/StudentHome.css';

const StudentHome = () => {
    const [coursesWithSessionsOfStudentDtos, setcoursesWithSessionsOfStudentDtos] = useState([])
    const userToken = localStorage.getItem('userToken');
    const [loading, setLoading] = useState(true);
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };
    const location = useLocation();
    const studentid = new URLSearchParams(location.search).get('id');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/student/getStudentDetails/${studentid}`, {
                    headers: headers,
                });
    
                if (!response.ok) {
                    // Handle error, for example:
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setcoursesWithSessionsOfStudentDtos(data.coursesWithSessionsOfStudentDtos);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                
            }
        };
    
        fetchData();
        
    
    }, []);

    

    return (
        <div className="back">
            <div className="embdedbox">
                <NavbarStudent />
                <div >
                    {loading && <p>Loading...</p>}
                    <div >
                            {coursesWithSessionsOfStudentDtos.map(course => (
                                <div className='Details' key={course.id}>
                                    <h1>{course.name}</h1>
                                    {/* {course.sessionDtoList.map( (session,index)  => (
                                        <a href={session.link} key={session.id} target='blank' rel="noopener noreferrer">
                                            Session {index+1}
                                        </a>
                                    ))} */}
                                    <a href={course.sessionDtoList[0]} className='button'>Upcoming Session</a>
                                </div>
                            ))}
                        </div>


                </div>


            </div>
        </div>



    );

}
export default StudentHome;
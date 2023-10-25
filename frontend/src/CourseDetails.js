import { useParams, Link } from "react-router-dom";
import Logo from '../src/images/ST Transparent.png'
import './cssFiles/CourseDetails.css'
import { useEffect, useState } from "react";

const CourseDetails = () => {
    const [courseByid, setcourseByid] = useState('nothing to show');
    const { id } = useParams();
    const userToken = localStorage.getItem('userToken');
    const [Students, setstudents] = useState([]);
    const [Sessions, setSessions] = useState([{}]);

    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };


    useEffect(() => {
        const getData = async () => {
            await fetch(`http://localhost:8080/api/course/getCourseById/${id}`,
                {
                    headers: headers,
                })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setcourseByid(data);
                })
        }
        const getSessions = async () => {
            await fetch("http://localhost:8080/api/session/getSessionsByCourse/feb",
                {
                    headers: headers,
                })
                .then(res => {
                    return res.json();

                })
                .then(data => {
                    setSessions(data);
                    console.log(data);


                })
            }
        getSessions()
        getData()
    }, [])


// useEffect(() => {
//     fetch(`http://localhost:8080/api/student/getStudents/${courseByid.name}`,
//         {
//             headers: headers,
//         })
//         .then(res => {
//             return res.json();

//         })
//         .then(data => {
//             setstudents(data);

//         })
// }, [])

return (

    <div className='vitolo'>
        <h1>Course Name:  {courseByid.name}</h1>
        <h2>Start Date:  {courseByid.startDate}</h2>
        <h2>end Date:  {courseByid.endDate}</h2>


        <h2>sessions : </h2>
        <div className="session-container">
            {Sessions.map((session, index) => (
                <div key={session.id} className="session-item">
                    <h2 >{session.day}</h2>
                    <h2>{session.link}</h2>
                </div>
            ))}
        </div>





    </div>


);

}

export default CourseDetails;
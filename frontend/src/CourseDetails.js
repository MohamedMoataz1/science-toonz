import { useParams , Link } from "react-router-dom";
import Logo from '../src/images/ST Transparent.png'
import './cssFiles/CourseDetails.css'
import { useEffect, useState } from "react";

const CourseDetails = () => {
    const [courseByid ,setcourseByid ] = useState('nothing to show');
    const { id } = useParams();
    const userToken = localStorage.getItem('userToken');
    const [Students ,setstudents ] = useState('nothing to show');
    const [Sessions ,setSessions ] = useState('nothing to show');

    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };
    

    useEffect(() => {
        fetch(`http://localhost:8080/api/course/getCourseById/${id}`,
            {
                headers: headers,
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setcourseByid(data);
                

            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/api/session/getSessionsByCourse/${courseByid.name}`,
            {
                headers: headers,
            })
            .then(res => {
                return res.json();
                console.log(res);
            })
            .then(data => {
                setSessions(data)
                

            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/api/student/getStudents/${courseByid.name}`,
            {
                headers: headers,
            })
            .then(res => {
                return res.json();
                
            })
            .then(data => {
                setstudents(data);
                

            })
    }, [])



    return (
       
                <div className='vitolo'>
                    <h1>Course Name:  {courseByid.name}</h1>
                    <h2>Start Date:  {courseByid.startDate}</h2>
                    <h2>end Date:  {courseByid.endDate}</h2>
                    <h2>Students : <br />  {Students} </h2>
                    <h2>sessions : <br /> {Sessions} </h2>
                 
                </div>
       

    );

}

export default CourseDetails;
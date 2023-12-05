import { useParams, Link } from "react-router-dom";
import Logo from '../src/images/ST Transparent.png';
import './cssFiles/CourseDetails.css'
import { useEffect, useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popupsession from "./components/popupsession"
import PopupStudents from "./components/PopupStudents";
import PopupUpdateSession from "./components/PopupUpdateSession";
import Popupeditstudent from "./components/Popupeditstudent";

const CourseDetails = () => {
    const [AllDetails, setAllDetails] = useState('nothing to show');
    const { id } = useParams();
    const userToken = localStorage.getItem('userToken');
    const [Students, setstudents] = useState([]);
    const [Sessions, setSessions] = useState([{}]);
    const [modal, setmodal] = useState(false);
    const [modal2, setmodal2] = useState(false);
    const [modal3, setmodal3] = useState(false);
    const [day, setday] = useState(null);
    const [startTime, setstartTime] = useState(null);
    const [endTime, setendTime] = useState(null);
    const [link, setlink] = useState(null);
    const [category, setcategory] = useState(null);
    const [date, setdate] = useState(null);
    const [AddedEmail, setAddedEmail] = useState();
    const [AddedSessionsToStudent, setAddedSessionsToStudent] = useState([]);
    const [SessionId, SetSessionID] = useState(null);
    const [StudentSearch, setStudentSearch] = useState('');
    const [modal4forstudentEdit , setmodal4forstudentEdit] = useState(false);
    const [studentid , setstudentid] = useState()
    const [sessionofstudent, setsessionofstudent] = useState([]);
    const [showedStudent , setshowedStudent] = useState(null);
    const [showButton, setShowButton] = useState(false);

    const AppendSessions = (newsessionid,index) => {
        
        setShowButton(true);
        let Sessionsid = [...AddedSessionsToStudent];
        Sessionsid[index] = newsessionid;
        console.log(Sessionsid);
        setAddedSessionsToStudent(Sessionsid);
        
        

    }
    
   

    const togglemodal = () => {
        setmodal(!modal);
        const theadElement = document.querySelector('.thead'); // Get the .thead element
        const theadElement2 = document.querySelector('.thead2');
        if (modal) {
            theadElement.classList.remove('non-sticky'); // Remove the non-sticky class
            theadElement2.classList.remove('non-sticky2');
        } else {
            theadElement.classList.add('non-sticky'); // Add the non-sticky class
            theadElement2.classList.add('non-sticky2');
        }

    }
    
    

    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };




    useEffect(() => {
        
        const getall = async () => {
            await fetch(`http://localhost:8080/api/course/getCourseDetailsById/${id}`, {
                headers: headers,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    

                    setAllDetails(data);
                    setstudents(data.studentWithSessionsDtos);
                    setSessions(data.sessions);
                    setAddedSessionsToStudent(new Array(data.numOfCategories).fill(0));
                });
        };

        getall();

    }, []);


    if (modal || modal2 || modal3 || modal4forstudentEdit) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    const HandleAddSession = () => {
        setmodal(!modal);
        const AddedSession = { day, startTime, endTime, date, link, category, "vimeoLink": "viemeolink.com" };
        console.log(AddedSession);

        fetch(`http://localhost:8080/api/session/createSession/${AllDetails.id}`, {
            method: 'POST',
            body: JSON.stringify(AddedSession),
            headers: headers,
        })
        window.location.reload();





    }



    const HandleAddStudent = () => {
        console.log("  hi inside function  ");
        setmodal2(!modal2);
        console.log("  bobeeeeeeeeeeeeeeeeeeeee   ");
        fetch(`http://localhost:8080/api/student/addStudentToCourseWithSessions/${AllDetails.id}/${AddedEmail}`, {
            method: 'POST',
            body: JSON.stringify(AddedSessionsToStudent),
            headers: headers,

        }).then((res) => res.json())

            .then((data) => {
                console.log(AddedSessionsToStudent);
            })

        window.location.reload();






    }
    const togglemodal2 = () => {
        setmodal2(!modal2);
        const theadElement = document.querySelector('.thead2'); // Get the .thead element

        if (modal2) {
            theadElement.classList.remove('non-sticky2'); // Remove the non-sticky class
        } else {
            theadElement.classList.add('non-sticky2'); // Add the non-sticky class
        }

    }
    const HandleDeleteSession = (SessionID) => {
        console.log(SessionID);
        fetch(`http://localhost:8080/api/session/deleteSession/${SessionID}`, {
            method: 'DELETE',
            headers: headers,
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)

            })
        window.location.reload();


    }

  
    const togglemodal3 = (session) => {
        setmodal3(!modal3);
        SetSessionID(session.id);
        setday(session.day);
        setstartTime(session.startTime);
        setendTime(session.endTime);
        setdate(session.date);
        setlink(session.link);
        setcategory(session.category);
        const theadElement = document.querySelector('.thead2'); // Get the .thead element

        if (modal2) {
            theadElement.classList.remove('non-sticky2'); // Remove the non-sticky class
        } else {
            theadElement.classList.add('non-sticky2'); // Add the non-sticky class
        }





    }
    const HandleDeleteStudent= (StudentId) => {
        fetch(`http://localhost:8080/api/student/removeStudentFromCourse/${AllDetails.id}/${StudentId}` , {
            method: 'DELETE' ,
            headers: headers , 
        }).then((res) => res.json())
        .then((data)=>{
            console.log(data);
        })
        window.location.reload();
    }

    const togllemodal4forstudentEdit = (student) => {
        setmodal4forstudentEdit(!modal4forstudentEdit);
        setshowedStudent(student);
       
       
        
        
        
    }
    

    return (



        <div className="Details">

            <h1>Course Name:  {AllDetails.name}</h1>
            <h2>Start Date:  {AllDetails.startDate}</h2>
            <h2>end Date:  {AllDetails.endDate}</h2>


            <div className="sessions-container">
                <div className="nav-bar-session-details">
                    <h2>sessions : </h2>
                    <button onClick={togglemodal} className="addingbutton">Add Session</button>
                    {modal && <Popupsession togglemodal={togglemodal} HandleAddSession={HandleAddSession} setday={setday} setstartTime={setstartTime} setendTime={setendTime} setlink={setlink} setcategory={setcategory} setdate={setdate} Logo={Logo} />}
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="thead">
                                <TableCell> </TableCell>
                                <TableCell>Name      </TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Link      </TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Sessions.map((session, index) => (
                                <TableRow
                                    key={session.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {session.day}
                                    </TableCell>
                                    <TableCell >{session.startTime}</TableCell>
                                    <TableCell >{session.endTime}</TableCell>
                                    <TableCell >{session.link}</TableCell>
                                    <TableCell >
                                        <button onClick={() => HandleDeleteSession(session.id)}> Delete </button>
                                    </TableCell>
                                    <TableCell >
                                        <button onClick={() => togglemodal3(session)}> Edit </button>
                                        {modal3 &&

                                            <PopupUpdateSession
                                                modal3={modal3}
                                                togglemodal3={togglemodal3}
                                                id={SessionId}
                                                day={day}
                                                startTime={startTime}
                                                endTime={endTime}
                                                date={date}
                                                link={link}
                                                category={category}
                                                Logo={Logo}
                                                setday={setday}
                                                setstartTime={setstartTime}
                                                setendTime={setendTime}
                                                setdate={setdate}
                                                setlink={setlink}
                                                setcategory={setcategory}
                                                setmodal3={setmodal3}
                                                headers={headers}
                                                sessionofstudent={sessionofstudent}


                                            />
                                        }
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

            <div className="sessions-container">
                <div className="nav-bar-session-details">
                    <h2>Students : </h2>
                    
                    <button onClick={togglemodal2} className="addingbutton">Add Student</button>
                    {modal2 && <PopupStudents 
                    togglemodal2={togglemodal2} 
                    Logo={Logo} 
                    AppendSessions={AppendSessions} 
                    HandleAddStudent={HandleAddStudent} 
                    togglemodal={togglemodal} 
                    setAddedEmail={setAddedEmail} 
                    setAddedSession={setAddedSessionsToStudent} 
                    id={AllDetails.id} 
                    Categories={AllDetails.numOfCategories} 
                    Sessions={Sessions} />}






                </div>
                <div>
                <input type="text" className="search-studnet" onChange={(e)=> setStudentSearch(e.target.value)} placeholder="Search Student" />
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="thead2">
                                <TableCell> </TableCell>
                                <TableCell>FirstName</TableCell>
                                <TableCell >LastName</TableCell>
                                <TableCell >Email</TableCell>
                                <TableCell  >school</TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Students.filter((Student) => {
                                return StudentSearch.toLowerCase() === '' ? Student : Student.email.toLowerCase().includes(StudentSearch)
                            }).map((Student , index) => (
                                <TableRow
                                    key={Student.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                ><TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {Student.firstName}
                                    </TableCell>
                                    <TableCell >{Student.lastName}</TableCell>
                                    <TableCell >{Student.email}</TableCell>
                                    <TableCell >{Student.school}</TableCell>
                                    <TableCell>
                                    <button onClick={() => HandleDeleteStudent(Student.id)} > Delete </button>
                                         </TableCell>
                             
                                <TableCell> 
                                <button  onClick={()=>togllemodal4forstudentEdit(Student)}> Show </button>
                                
                                </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

            <div>
            {
                                        modal4forstudentEdit && 
                                        
                                        <Popupeditstudent
                                        showedStudent = {showedStudent} 
                                        Logo = {Logo}
                                        Categories={AllDetails.numOfCategories}
                                        AppendSessions = {AppendSessions}
                                        togllemodal4forstudentEdit={ togllemodal4forstudentEdit}
                                        Sessions={Sessions}
                                        setAddedSessionsToStudent = {setAddedSessionsToStudent}
                                        AddedSessionsToStudent = {AddedSessionsToStudent}
                                        showButton = {showButton}
                                        setShowButton = { setShowButton}
                                        AllDetails = {AllDetails}
                                        headers = {headers}
                                        />
            }
            </div>
        </div>


    );
    

}

export default CourseDetails;
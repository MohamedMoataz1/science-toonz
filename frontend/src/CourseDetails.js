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
import { useHistory } from 'react-router-dom';


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
    const [AddedEmail, setAddedEmail] = useState('');
    const [AddedSessionsToStudent, setAddedSessionsToStudent] = useState([]);
    const [SessionId, SetSessionID] = useState(null);
    const [StudentSearch, setStudentSearch] = useState('');
    const [modal4forstudentEdit, setmodal4forstudentEdit] = useState(false);
    const [studentid, setstudentid] = useState()
    const [sessionofstudent, setsessionofstudent] = useState([]);
    const [showedStudent, setshowedStudent] = useState(null);
    const [showButton, setShowButton] = useState(false);
    const history = useHistory();
    const [searchBy, setsearchBy] = useState('email');

    const AppendSessions = (newsessionid, index) => {

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
            await fetch(`http://localhost:8080/api/courses/courseDetails/${id}`, {
                headers: headers,
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    else {
                        // Handle non-successful responses (status codes other than 2xx)
                        res.json().then((data) => {
                            console.log("Error:", data.message);
                            history.push('/');
                        });
                    }

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

    const HandleAddSession = async () => {
        try {
            setmodal(!modal);
            let addedSession = {
                day,
                startTime,
                endTime,
                date,
                link,
                category
            };
            addedSession.startTime += ":00"
            addedSession.endTime += ":00"
            console.log(addedSession);

            const response = await fetch(`http://localhost:8080/api/sessions/${AllDetails.id}`, {
                method: 'POST',
                body: JSON.stringify(addedSession),
                headers: headers,
            });

            if (!response.ok) {
                console.error('Failed to add session:', response.statusText);
                // Handle the error here, show a message to the user, etc.
                return;
            }

            console.log('Session added successfully');
            // Optionally, you can handle the success case here

            // Reload the page (though it's better to use React state/props to update UI without a full page reload)
            window.location.reload();
        } catch (error) {
            console.error('Error while adding session:', error);
            // Handle the error here, show a message to the user, etc.
        }
    };




    const HandleAddStudent = () => {

        setmodal2(!modal2);
        console.log(AddedSessionsToStudent);
        for (let i = 0; i < AddedSessionsToStudent.length; i++) {
            if (AddedSessionsToStudent[i] === 0) {
                AddedSessionsToStudent.splice(i, 1);
                i--; // Adjust index after removing an element
            }

        }
        console.log(AddedSessionsToStudent);
        fetch(`http://localhost:8080/api/courses/${AllDetails.id}/students/${AddedEmail}/sessions`, {
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
        fetch(`http://localhost:8080/api/sessions/${SessionID}`, {
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
    const HandleDeleteStudent = (StudentId) => {
        fetch(`http://localhost:8080/api/courses/${AllDetails.id}/students/${StudentId}`, {
            method: 'DELETE',
            headers: headers,
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
        window.location.reload();
    }

    const togllemodal4forstudentEdit = (student) => {
        setmodal4forstudentEdit(!modal4forstudentEdit);
        setshowedStudent(student);
    }
    console.log(AllDetails.materialLink);
    console.log('Request Payload:', JSON.stringify({
        name: AllDetails.name,
        startDate: AllDetails.startDate,
        endDate: AllDetails.endDate,
        active: !AllDetails.active,
        numOfCategories: AllDetails.numOfCategories,
        materialLink: AllDetails.materialLink
    }));
    const formatDate = (inputDate) => {
        const [month, day, year] = inputDate.split('/');
        return `${year}-${month}-${day}`;
    };
    const HandleActivationCourse = async () => {
        const formattedStartDate = formatDate(AllDetails.startDate);
        const formattedEndDate = formatDate(AllDetails.endDate);
        try {
            const response = await fetch(`http://localhost:8080/api/courses/${AllDetails.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    name: AllDetails.name,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    active: !AllDetails.active,
                    numOfCategories: AllDetails.numOfCategories,
                    materialLink: AllDetails.materialLink
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Check if the response content type is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                // Handle the response data here
                console.log('PUT request successful:', data);
            } else {
                // Handle non-JSON response (e.g., "Course Updated")
                const textData = await response.text();
                console.log('Non-JSON response:', textData);
            }
        } catch (error) {
            // Handle errors here
            console.error('Error making PUT request:', error);
        }
        history.push('/home');
        window.location.reload();
    };
    console.log(AllDetails.active);

    return (



        <div className="Details">
            <div className="for-adding-button">

                <button className="addingbutton" onClick={HandleActivationCourse}>{AllDetails.active ? 'Active' : 'Deactive'}</button>
            </div>

            <h1>Course Name:  {AllDetails.name}</h1>
            <h2>Start Date:  {AllDetails.startDate}</h2>
            <h2>end Date:  {AllDetails.endDate}</h2>
            <a className="addingbutton" href={AllDetails.materialLink} target="_blank" rel="noopener noreferrer" >  Material Link </a>


            <div className="sessions-container">
                <div className="nav-bar-session-details">
                    <h2>sessions : </h2>
                    <button onClick={togglemodal} className="addingbutton">Add Session</button>
                    {modal && <Popupsession date={date} endTime={endTime} startTime={startTime} togglemodal={togglemodal} HandleAddSession={HandleAddSession} setday={setday} setstartTime={setstartTime} setendTime={setendTime} setlink={setlink} setcategory={setcategory} setdate={setdate} Logo={Logo} />}
                </div>
                <TableContainer component={Paper}  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
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
                        Sessions={Sessions}
                        headers={headers}
                        AddedEmail={AddedEmail}
                    />}

                </div>
                <div className="above-table2">
                    <input type="text" onChange={(e) => setStudentSearch(e.target.value)} placeholder={`searh by ${searchBy}`} />

                    <select onChange={(e) => setsearchBy(e.target.value)}>
                        <option value="" disabled selected>Search by: </option>
                        <option value="email">email</option>
                        <option value="firstName">First Name</option>
                        <option value="studentNumber">Student Number</option>
                        <option value="year">year</option>
                    </select>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="thead2">
                                <TableCell>Serial</TableCell>
                                <TableCell>FirstName</TableCell>
                                <TableCell >LastName</TableCell>
                                <TableCell >Email</TableCell>
                                <TableCell >Year</TableCell>

                                <TableCell> Student Number</TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Students.filter((student) => {
                                if (StudentSearch.trim() === '') {
                                    return true;
                                } else {
                                    const searchField = searchBy.toString();

                                    if (!(searchField in student)) {
                                        console.error(`Invalid searchBy field: ${searchField}`);
                                        return false;
                                    }

                                    const fieldValue = student[searchField];

                                    if (typeof fieldValue === 'number') {
                                        return fieldValue.toString().includes(StudentSearch);
                                    } else if (typeof fieldValue === 'string') {
                                        // Handle other string fields
                                        return fieldValue.toLowerCase().includes(StudentSearch.toLowerCase());
                                    } else {
                                        console.error(`Unsupported field type for search: ${searchField}`);
                                        return false;
                                    }
                                }
                            })
                                .map((Student, index) => (
                                    <TableRow
                                        key={Student.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {Student.serial}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {Student.firstName}
                                        </TableCell>
                                        <TableCell >{Student.lastName}</TableCell>
                                        <TableCell >{Student.email}</TableCell>
                                        <TableCell >{Student.year}</TableCell>

                                        <TableCell >{Student.studentNumber}</TableCell>
                                        <TableCell>
                                            <button onClick={() => HandleDeleteStudent(Student.id)} > Delete </button>
                                        </TableCell>

                                        <TableCell>
                                            <button onClick={() => togllemodal4forstudentEdit(Student)}> Show </button>

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
                        showedStudent={showedStudent}
                        Logo={Logo}
                        Categories={AllDetails.numOfCategories}
                        AppendSessions={AppendSessions}
                        togllemodal4forstudentEdit={togllemodal4forstudentEdit}
                        Sessions={Sessions}
                        setAddedSessionsToStudent={setAddedSessionsToStudent}
                        AddedSessionsToStudent={AddedSessionsToStudent}
                        showButton={showButton}
                        setShowButton={setShowButton}
                        AllDetails={AllDetails}
                        headers={headers}
                    />
                }
            </div>
        </div>


    );


}

export default CourseDetails;
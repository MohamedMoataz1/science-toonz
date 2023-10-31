import { useParams, Link } from "react-router-dom";
import Logo from '../src/images/ST Transparent.png'
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

const CourseDetails = () => {
    const [AllDetails, setAllDetails] = useState('nothing to show');
    const { id } = useParams();
    const userToken = localStorage.getItem('userToken');
    const [Students, setstudents] = useState([]);
    const [Sessions, setSessions] = useState([{}]);
    const [modal, setmodal] = useState(false);
    const [day, setday] = useState(null);
    const [startTime, setstartTime] = useState(null);
    const [endTime, setendTime] = useState(null);
    const [link, setlink] = useState(null);
    const [category, setcategory] = useState(null);
    const [Date, setDate] = useState(null);
    // const [AddedSession ,setAddedSession] = useState(null);

    const togglemodal = () => {
        setmodal(!modal)
    }
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };
    



    useEffect(() => {
        const getall = async () => {
          await fetch(`http://localhost:8080/api/course/getCourseDetailsById/1`, {
            headers: headers,
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
                console.log(data.sessions);
              setAllDetails(data);
              setstudents(data.students);
              setSessions(data.sessions);
            });
        };
      
        getall(); 
      
      }, [] );
      

    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    const HandleAddCourse = () => {
        setmodal(!modal);
        const AddedSession = { day, startTime, endTime, link, category };
        console.log(AddedSession);

        fetch(`http://localhost:8080/api/session/createSession/${AllDetails.name}`, {
            method: 'POST',
            body: JSON.stringify(AddedSession),
            headers: headers,
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            })


    }










    return (



        <div className="Details">

            <h1>Course Name:  {AllDetails.name}</h1>
            <h2>Start Date:  {AllDetails.startDate}</h2>
            <h2>end Date:  {AllDetails.endDate}</h2>

            <div className="sessions-container">
                <div className="nav-bar-session-details">
                    <h2>sessions : </h2>
                    <button onClick={togglemodal}>Add Session</button>
                    {modal && <div className="modal">
                        <div className="overlay">
                            <div className="modal-content">
                                <div className="close-btn">
                                    <img src={Logo} alt="LOGO" className='logoimage-popup' />
                                    <button onClick={togglemodal}> Exit</button>
                                </div>

                                <form className="add-course-form" onSubmit={HandleAddCourse}>

                                    <label >Day: </label> <br />
                                    <input type="text" name="day " required onChange={(e) => setday(e.target.value)} /> <br />

                                    <label >Start Time: </label> <br />
                                    <input type="time" required onChange={(e) => setstartTime("12:12:47")} /> <br />

                                    <label >End Time</label><br />
                                    <input type="time" required onChange={(e) => setendTime("12:12:47")} /> <br />

                                    <label >Link: </label><br />
                                    <input type="text" required onChange={(e) => setlink(e.target.value)} /><br />


                                    <label >Category : </label><br />
                                    <input type="text" required onChange={(e) => setcategory(e.target.value)} /><br />

                                    <label >Category : </label><br />
                                    <input type="Date" required onChange={(e) => setDate(e.target.value)} /><br />

                                    <button className="close-modal" >
                                        Add Course
                                    </button>




                                </form>

                            </div>
                        </div>
                    </div>}






                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="thead">
                                <TableCell>Name</TableCell>
                                <TableCell >Start Date</TableCell>
                                <TableCell >End Date</TableCell>
                                <TableCell  >Link   </TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Sessions.map((session) => (
                                <TableRow
                                    key={session.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {session.day}
                                    </TableCell>
                                    <TableCell >{session.startTime}</TableCell>
                                    <TableCell >{session.endTime}</TableCell>
                                    <TableCell >{session.link}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

            <div className="sessions-container">
                <div className="nav-bar-session-details">
                    <h2>Students : </h2>
                    <button onClick={togglemodal}>Add Student</button>
                    {modal && <div className="modal">
                        <div className="overlay">
                            <div className="modal-content">
                                <div className="close-btn">
                                    <img src={Logo} alt="LOGO" className='logoimage-popup' />
                                    <button onClick={togglemodal}> Exit</button>
                                </div>

                                <form className="add-course-form" onSubmit={HandleAddCourse}>

                                    <label >Day: </label> <br />
                                    <input type="text" name="day " required onChange={(e) => setday(e.target.value)} /> <br />

                                    <label >Start Time: </label> <br />
                                    <input type="time" required onChange={(e) => setstartTime("12:12:47")} /> <br />

                                    <label >End Time</label><br />
                                    <input type="time" required onChange={(e) => setendTime("12:12:47")} /> <br />

                                    <label >Link: </label><br />
                                    <input type="text" required onChange={(e) => setlink(e.target.value)} /><br />


                                    <label >Category : </label><br />
                                    <input type="text" required onChange={(e) => setcategory(e.target.value)} /><br />

                                    <button className="close-modal" >
                                        Add Course
                                    </button>




                                </form>

                            </div>
                        </div>
                    </div>}






                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>FirstName</TableCell>
                                <TableCell >LastName</TableCell>
                                <TableCell >Email</TableCell>
                                <TableCell  >school</TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Students.map((Student) => (
                                <TableRow
                                    key={Student.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {Student.firstName}
                                    </TableCell>
                                    <TableCell >{Student.lastName}</TableCell>
                                    <TableCell >{Student.email}</TableCell>
                                    <TableCell >{Student.school}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>


        </div>


    );

}

export default CourseDetails;
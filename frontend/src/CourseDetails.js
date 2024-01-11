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
import PopupEditCourse from "./components/PopupEditCourse";
import { useHistory } from 'react-router-dom';
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
    const [courseCategory, setcourseCategory] = useState();
    const [modalEditCourse, setmodalEditCourse] = useState(false);
    const [ForEffectWhenDeleteStudent, setForEffectWhenDeleteStudent] = useState(false);
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };

    const mapKeysToCamelCase = {
        "Serial": "serial",
        "First Name": "firstName",
        "Fathers Name": "fatherName",
        "Last Name": "lastName",
        "Arabic": "arabic",
        "Email": "officialEmail",
        "st Email": "email",
        "Password": "password",
        "Students Number:": "studentNumber",
        "Parents Number:": "parentNumber",
        "GClassroom Email": "classEmail",
        "Name on g classroom": "className",
        "School Name:": "schoolName",
        "Gender": "gender",
        "Year": "year",
        "Total Fees": "fees",
        "first instalmment": "firstInstalment",
        "second instalmment": "secondInstalment",
        "payment notes": "paymentNotes"
    }

    const mapSheetHeader = (sheet, mapper) => {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        range.s.r = 0; // Set the start row to 0 (first row)
        range.e.r = 0; // Set the end row to 0 (first row)

        // Iterate through each cell in the first row and increment its value by one
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: range.s.r };
            const cell_ref = XLSX.utils.encode_cell(cellAddress);
            if (sheet[cell_ref].v) {
                const newVal = mapper[sheet[cell_ref].v] || sheet[cell_ref].v;
                sheet[cell_ref] = { v: newVal, t: "s" }
            }
        }

    }

    const getHeaderValues = (sheet) => {
        const headerValues = [];
        const range = XLSX.utils.decode_range(sheet['!ref']);
        range.s.r = 0; // Set the start row to 0 (first row)
        range.e.r = 0; // Set the end row to 0 (first row)

        // Iterate through each cell in the first row and increment its value by one
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: range.s.r };
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (sheet[cell_ref].v) {
                headerValues.push(sheet[cell_ref].v);
            }
        }
        return headerValues;
    }

    const validateAllKeysExist = (sheet, mapper) => {
        const headerValues = getHeaderValues(sheet);
        let isValid = true;
        Object.keys(mapper).forEach(key => isValid = headerValues.includes(key));
        return isValid;
    }

    const aggregateSessionIds = (parsedData) => {
        // Get all session columns
        const sessionsCols = Object.keys(parsedData[0]).filter(o => o.toLowerCase().includes("session"));
        parsedData.forEach(o => {
            o.sessionsId = [];
            sessionsCols.forEach(key => {
                o.sessionsId.push(o[key]);
                delete o[key];
            })
        })
    }

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetname = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetname];
            let isvalid = validateAllKeysExist(sheet, mapKeysToCamelCase);

            if (isvalid == false) {
                Swal.fire({
                    title: "Failed",
                    text: "sorry file is in wrong format or there is a missing column",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }

            mapSheetHeader(sheet, mapKeysToCamelCase);
            const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
            console.log("=======================");
            aggregateSessionIds(parsedData);
            console.log()

            if (Object.keys(parsedData[0]).length - 1 + parsedData[0]["sessionsId"].length != AllDetails.numOfCategories + 19) {
                Swal.fire({
                    title: "Failed",
                    text: "sorry file have wrong number of sessions",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }

            try {

                const response = await fetch(`http://localhost:8080/api/courses/bulkStudents/1`, {
                    method: 'POST',
                    body: JSON.stringify(parsedData),
                    headers: headers,
                });

                if (!response.ok) {
                    const responseBody = await response.json();

                    console.error('Failed to post file', responseBody.message);

                    Swal.fire({
                        title: "Failed",
                        text: `Failed to post file , ${responseBody.message}`,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return;
                }

                Swal.fire({
                    title: "Done",
                    text: "Students assigned to this course succefully",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Reload the page after the user clicks "OK"
                    window.location.reload();
                });;

            } catch (error) {
                console.error('Error while upload file:', error);
                // Handle the error here, show a message to the user, etc.
            }

        }
    }

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

    }, [modal3, modal, modal2, ForEffectWhenDeleteStudent]);


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
            // window.location.reload();
        } catch (error) {
            console.error('Error while adding session:', error);
            // Handle the error here, show a message to the user, etc.
        }
    };




    const HandleAddStudent = () => {

        setmodal2(!modal2);
        for (let i = 0; i < AddedSessionsToStudent.length; i++) {
            if (AddedSessionsToStudent[i] === 0) {
                AddedSessionsToStudent.splice(i, 1);
                i--;
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

        // window.location.reload();






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
        setForEffectWhenDeleteStudent("update");


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
        // window.location.reload();
    }

    const togllemodal4forstudentEdit = (student) => {
        setmodal4forstudentEdit(!modal4forstudentEdit);
        setshowedStudent(student);
    }

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
    const handleDeleteCourse = () => {

        Swal.fire({
            title: 'Delete course?',
            text: `Are you sure you want to delete "${AllDetails.name}" course?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/api/courses/${AllDetails.id}`, {
                    method: 'DELETE',
                    headers: headers,
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        // You can handle success here, for example, by updating the UI

                        history.push('/home');
                        window.location.reload();
                    })
                    .catch(error => {
                        // Handle errors here, for example, by displaying an error message
                        console.error('There was a problem deleting the course:', error);
                    });
            };
        });
    }


    const togglemodalEditCourse = () => {
        setmodalEditCourse(!modalEditCourse);
        const theadElement = document.querySelector('.thead'); // Get the .thead element
        const theadElement2 = document.querySelector('.thead2');
        if (modalEditCourse) {
            theadElement.classList.remove('non-sticky'); // Remove the non-sticky class
            theadElement2.classList.remove('non-sticky2');
        } else {
            theadElement.classList.add('non-sticky'); // Add the non-sticky class
            theadElement2.classList.add('non-sticky2');
        }
    }
    const isValidUrl = (url) => {
        // Simple URL format check (adjust as needed)
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };

    // const formattedMaterialLink = isValidUrl(AllDetails.materialLink)
    //     ? AllDetails.materialLink
    //     : '#';
        
    const handleLinkClick = () => {
        if (isValidUrl(AllDetails.materialLink)) {
            window.open(AllDetails.materialLink, '_blank');
        } else {
            // Handle invalid link (you can display a message or stay on the same page)
            console.error('Invalid Link:', AllDetails.materialLink);
            // Optionally, display an error message or stay on the same page
            Swal.fire({
                title: "Invalid Link",
                text: `'Invalid Link:', ${AllDetails.materialLink}`,
                icon: "error",
                confirmButtonText: "OK",
            });
            
        }
    };

    return (



        <div className="Details">
            <div className="header-course">

                <div className="course-header-details">
                    <h1>Course Name:  {AllDetails.name}</h1>
                    <h2>Start Date:  {AllDetails.startDate}</h2>
                    <h2>end Date:  {AllDetails.endDate}</h2>
                    {/* <a className="addingbutton" href={AllDetails.materialLink} target="_blank" rel="noopener noreferrer" >  Material Link </a> */}
                    <a className="addingbutton"  target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        Material Link
                    </a>


                </div>
                <div>
                    <div className="delete-active-edit-div">

                        <button className="adding-button-header" onClick={HandleActivationCourse}>{AllDetails.active ? 'Active' : 'Deactive'}</button>
                        <button className="adding-button-header-two" onClick={handleDeleteCourse}>Delete</button>
                        <button className="adding-button-header-two" onClick={togglemodalEditCourse}>Edit</button>
                        {modalEditCourse &&

                            <PopupEditCourse
                                modalEditCourse={modalEditCourse}
                                togglemodalEditCourse={togglemodalEditCourse}
                                Logo={Logo}
                                AllDetails={AllDetails}
                                headers={headers}




                            />
                        }
                    </div>
                </div>
            </div>

            <div className="sessions-container">
                <div className="nav-bar-session-details">
                    <h2>sessions : </h2>
                    <button onClick={togglemodal} className="addingbutton">Add Session</button>
                    {modal && <Popupsession AllDetails={AllDetails} date={date} endTime={endTime} startTime={startTime} togglemodal={togglemodal} HandleAddSession={HandleAddSession} setday={setday} setstartTime={setstartTime} setendTime={setendTime} setlink={setlink} setcategory={setcategory} setdate={setdate} Logo={Logo} />}
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

                                        <IconButton onClick={() => HandleDeleteSession(session.id)} aria-label="delete" style={{ zIndex: 100 }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton onClick={() => togglemodal3(session)} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        {/* <button onClick={() => togglemodal3(session)}> Edit </button> */}
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
                                                AllDetails={AllDetails}


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
                    <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
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

                                            <IconButton onClick={() => HandleDeleteStudent(Student.id)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>

                                        <TableCell>
                                            {/* <button onClick={() => togllemodal4forstudentEdit(Student)}> Show </button> */}
                                            <IconButton onClick={() => togllemodal4forstudentEdit(Student)} aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
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
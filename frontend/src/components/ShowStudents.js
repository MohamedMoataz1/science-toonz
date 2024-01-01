import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../cssFiles/CourseDetails.css';
import PopupShowStudent from "./PopupShowStudent";
import * as XLSX from "xlsx";
const ShowStudents = () => {
    const [allStudents, setAllStudents] = useState([]);
    const userToken = localStorage.getItem('userToken');
    const [StudentSearch, setStudentSearch] = useState('');
    const [IfShowed, setIfShowed] = useState(false);
    const [showedStudent, setshowedStudent] = useState();
    const [searchBy, setsearchBy] = useState('email');
    const [studentsBulkData, setstudentsBulkData] = useState([]);
    console.log(allStudents);
    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data,{type:"binary"});
            const sheetname = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetname];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            const excelStartDate = new Date('1899-12-30');
        
        for (let i = 0; i < parsedData.length; i++) {
            const excelSerialDate = parsedData[i]["First Session"];
            const dateValue = new Date(excelStartDate.getTime() + excelSerialDate * 24 * 60 * 60 * 1000);
            parsedData[i]["First Session"] = dateValue;
        }

        console.log(parsedData);
        }


    }

    const togllemodal = (student) => {
        setIfShowed(!IfShowed);
        setshowedStudent(student);
    }
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/students/', {
                    headers: headers,
                });

                if (response.ok) {
                    const data = await response.json();
                    setAllStudents(data);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    

    return (
        <div className="Details">
            <div className="sessions-container">

                <div className="above-table2">
                    <input type="text" onChange={(e) => setStudentSearch(e.target.value)} placeholder={`searh by ${searchBy}`} />

                    <select onChange={(e) => setsearchBy(e.target.value)}>
                        <option value="" disabled selected>Search by: </option>
                        <option value="email">email</option>
                        <option value="firstName">First Name</option>
                        <option value="studentNumber">Student Number</option>
                        <option value="year">Year</option>
                    </select>
                    <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
                </div>
                <div>

                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="thead2">
                                <TableCell>ٍSerial </TableCell>
                                <TableCell>FirstName</TableCell>
                                <TableCell >LastName</TableCell>
                                <TableCell >Email</TableCell>
                                <TableCell >school</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Student Number</TableCell>
                                <TableCell> </TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allStudents
                                .filter((student) => {
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
                                        <TableCell >{Student.schoolName}</TableCell>
                                        <TableCell >{Student.year}</TableCell>
                                        <TableCell >{Student.studentNumber}</TableCell>
                                        <TableCell>
                                            <button onClick={() => togllemodal(Student)} > Show </button>

                                        </TableCell>
                                        {
                                            IfShowed &&
                                            <PopupShowStudent
                                                showedStudent={showedStudent}
                                                togllemodal={togllemodal} />

                                        }


                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

        </div>
    );
}

export default ShowStudents;
import { useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../cssFiles/CourseDetails.css';
const ShowStudents = () => {
    const [allStudents, setAllStudents] = useState([]);
    const userToken = localStorage.getItem('userToken');
    const [StudentSearch,setStudentSearch] = useState('');
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/student/getAllStudents' ,{
        headers:headers ,
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
                <div className="nav-bar-session-details">
                    <h2>Students : </h2>
                </div>
                <div>
                    <input type="text" className="search-studnet" onChange={(e) => setStudentSearch(e.target.value)} placeholder="Search Student" />
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="thead2">
                                <TableCell> </TableCell>
                                <TableCell>FirstName</TableCell>
                                <TableCell >LastName</TableCell>
                                <TableCell >Email</TableCell>
                                <TableCell >school</TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allStudents.filter((Student) => {
                                return StudentSearch.toLowerCase() === '' ? Student : Student.email.toLowerCase().includes(StudentSearch)
                            }).map((Student, index) => (
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
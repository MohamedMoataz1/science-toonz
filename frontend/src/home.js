import { useState, useEffect } from 'react';
import './cssFiles/Home.css';
import CorseList from './CorseList';
import Navbar from './Navbar';
import ContentView from './ContentView1';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CourseDetails from './CourseDetails';
import AddCourse from './addcourse';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Home = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

    const userToken = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    const [corses, setcorses] = useState(null);
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/course/getCourses',
            {
                headers: headers,
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setcorses(data);
                

            })
    }, [])




    return (
        <div className="back">
            <div className="embdedbox">
                <Navbar />
                <switch>
                    <Route exact path="/home">
                        <ContentView corses={corses} userName={userName} />
                    </Route>

                    <Route exact path="/home/course/:id"  >
                        <CourseDetails />
                    </Route>
                    <Route exact path="/home/AddCourse"  >
                        <AddCourse />
                    </Route>

                </switch>



            </div>
        </div>



    );
}

export default Home;
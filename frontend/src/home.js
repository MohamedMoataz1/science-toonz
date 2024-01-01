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
import RegisterStudent from './components/RegisterStudent';
import ShowStudents from './components/ShowStudents';
import MobileMenu from './components/MobileMenu';

const Home = () => {

      
    const [isMobile, setisMobile] = useState(false);
    const userToken = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    const [corses, setcorses] = useState(null);
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/courses/',
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


    if (isMobile) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }
    const toggleMenuModal = () => {
        setisMobile(!isMobile);
        
    }
    return (
        <div className="back">
            {
                isMobile && <MobileMenu toggleMenuModal={toggleMenuModal}></MobileMenu>
            }
            <div className="embdedbox">
                <Navbar isMobile = {isMobile } setisMobile = {setisMobile} toggleMenuModal={toggleMenuModal} />
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
                    <Route exact path="/home/RegisterStudent">
                        <RegisterStudent />
                    </Route>
                    <Route exact path="/home/ShowStudents">
                        <ShowStudents />
                    </Route>

                </switch>



            </div>
        </div>



    );
}

export default Home;
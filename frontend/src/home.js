import { useState, useEffect } from 'react';
import './cssFiles/Home.css';
import CorseList from './CorseList';
import Navbar from './Navbar';
import ContentView from './ContentView1';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CourseDetails from './CourseDetails';
import AddCourse from './addcourse';

const Home = () => {

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
                console.log(setcorses);

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
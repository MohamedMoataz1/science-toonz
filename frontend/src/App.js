import './App.css';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './home'; 
import CourseDetails from './CourseDetails';
import Navbar from './Navbar';
import StudentHome from './StudentHome';
import { useState } from 'react';

function App() {
  const HomeSecurity = () => {
    if (localStorage.getItem('userToken') !== null){
      
      return <Home />
    }
    else
    {
      return <Login />
    }
  }

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <div>

      
       
      <Route path="/home" render={() => <HomeSecurity />} />




      <Route path="/StudentHome" component={StudentHome} />
      </div>
      
      
      
    </Switch>
  </BrowserRouter>


  );
}

export default App;

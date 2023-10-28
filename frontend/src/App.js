import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './home'; 
import CourseDetails from './CourseDetails';
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <div>
       
      <Route path="/home" component={Home} />

      </div>
      
      
      
    </Switch>
  </BrowserRouter>


  );
}

export default App;

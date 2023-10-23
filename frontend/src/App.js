import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './home'; 
import CourseDetails from './CourseDetails';
function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      
    </Switch>
  </BrowserRouter>


  );
}

export default App;

import { useState } from 'react';
import './cssFiles/Login.css';

const Login = () => {
    const [username ,setusername] = useState(null);
    const [password ,setpassword] = useState(null);

    const handlesubmit = (e) => {
        e.preventDefault();
        const User = {username , password} ; 
        console.log(User) ;
        
        // fetch('http://localhost:8000/users' , {
        //     method : 'POST',
        //     body : JSON.stringify(User)
        
        // }).then (
        // ()=> {
        //         console.log(User)
        // }
        // )

    }


    
    
    return ( 
        <div className="background">
            <div className='form'>
                <div className='sciencetoonzphoto'></div>
                <form className="loginform" onSubmit={handlesubmit } >
                    <h1>User Login</h1>
                    <input 
                    type="text" 
                    placeholder='Enter Username' 
                    required 
                    onChange={(e) => setusername(e.target.value)}
                    /> 
                    <input 
                    type="password" 
                    placeholder='Enter Password' 
                    required
                    onChange={(e) => setpassword(e.target.value)}
                    />
                    <button className='submit'>Login</button>
              
                
                </form>
                
            </div>
        </div>
     );
}
 
export default Login;
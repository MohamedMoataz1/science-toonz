import { useState } from 'react';
import './cssFiles/Login.css';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setusername] = useState(null);
    const [password, setpassword] = useState(null);
    const history = useHistory();

    const handlesubmit = (e) => {
        e.preventDefault();
        const User = { email, password };
        // console.log(User) ;

        fetch('http://localhost:8080/api/login/', {
            method: 'POST',
            body: JSON.stringify(User),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
                // Log the parsed JSON data
                // console.log("Response Data:", data.user_role);
                if (data.user_role === true) {




                    localStorage.setItem('userToken', data.token);
                    localStorage.setItem('userName', data.user.firstName);

                    history.push('/home');

                }
                else if(data.user_role === false) {
                    localStorage.setItem('userToken', data.token);
                    history.push('/StudentHome');
                    

                }


            }
            )

    }




    return (
        <div className="background">
            <div className='form'>
                <div className='sciencetoonzphoto'></div>
                <form className="loginform" onSubmit={handlesubmit} >
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
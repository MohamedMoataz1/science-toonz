import { useState } from 'react';
import './cssFiles/Login.css';
import { useHistory } from 'react-router-dom';
import './cssFiles/Registerstudent.css'

const Login = () => {
    const [email, setusername] = useState(null);
    const [password, setpassword] = useState(null);
    const history = useHistory();
    const [errormsge, seterrormsg] = useState(false);

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

        }).then((res) => {
            if(!res.ok)
            {
                seterrormsg(true);
            }
            return res.json();
            

        }
        ).then((data) => {
                console.log(data);
                if (data.user_role === true) {

                    localStorage.setItem('userToken', data.token);
                    localStorage.setItem('userName', data.user.firstName);

                    history.push('/home');

                }
                else if (data.user_role === false) {
                    localStorage.setItem('userToken', data.token);
                    console.log(data.user.id);
                    history.push(`/StudentHome?id=${data.user.id}`);


                }


            }
            )

    }




    return (
        <div className="background">
            <div className='form'>
                <div className='sciencetoonzphoto' >

                </div>
                
                <form className="loginform" onSubmit={handlesubmit} >
                    <h1>Sign In</h1>

                    {
                        errormsge &&
                        <p className='wrongemaildiv'> Incorrect email or password. Please try again</p>

                    }

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
                    <button className='submit'>sign in</button>


                </form>

            </div>
        </div>
    );
}

export default Login;
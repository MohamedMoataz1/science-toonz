import { useState } from "react";
import '../cssFiles/Registerstudent.css';
import Swal from "sweetalert2";

const RegisterStudent = () => {
    const userToken = localStorage.getItem('userToken');
    const [firstName, setfirstNAme] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [fatherName, setfatherName] = useState(null);
    const [school, setschool] = useState(null);
    const [email, setemail] = useState(null);
    const [officialEmail, setofficialEmail] = useState(null);
    const [year, setyear] = useState(null);
    const [password, setpassword] = useState(null);
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };
    const handleRegister = (e) => {
        e.preventDefault();
        const Student = { firstName, lastName, fatherName, school, email, password, officialEmail, year }
        console.log(Student);
        fetch('http://localhost:8080/api/student/addStudent', {
            method: 'POST',
            body: JSON.stringify(Student),
            headers: headers,

        }).then((res) => {
            if (res.ok) {
                Swal.fire({
                    title: "Succefully Added",
                    text: `student with email '${email}' is added`,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result)=> {
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                });
            }
            else {
                // Handle non-successful responses (status codes other than 2xx)
                res.json().then((data) => {
                    // You can show an error message to the user or handle it as needed
                    Swal.fire({
                        title: "Failed",
                        text: data.message || "Unknown error",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                });
            }
            
        })

        


    }
    return (
        <div className="body">
            
                <form className="inputBox" onSubmit={handleRegister}>

                    <input type="text" required onChange={(e) => setfirstNAme(e.target.value)} />
                    <span>First Name</span>

                    <input type="text" required onChange={(e) => setlastName(e.target.value)} />
                    <span>Last Name</span>

                    <input type="text" required onChange={(e) => setfatherName(e.target.value)} />
                    <span>Father's Name</span>

                    <input type="text" required onChange={(e) => setschool(e.target.value)} />
                    <span>School</span>

                    <input type="text" required onChange={(e) => setemail(e.target.value)} />
                    <span>Email</span>

                    <input type="text" required onChange={(e) => setpassword(e.target.value)} />
                    <span>Password</span>
                    

                    <input type="text" required onChange={(e) => setofficialEmail(e.target.value)} />
                    <span>Official Email</span>

                    <input type="text" required onChange={(e) => setyear(e.target.value)} />
                    <span>Year</span>

                    <button className='RegisterbuttonS'>Register Student</button>

                </form>

            
        </div>
    );
}

export default RegisterStudent;
import { useState } from "react";

const RegisterStudent = () => {
    const userToken = localStorage.getItem('userToken');
    const [firstName, setfirstNAme] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [fatherName, setfatherName] = useState(null);
    const [school, setschool] = useState(null);
    const [email, setemail] = useState(null);
    const [officialEmail, setofficialEmail] = useState(null);
    const [year, setyear] = useState(null);
    const [password, setpassword] = useState("123456");
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

        }) 
        window.location.reload();


    }
    return (
        <div className="Details">
            <form className="RegisterForm" onSubmit={handleRegister}>
                <input type="text" className="Registerinputs" placeholder="First Name" required onChange={(e) => setfirstNAme(e.target.value)} />
                <input type="text" className="Registerinputs" placeholder="Last Name" required onChange={(e) => setlastName(e.target.value)} />
                <input type="text" className="Registerinputs" placeholder="Fathers Name" required onChange={(e) => setfatherName(e.target.value)} />
                <input type="text" className="Registerinputs" placeholder="School" required onChange={(e) => setschool(e.target.value)} />
                <input type="text" className="Registerinputs" placeholder="Email" required onChange={(e) => setemail(e.target.value)} />
                <input type="text" className="Registerinputs" placeholder="Password" value={123456} />
                <input type="text" className="Registerinputs" placeholder="Official Email" required onChange={(e) => setofficialEmail(e.target.value)} />
                <input type="text" className="Registerinputs" placeholder="Year" required onChange={(e) => setyear(e.target.value)} />
                <button className='Registerbutton'>Register Student</button>
            </form>

        </div>
    );
}

export default RegisterStudent;
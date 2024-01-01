import { useState } from "react";
import '../cssFiles/Registerstudent.css';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const RegisterStudent = () => {
    const userToken = localStorage.getItem('userToken');
    const [serial, setserial] = useState(null);
    const [firstName, setfirstNAme] = useState(null);
    const [fatherName, setfatherName] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [arabic, setarabic] = useState(null);
    const [officialEmail, setofficialEmail] = useState(null);
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);
    const [studentNumber, setstudentNumber] = useState(null);
    const [parentNumber, setparentNumber] = useState(null);
    const [classEmail, setclassEmail] = useState(null);
    const [className, setclassName] = useState(null);
    const [schoolName, setschoolName] = useState(null);
    const [gender, setgender] = useState(null);
    const [year, setyear] = useState(null);
    const [fees, setfees] = useState(null);
    const [firstInstalment, setfirstInstalment] = useState(null);
    const [secondInstalment, setsecondInstalment] = useState(null);
    const [paymentNotes, setpaymentNotes] = useState(null);
    const [IsFocused, setIsFocused] = useState(false);







    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };
    const handleRegister = (e) => {
        e.preventDefault();
        const Student = { serial, firstName, lastName, fatherName, lastName, arabic, officialEmail, email, password, studentNumber, parentNumber, classEmail, className, schoolName, gender, year, fees, firstInstalment, secondInstalment, paymentNotes }
        console.log(Student);
        fetch('http://localhost:8080/api/students/', {
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
                }).then((result) => {
                    if (result.isConfirmed) {
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
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <div className="body">

            <form className="inputBox" onSubmit={handleRegister}>


                <input type="text" required onChange={(e) => setserial(e.target.value)} />
                <span>Serial</span>

                <div className="inputRow">
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setfirstNAme(e.target.value)} />
                        <span>First Name</span>


                    </div>
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setfatherName(e.target.value)} />
                        <span>Father's Name</span>
                    </div>
                </div>

                <input type="text" required onChange={(e) => setlastName(e.target.value)} />
                <span>Last Name</span>

                <input type="text" required onChange={(e) => setarabic(e.target.value)} />
                <span>الأسم</span>

                <div className="inputRow">
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setemail(e.target.value)} />
                        <span>Email</span>
                    </div>
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setofficialEmail(e.target.value)} />
                        <span>Official Email</span>
                    </div>
                </div>

                <input type="text" required onChange={(e) => setpassword(e.target.value)} />
                <span>Password</span>

                <div className="inputRow">
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setstudentNumber(e.target.value)} />
                        <span>Student Number</span>
                    </div>
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setparentNumber(e.target.value)} />
                        <span>Parent Number</span>
                    </div>
                </div>

                <div className="inputRow">
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setclassEmail(e.target.value)} />
                        <span>Class Email</span>
                    </div>
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setclassName(e.target.value)} />
                        <span>Class Name</span>
                    </div>
                </div>

                <div className="inputRow">
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setschoolName(e.target.value)} />
                        <span>School</span>
                    </div>
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setyear(e.target.value)} />
                        <span>Year</span>
                    </div>
                </div>

                <input type="text" required onChange={(e) => setgender(e.target.value)} />
                <span>Gender</span>

                

                <div className="inputRow">
                    <div className="inputGroup">
                    <input type="text" required onChange={(e) => setfees(e.target.value)} />
                <span>Fees</span>
                    </div>
                    <div className="inputGroup">
                    <input type="text" required onChange={(e) => setpaymentNotes(e.target.value)} />
                <span>Payment Notes</span>
                    </div>
                </div>


                <div className="inputRow">
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setfirstInstalment(e.target.value)} />
                        <span>1st Instalment</span>
                    </div>
                    <div className="inputGroup">
                        <input type="text" required onChange={(e) => setsecondInstalment(e.target.value)} />
                        <span>2nd Instalment</span>
                    </div>
                </div>

                <button className='RegisterbuttonS'>Register Student</button>

            </form>


        </div>
    );
}

export default RegisterStudent;
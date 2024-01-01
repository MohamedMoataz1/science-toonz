import { useState, useEffect } from "react";
const PopupStudents = ({ Sessions, HandleAddStudent, togglemodal2, id, AddedSession, Logo, setAddedEmail, AppendSessions, Categories, headers ,AddedEmail}) => {


    const [studentsNotInCourse, setStudentsNotInCourse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/students/notInCourse/2', {
                    method: 'GET',
                    headers: headers,
                });


                if (response.ok) {
                    const data = await response.json();
                    setStudentsNotInCourse(data);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    console.log(studentsNotInCourse);

    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <div className="close-btn">
                        <img src={Logo} alt="LOGO" className='logoimage-popup' />
                        <button onClick={togglemodal2} className="exit-button">X</button>
                    </div>
                    <form className="add-course-form" onSubmit={HandleAddStudent}>
                        <label>Student Email:</label>
                        <select
                            value={AddedEmail}
                            onChange={(e) => setAddedEmail(e.target.value)}
                            className="studentemailtobeaddedtocourse"
                        >
                            <option value="" disabled>Select an email</option>
                            {studentsNotInCourse.map(student => (
                                <option key={student.id} value={student.email}>
                                    {student.email}
                                </option>
                            ))}
                        </select>
                        <label>Choose Student Sessions : </label>
                        <div className="dropdownboxesforsessiontostudentparentdiv">
                            {Array.from({ length: Categories }, (_, index) => (
                                <select key={index} onChange={(e) => AppendSessions(parseInt(e.target.value, 10), index)} className="dropdownboxesforsessiontostudent">
                                    <option disabled selected>Select Session {index + 1} </option>
                                    {Sessions.map((session) => (
                                        session.category == (index + 1) ?
                                            <option value={session.id} > {session.day} </option>

                                            : null




                                    ))}


                                </select>
                            ))}
                        </div>

                        <button type="submit" className="addingbutton">
                            Add Student
                        </button>





                    </form>




                </div>
            </div>
        </div>
    );
}

export default PopupStudents;

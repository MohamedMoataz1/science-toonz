import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
const Popupeditstudent = ({ togllemodal4forstudentEdit, showedStudent, Logo, AppendSessions, Categories, Sessions, AddedSessionsToStudent, setAddedSessionsToStudent, showButton, setShowButton, AllDetails, headers }) => {
    const [studentsession , setstudentsession] = useState(null);
    useEffect(() => {
        let temp = Array(Categories).fill("no selected sessions");
        let zerosArray = Array(Categories).fill(0);
        const sortedSessions = [...showedStudent.sessionDtos].sort((a, b) => a.category - b.category);
        console.log(sortedSessions);
        for (let i = 0; i < sortedSessions.length; i++) {

            temp[sortedSessions[i].category - 1] = sortedSessions[i].day
            zerosArray[sortedSessions[i].category - 1] = sortedSessions[i].id


        }
        setstudentsession(temp);
        console.log(zerosArray);
        console.log(temp);
        setAddedSessionsToStudent(zerosArray);
        //setAddedSessionsToStudent(zerosArray);
        


    }, []);
    
    console.log(AddedSessionsToStudent);
    const HandleEditStudentSession = () => {
        console.log(AddedSessionsToStudent);
        for (let i = 0; i < AddedSessionsToStudent.length; i++) {
            if (AddedSessionsToStudent[i] === 0) {
                AddedSessionsToStudent.splice(i, 1);
                i--; 
            }
            
            
        }
        console.log(AddedSessionsToStudent);
        fetch(`http://localhost:8080/api/sessions/students/${showedStudent.id}/courses/${AllDetails.id}`, {
            method: 'PUT',
            body: JSON.stringify(AddedSessionsToStudent),
            headers: headers,

        }).then((res) => res.json())

            .then((data) => {
                console.log(AddedSessionsToStudent);
            })

        window.location.reload();

    }



    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <div className="close-btn">
                        <img src={Logo} alt="LOGO" className='logoimage-popup' />
                        <button onClick={togllemodal4forstudentEdit} className="exit-button">X</button>
                    </div>
                    <div className="showingstudentdetails">
                        <h1> firstName: {showedStudent.firstName}</h1>
                        <h1> lastName : {showedStudent.lastName}</h1>
                        <h1> fatherName:{showedStudent.fatherName}</h1>
                        <h1> school: {showedStudent.school}</h1>
                        <h1> email :{showedStudent.email}</h1>
                        <h1> officialEmail :{showedStudent.officialEmail}</h1>
                        <h1> year :{showedStudent.year}</h1>
                        <h1> fees :{showedStudent.fees}</h1>
                        <h1>Sesssions : </h1>
                        <div className="dropdownboxesforsessiontostudentparentdiv">
                            {Array.from({ length: Categories }, (_, index) => (
                                <select key={index} onChange={(e) => AppendSessions(parseInt(e.target.value, 10), index)} className="dropdownboxesforsessiontostudent" >
                                    <option disabled selected>
                                    { studentsession && studentsession[index]}  
                                     </option>
                                    {Sessions.map((session) => (
                                        session.category === (index + 1) && studentsession && studentsession[index] && session.day !== studentsession[index] ?
                                            <option value={session.id} > {session.day} </option>

                                            : null




                                    ))}
                                    {
                                        studentsession && studentsession[index] != "no selected sessions"  ?
                                        <option value={0} > Diselect Session </option> : null

                                    }


                                </select>
                            ))}
                        </div>

                        {showButton && (
                            <button className="SubmitSessionsEdit" onClick={HandleEditStudentSession} >
                                Apply Changes
                            </button>
                        )}


                    </div>





                </div>
            </div>
        </div>
    );
}

export default Popupeditstudent;

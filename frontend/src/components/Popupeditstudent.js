import { Modal } from "@mui/material";
import { useEffect } from "react";
const Popupeditstudent = ({ togllemodal4forstudentEdit, showedStudent, Logo, AppendSessions, Categories, Sessions, AddedSessionsToStudent, setAddedSessionsToStudent, showButton, setShowButton ,AllDetails , headers}) => {

    useEffect(() => {
        setShowButton(false);
        let temp = []
        for (let index = 0; index < Categories; index++) {
            temp.push(showedStudent.sessionDtos[index].id)
            console.log(temp);
        }
        setAddedSessionsToStudent(temp);
        console.log(showedStudent.sessionDtos);

    }, []);

    const HandleEditStudentSession = () => {
        fetch(`http://localhost:8080/api/session/updateSessionsOfStudent/${showedStudent.id}/${AllDetails.id}` , {
            headers : headers , 
        }).then((res)=>{
            return res.json();
            console.log("gt salema");
        })
        
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
                                <select key={index} onChange={(e) => AppendSessions(parseInt(e.target.value, 10), index)} className="dropdownboxesforsessiontostudent" required>
                                    <option disabled selected>{showedStudent.sessionDtos[index].day
                                    } </option>
                                    {Sessions.map((session) => (
                                        session.category == (index + 1) ?
                                            <option value={session.id} > {session.day} </option>

                                            : null




                                    ))}


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

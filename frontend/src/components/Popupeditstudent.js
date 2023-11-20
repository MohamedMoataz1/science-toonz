import { Modal } from "@mui/material";
import { useEffect } from "react";
const Popupeditstudent = ({ togllemodal4forstudentEdit, Categories, courseid, setstudentid, studentid, Logo , AppendSessions , Sessions , headers , sessionofstudent}) => {
    
    console.log(studentid);
    console.log("zeb");
    
    
    return (
        <div className="modal">
            {/* <div className="overlay">
                <div className="modal-content">
                    <div className="close-btn">
                        <img src={Logo} alt="LOGO" className='logoimage-popup' />
                        <button onClick={togllemodal4forstudentEdit} className="exit-button">X</button>
                    </div>
                    <div className="dropdownboxesforsessiontostudentparentdiv">
                        {Array.from({ length: Categories }, (_, index) => (
                            <select key={index} onChange={(e) => AppendSessions(e.target.value)} className="dropdownboxesforsessiontostudent" required>
                                <option >  </option>
                                {Sessions.map((session) => (
                                    session.category == (index + 1) ?
                                        <option value={session.id} > {session.day} </option>

                                        : null




                                ))}


                            </select>
                        ))}
                    </div>





                </div>
            </div> */}
        </div>
    );
}

export default Popupeditstudent;

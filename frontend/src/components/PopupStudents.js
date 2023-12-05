 
const PopupStudents = ({ Sessions, HandleAddStudent, togglemodal2, id, AddedSession, Logo, setAddedEmail, AppendSessions, Categories }) => {
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
                        <input
                            type="email"
                            onChange={(e) => setAddedEmail(e.target.value)}
                            placeholder="Enter student's email"
                            required
                            className="studentemailtobeaddedtocourse"
                        />
                        <label>Choose Student Sessions : </label>
                        <div className="dropdownboxesforsessiontostudentparentdiv">
                            {Array.from({ length: Categories }, (_, index) => (
                                <select key={index} onChange={(e) => AppendSessions(parseInt(e.target.value, 10) , index)} className="dropdownboxesforsessiontostudent"required>
                                    <option disabled selected>Select Session {index+1} </option>
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

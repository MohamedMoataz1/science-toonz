import { useState, useEffect } from 'react';
import '../cssFiles/Registerstudent.css';
const Popupsession = ({ endTime,startTime,togglemodal, HandleAddSession, setday, setstartTime, setendTime, setlink, setcategory, setdate, Logo , date }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleFocus2 = () => {
        setIsFocused2(true);
    };

    const handleBlur2 = () => {
        setIsFocused2(false);
    };
    const handleFocus3 = () => {
        setIsFocused3(true);
    };

    const handleBlur3 = () => {
        setIsFocused3(false);
    };

    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <div className="close-btn">
                        <img src={Logo} alt="LOGO" className='logoimage-popup' />
                        <button onClick={togglemodal} className="exit-button">X</button>
                    </div>
                    <div className="body">
                        <form className="inputBox" onSubmit={HandleAddSession}>


                            <input type="text" name="day " required onChange={(e) => setday(e.target.value)} />
                            <span>Session Day</span>

                            {isFocused2 ? (
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setstartTime(e.target.value)}
                                    onFocus={handleFocus2}
                                    onBlur={handleBlur2}
                                />
                            ) : (
                                <input
                                    type="text"
                                    required
                                    value={startTime}
                                    onChange={(e) => setstartTime(e.target.value)}
                                    onFocus={handleFocus2}
                                    onBlur={handleBlur2}
                                />
                            )}
                            <span>Start Time</span>

                            {/* <input type="date" name="endDate" required onChange={(e) => setEndDate(e.target.value)} /> */}
                            {isFocused ? (
                                <input
                                    type="time"
                                    name="endDate"
                                    value={endTime}
                                    onChange={(e) => setendTime(e.target.value)}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            ) : (
                                <input
                                    type="text"
                                    required
                                    value={endTime}
                                    onChange={(e) => setendTime(e.target.value)}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            )}
                            <span>End time</span>



                            <input type="text" required onChange={(e) => setlink(e.target.value)} />
                            <span>Session Link</span>


                            <input  type="text" required onChange={(e) => setcategory(e.target.value)} />
                            <span>Session Category</span>

                            

                            {isFocused3 ? (
                                <input
                                    type="date"
                                    name="Date"
                                    value={date}
                                    onChange={(e) => setdate(e.target.value)}
                                    onFocus={handleFocus3}
                                    onBlur={handleBlur3}
                                />
                            ) : (
                                <input
                                    type="text"
                                    required
                                    value={date}
                                    onChange={(e) => setendTime(e.target.value)}
                                    onFocus={handleFocus3}
                                    onBlur={handleBlur3}
                                />
                            )}
                            <span>Date</span>
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            <button className="RegisterbuttonS" >
                                Add Session
                            </button>




                        </form>
                    </div>

                </div>
            </div>
        </div>);
}




export default Popupsession;


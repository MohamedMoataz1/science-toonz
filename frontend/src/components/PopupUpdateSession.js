
const PopupUpdateSession = ({
    setmodal3,
    setday,
    setdate,
    setcategory,
    setlink,
    modal3,
    setstartTime,
    setendTime,
    togglemodal3,
    day,
    startTime,
    endTime,
    date,
    link,
    category,
    id,
    Logo ,
    headers 
 }) => {



 
    const functiontemp = () => {
        console.log(day);
        console.log(startTime);
        console.log(endTime);
        console.log(date);
        console.log(link);
        console.log(category);
        console.log("viemolik.com");
        setmodal3(!modal3);
        const UpdatesData = {day , startTime , endTime , date , link , category }
        fetch(`http://localhost:8080/api/session/updateCourseSession/${id}`, {
            method: 'PUT',
            body: JSON.stringify(UpdatesData),
            headers: headers,
        })
        window.location.reload();
        
        


    }

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        functiontemp(); // Call your function here
    }
    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <div className="close-btn">
                        <img src={Logo} alt="LOGO" className='logoimage-popup' />
                        <button onClick={togglemodal3} className="exit-button">X</button>
                    </div>

                    <form className="add-course-form"  onSubmit={handleFormSubmit}>
                        <h1>Update For Session "{day}"</h1>

                        <label >day :</label>
                        <input className="studentpopupinputs" type="text" value={day} onChange={(e) => setday(e.target.value)} /> <br />

                        {/* <label >id :</label>
                        <input className="studentpopupinputs" type="text" value={id} /> <br /> */}

                        <label >Start Time: </label>
                        <input className="studentpopupinputs" type="time" value={startTime} onChange={(e) => setstartTime(e.target.value)} /> <br />

                        <label >End Time :</label>
                        <input className="studentpopupinputs" type="time" required value={endTime} onChange={(e) => setendTime(e.target.value)} />

                        <label >link :</label>
                        <input className="studentpopupinputs" type="text" required value={link} onChange={(e) => setlink(e.target.value)} />


                        <label >category :</label>
                        <input className="studentpopupinputs" type="text" required value={category} onChange={(e) => setcategory(e.target.value)} />


                        <input className="studentpopupinputs" type="date" required value={date} onChange={(e) => setdate(e.target.value)} />


                        <button className="addingbutton" >
                            Apply Changes
                        </button>





                    </form>




                </div>
            </div>
        </div>


    );
}

export default PopupUpdateSession;
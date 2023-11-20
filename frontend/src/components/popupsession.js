const Popupsession = ({togglemodal , HandleAddSession , setday ,setstartTime,setendTime , setlink,setcategory ,setdate,Logo}) => {
    
    
    return ( 
    <div className="modal">
    <div className="overlay">
        <div className="modal-content">
            <div className="close-btn">
                <img src={Logo} alt="LOGO" className='logoimage-popup' />   
                <button onClick={togglemodal} className="exit-button">X</button>
            </div>

            <form className="add-course-form" onSubmit={HandleAddSession}>

                
                <input className="studentpopupinputs"type="text" name="day " required placeholder="enter session day : " onChange={(e) => setday(e.target.value)} />

                <label >Start Time: </label> 
                <input className="studentpopupinputs" type="time" required onChange={(e) => setstartTime("12:12:47")} /> 

                <label >End Time :</label>
                <input className="studentpopupinputs" type="time" required onChange={(e) => setendTime("12:12:47")} /> 

                
                <input placeholder="enter session link" className="studentpopupinputs" type="text" required onChange={(e) => setlink(e.target.value)} />


                
                <input placeholder = "enter session's category"className="studentpopupinputs" type="text" required onChange={(e) => setcategory(e.target.value)} />

                
                <input className="studentpopupinputs" type="date" required onChange={(e) => setdate(e.target.value)} />


                <button className="addingbutton" >
                    Add Session
                </button>




            </form>

        </div>
    </div>
</div> );
}
 

 

export default Popupsession ;


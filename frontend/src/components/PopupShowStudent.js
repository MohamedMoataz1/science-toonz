import Logo from '../images/ST Transparent.png';

const PopupShowStudent = ({togllemodal,showedStudent}) => {
    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <div className="close-btn">
                        <img src={Logo} alt="LOGO" className='logoimage-popup' />
                        <button onClick={togllemodal} className="exit-button">X</button>
                    </div>
                    <div className="showingstudentdetails">
                        <h1>Serial: {showedStudent.serial}</h1>
                        <h1> firstName: {showedStudent.firstName}</h1>
                        <h1> lastName : {showedStudent.lastName}</h1>
                        <h1> fatherName:{showedStudent.fatherName}</h1>
                        <h1> school: {showedStudent.school}</h1>
                        <h1> email :{showedStudent.email}</h1>
                        <h1> Student Number :{showedStudent.studentNumber}</h1>
                        <h1> Parent Number :{showedStudent.parentNumber}</h1>
                        <h1> Year :{showedStudent.year}</h1>
                        <h1> fees :{showedStudent.fees}</h1>
                        



                    </div>





                </div>
            </div>
        </div>
    );
}
 
export default PopupShowStudent;
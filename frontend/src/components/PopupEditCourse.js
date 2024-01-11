import { useState } from "react";

const PopupEditCourse = ({ Logo, togglemodalEditCourse, AllDetails , headers}) => {
    const [name, setname] = useState(AllDetails.name);
    const [startDate, setstartDate] = useState(AllDetails.startDate);
    const [endDate, setendDate] = useState(AllDetails.endDate);
    const [numOfCategories, setnumOfCategories] = useState(AllDetails.numOfCategories);
    const [materialLink, setmaterialLink] = useState(AllDetails.materialLink);
    const [active, setactive] = useState(AllDetails.active);
    const handleEditCourse = () => {
        const updateData = { name, startDate, endDate, active, numOfCategories, materialLink }
        const editCourseAPI = `http://localhost:8080/api/courses/${AllDetails.id}`;

        const fetchData = async () => {
            try {
                const response = await fetch(editCourseAPI, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(updateData),
                });

                if (!response.ok) {
                    throw new Error('Failed to update course');
                }
            } catch (error) {
                console.error('Error updating course:', error.message);
                
            }
        };

        fetchData();
    }


    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <div className="close-btn">
                        <img src={Logo} alt="LOGO" className='logoimage-popup' />
                        <button onClick={togglemodalEditCourse} className="exit-button">X</button>
                    </div>
                    <div className="body">
                        <form className="add-course-form" onSubmit={handleEditCourse}>
                            <h1>Update For Course </h1>
                            <h1>"{AllDetails.name}"</h1>
                            <label >Course Name :</label>
                            <input className="studentpopupinputs" type="text" value={name} onChange={(e) => setname(e.target.value)} required /> <br />

                            <label>Start Date</label>
                            <input
                                className="studentpopupinputs"
                                type="date"
                                required
                                value={startDate ? new Date(startDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => setstartDate(e.target.value)}

                            />

                            <label>end Date</label>
                            <input
                                className="studentpopupinputs"
                                type="date"
                                required
                                value={endDate ? new Date(endDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => setendDate(e.target.value)}

                            />

                            <label >Number Of Categories :</label>
                            <input className="studentpopupinputs" type="text" value={numOfCategories} onChange={(e) => setnumOfCategories(e.target.value)} required /> <br />
                            <label >Material Link :</label>
                            <input className="studentpopupinputs" type="text" value={materialLink} onChange={(e) => setmaterialLink(e.target.value)} required /> <br />
                            <button className="addingbutton" >
                                Apply Changes
                            </button>





                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PopupEditCourse;
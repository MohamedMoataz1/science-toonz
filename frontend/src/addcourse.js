import { useState } from "react";
const AddCourse = () => {

    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [studentsFile, setStudentsFile] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Handle the uploaded file (e.g., parse the Excel sheet).
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, including sending data to your backend.
    }
    return (
        <div className="SubmitForm">
            <form onSubmit={handleSubmit} >
            <div>
                <label>Course Name:</label>
                <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            </div>
            <div>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div>
                <label>Upload Students (Excel):</label>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            </div>
            <button type="submit">Create Course</button>
        </form> 

        </div>


        
    );
}

export default AddCourse;
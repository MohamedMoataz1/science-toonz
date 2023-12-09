import { useState } from "react";
import './cssFiles/Registerstudent.css';
import Swal from "sweetalert2";
const AddCourse = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const userToken = localStorage.getItem('userToken');
    const [name, setname] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numOfCategories, setnumOfCategories] = useState('');
    const [materialLink, setmaterialLink] = useState('');
    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const course = { name, startDate, endDate, numOfCategories, materialLink }
        console.log(JSON.stringify(course));
        fetch('http://localhost:8080/api/course/createCourse', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: headers,

        }).then((res) => {
            if (res.ok) {
                Swal.fire({
                    title: "Successfully Submited!",
                    text: "Course Added",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();

                    }

                });;
            }
            else {
                // Handle non-successful responses (status codes other than 2xx)
                res.json().then((data) => {
                    // You can show an error message to the user or handle it as needed
                    Swal.fire({
                        title: "Oh Oh",
                        text: data.message || "Unknown error",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                });
            }

        })

    }

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

    return (
        <div className="body">
            <form onSubmit={handleSubmit} className="inputBox" >

                <input type="text" name="name" required onChange={(e) => setname(e.target.value)} />
                <span>Course Name</span>



                {isFocused2 ? (
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        onFocus={handleFocus2}
                        onBlur={handleBlur2}
                    />
                ) : (
                    <input
                        type="text"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        onFocus={handleFocus2}
                        onBlur={handleBlur2}
                    />
                )}
                <span>Start Date</span>

                {/* <input type="date" name="endDate" required onChange={(e) => setEndDate(e.target.value)} /> */}
                {isFocused ? (
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                ) : (
                    <input
                        type="text"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                )}
                <span>End Date</span>




                <input
                    type="number"
                    name="numOfCategories"
                    required
                    onChange={(e) => setnumOfCategories(e.target.value)}
                />
                <span>Number of Categories:</span>




                <input type="link" name="materialLink" required onChange={(e) => setmaterialLink(e.target.value)} />
                <span>Material Link:</span>

                <button type="submit" className="RegisterbuttonS">Submit</button>
            </form>


        </div>




    );
}

export default AddCourse;
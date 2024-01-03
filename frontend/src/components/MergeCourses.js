import { useEffect, useState } from 'react';
import '../cssFiles/MergeCourse.css'
import Swal from "sweetalert2";
const MergeCourses = ({ courses }) => {
    const [course1, setcourse1] = useState(null);
    const [course2, setcourse2] = useState(null);
    const [coursesM, setcoursesM] = useState(null);
    const userToken = localStorage.getItem('userToken');
    const [course1Name, setcourse1Name] = useState(null);
    const [course2Name, setcourse2Name] = useState(null);
    const appendCourse = (courseid, index) => {
        if (index == 1) {
            setcourse1(courseid);
        }
        else {
            setcourse2(courseid);
        }

    }

    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };
    const handlMergeCourses = (e) => {
        e.preventDefault();
        let tempCourse1Name, tempCourse2Name;

        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === course1) {
                tempCourse1Name = courses[i].name;
            } else if (courses[i].id === course2) {
                tempCourse2Name = courses[i].name;
            }
        }

        // Use the callback function to perform actions after state update
        setcourse1Name(() => tempCourse1Name);
        setcourse2Name(() => tempCourse2Name);
    }

    useEffect(() => {
        console.log(headers);
        // Check if course names are not null before showing the Swal dialog
        if (course1Name && course2Name) {
            Swal.fire({
                title: "Are you sure?",
                text: `you want to merge the two courses into one course with name "${course2Name}" note that course "${course1Name}" will be deleted`,
                icon: "question",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:8080/api/courses/merge/${course1}/${course2}`, {
                        method: 'GET',
                        headers: headers,

                    }).then((res) => {
                        if (res.ok) {
                            Swal.fire({
                                title: "Succefully Merged",
                                text: `courses succecfully merged into one course named "${course2Name}" and "${course1Name}" is deleted `,
                                icon: "success",
                                confirmButtonText: "OK",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        }
                        else {
                            // Handle non-successful responses (status codes other than 2xx)
                            res.json().then((data) => {
                                // You can show an error message to the user or handle it as needed
                                Swal.fire({
                                    title: "Failed",
                                    text: data.message || "Unknown error",
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                            });
                        }

                    })

                } else {
                    // User clicked "No" or closed the dialog, handle accordingly
                    console.log("Merge canceled");
                    // Add your cancel logic here
                }
            });
        }
    }, [course1Name, course2Name]);

    

    useEffect(() => {
        // Check if courses is an array before setting coursesM
        if (Array.isArray(courses)) {
            setcoursesM(courses);
        } else {
            setcoursesM([]);
        }
    }, [courses]);
    console.log(coursesM);
    console.log(courses);
    return (
        <div>
            <form className='add-course-form' onSubmit={handlMergeCourses}>
                <div className="dropdownboxesforcoursetomergeparentdiv">
                    {Array.from({ length: 2 }, (_, index) => (
                        <select required key={index} onChange={(e) => appendCourse(parseInt(e.target.value, 10), index + 1)} className="dropdownboxesforcoursetomerge">
                            <option disabled selected value="" >Select {index === 0 ? '1st' : '2nd'} Course</option>
                            {
                                courses?.map((course) => (
                                    (index === 0 && course.id !== course2) || (index === 1 && course.id !== course1) ? (
                                        <option key={course.id} value={course.id}>
                                            {course.name.split(' ').slice(0, 3).join(' ').toUpperCase()}
                                        </option>
                                    ) : null
                                ))
                            }


                        </select>
                    ))}
                </div>
                <button type="submit" className="addingbutton" >
                    Merge courses
                </button>
            </form>

        </div>
    );
}

export default MergeCourses;
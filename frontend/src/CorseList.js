import { Link } from 'react-router-dom';
import Addcourseimage from './images/3307376.png'
const CorseList = ({ corses, headers }) => {
    return (

        <div className='showcourses'>
            {
                corses.map(course => (
                    <Link to={`/home/course/${course.id}`} className='corse-prieview' tabindex="0" key={course.id} >
                        <h1>{course.id} <br /> </h1>
                        <h1> {course.name} </h1>

                    </Link>



                ))}
            <Link to="/home/addcourse" className='corse-prieview' tabindex="0"  >
                <div className='addCourse'></div>


            </Link>

        </div>

    );
}

export default CorseList;
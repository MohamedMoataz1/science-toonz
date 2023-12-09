import { Link } from 'react-router-dom';
import Addcourseimage from './images/3307376.png'
const CorseList = ({ corses, headers }) => {
    console.log(corses);
    return (

        <div className='showcourses'>
            {
                corses.map(course => (
                    <Link to={`/home/course/${course.id}`} className='corse-prieview' tabindex="0" key={course.id} title={course.name}>

                        <h1> {course.name.toUpperCase()} </h1>
                        <div>
                            <p>{course.startDate.slice(0, course.startDate.indexOf('T'))}</p>
                            <p>{course.endDate.slice(0, course.startDate.indexOf('T'))}</p>
                        </div>

                    </Link>



                ))}
          

        </div>

    );
}

export default CorseList;
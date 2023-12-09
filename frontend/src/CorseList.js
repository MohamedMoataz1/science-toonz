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
                            <p>Start Date: {formatDate(course.startDate)}</p>
                            <p>End Date: {formatDate(course.endDate)}</p>
                        </div>


                    </Link>



                ))}
          

        </div>

    );
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  

export default CorseList;
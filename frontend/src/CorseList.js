import { Link } from 'react-router-dom';
import Addcourseimage from './images/3307376.png'
import { useState } from 'react';
const CorseList = ({ corses, headers }) => {
    
    const [ifShowed,setifShowed] = useState(false); 
    const HanldeShowing = () => {
        setifShowed(!ifShowed);

    }
    return (

        <div className='showcourses'>
            {
                corses.filter(course => course.active === true)
                    .map(course => (
                        <Link to={`/home/course/${course.id}`} className='corse-prieview' tabindex="0" key={course.id} title={course.name}>

                            <h1> {course.name.toUpperCase()} </h1>
                            <div>
                                <p>Start Date: {formatDate(course.startDate)}</p>
                                <p>End Date: {formatDate(course.endDate)}</p>
                            </div>


                        </Link>



                    ))}
            {}
            <div onClick={HanldeShowing} className='corse-prieview-false'>
                {ifShowed === true ?<h1> Unactivate Courses  &#9650; </h1> :<h1> Unactivate Courses &#9660; </h1> }
                


            </div>
            
            {ifShowed && corses.filter(course => course.active === false)
                .map(course => (
                    <Link to={`/home/course/${course.id}`} className='corse-prieview-false' tabindex="0" key={course.id} title={course.name}>

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
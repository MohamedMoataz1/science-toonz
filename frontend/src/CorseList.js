import { Link } from 'react-router-dom';
import Addcourseimage from './images/3307376.png'
import { useState } from 'react';
const CorseList = ({ corses, headers }) => {

    const [ifShowed, setifShowed] = useState(false);
    const [ifShowed2, setifShowed2] = useState(false);
    const HanldeShowing = () => {
        setifShowed(!ifShowed);

    }
    const HanldeShowing2 = () => {
        setifShowed2(!ifShowed2);

    }

    return (

        <div className='showcourses'>
            <div onClick={HanldeShowing2} className='corse-prieview-true-active'>
                {ifShowed2 === true ? <h1> Active Courses  &#9650; </h1> : <h1> Active Courses &#9660; </h1>}



            </div>
            { ifShowed2 &&
                corses.filter(course => course.active === true)
                    .map(course => (
                        <Link to={`/home/course/${course.id}`} className='corse-prieview' tabindex="0" key={course.id} title={course.name}>

                            <div className='subject'>

                            <h1> {course.name.toUpperCase()} </h1>
                            </div>

                            <div className='date'>
                                <p>Start Date: {formatDate(course.startDate)}</p>
                                <p>End Date: {formatDate(course.endDate)}</p>
                            </div>


                        </Link>



                    ))}
            
            <div onClick={HanldeShowing} className='corse-prieview-false'>
                {ifShowed === true ? <h1> Deactivate Courses  &#9650; </h1> : <h1> Deactivate Courses &#9660; </h1>}



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
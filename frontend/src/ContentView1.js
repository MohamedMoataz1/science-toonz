import CorseList from './CorseList';

const ContentView = ({ corses ,userName}) => {
    return (
        <div className='hellodr'>
            <h1>Hello dr. {userName} </h1>
            <h2>Your courses:</h2>
            { corses && <CorseList corses={corses} /> }        
        </div>
                
                
     );
}

export default ContentView;
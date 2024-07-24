import ButtonCV from './ButtonCV';
import NavBar from './NavBar';
import {Link} from 'react-router-dom';
import ParticleBackground from './ParticleBackground';



const Base = ({ children }) => {
    return (
        <div>
            <NavBar />
            <ParticleBackground/>
            <main>{children}</main>
            <Link to="/DevJourney/contact"><ButtonCV/></Link>
        </div>
    );
};

export default Base;

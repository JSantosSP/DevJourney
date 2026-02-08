import ButtonCV from './ButtonCV';
import NavBar from './NavBar';
import {Link} from 'react-router-dom';
import ParticleBackground from './ParticleBackground';



const Base = ({ children }) => (
  <div className="base-layout">
    <NavBar />
    <ParticleBackground />
    <main className="base-main">{children}</main>
    <Link to="/contact"><ButtonCV /></Link>
  </div>
);

export default Base;

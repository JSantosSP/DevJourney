import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage';
import ApiFilm from './Pages/ApiFilm/ApiFilm'
import ProjectDescription from './Pages/ApiFilm/ProjectDescription'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/DevJourney" element={<HomePage/>}/>
          <Route exact path="/DevJourney/contact" element={<ProfilePage/>}/>
          <Route exact path="/DevJourney/apifilm" element={<ApiFilm/>}/>
          <Route exact path="/DevJourney/apifilm/description" element={<ProjectDescription/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

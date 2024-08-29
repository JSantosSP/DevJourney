import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage';
import ApiFilm from './Pages/ApiFilm/ApiFilm'
import ApiFilmDescription from './Pages/ApiFilm/ProjectDescription'
import RankAppDescription from './Pages/RankApp/ProjectDescription'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/DevJourney/build" element={<HomePage/>}/>
          <Route exact path="/DevJourney/build/contact" element={<ProfilePage/>}/>
          <Route exact path="/DevJourney/build/apifilm" element={<ApiFilm/>}/>
          <Route exact path="/DevJourney/build/apifilm/description" element={<ApiFilmDescription/>}/>
          <Route exact path="/DevJourney/build/rankapp" element={<RankAppDescription/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

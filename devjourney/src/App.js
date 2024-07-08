import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage';
import ApiFilm from './Pages/ApiFilm/ApiFilm'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/contact" element={<ProfilePage/>}/>
          <Route exact path="/apifilm" element={<ApiFilm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

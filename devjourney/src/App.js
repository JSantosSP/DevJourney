import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/contact" element={<ProfilePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

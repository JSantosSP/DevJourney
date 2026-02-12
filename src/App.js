import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage';
import ApiFilm from './Pages/ApiFilm/ApiFilm';
import ApiFilmDescription from './Pages/ApiFilm/ProjectDescription';
import RankAppDescription from './Pages/RankApp/ProjectDescription';
import GestorCryptoDoc from './Pages/GestorCrypto/GestorCryptoDoc';
import ChatyLifeDoc from './Pages/ChatyLife/ChatyLifeDoc';
import PocketMindDoc from './Pages/PocketMind/PocketMindDoc';
import DuoChallengeDoc from './Pages/DuoChallenge/DuoChallengeDoc';

const basename = process.env.PUBLIC_URL || '';

function App() {
  return (
    <div className="app-wrapper">
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gestorcrypto" element={<GestorCryptoDoc />} />
          <Route path="/chatylife" element={<ChatyLifeDoc />} />
          <Route path="/pocketmind" element={<PocketMindDoc />} />
          <Route path="/duochallenge" element={<DuoChallengeDoc />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

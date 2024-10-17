import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Page/HomePage/HomePage';
import GenerateImagePage from './Page/GenerateImagePage/GenerateImagePage';

import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate/:name" element={<GenerateImagePage />} />
      </Routes>
    </Router>
  );
};

export default App;
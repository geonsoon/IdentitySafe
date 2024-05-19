import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ResponsiveAppBar from './pages/ResponsiveAppBar';
import ActionAreaCard from './pages/ActionAreaCard';
import FooterAreaCard from './pages/FooterAreaCard';
import VideoRecorder from './pages/VideoRecorder';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/home">
          <ResponsiveAppBar />
        </Link>
        
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/camera" element={<VideoRecorder />} />
        </Routes>
        
        <ActionAreaCard />
        <FooterAreaCard />
      </BrowserRouter>
    </div>
  );
}

export default App;

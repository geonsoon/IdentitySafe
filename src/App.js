import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ResponsiveAppBar from './pages/ResponsiveAppBar';
import Home from './pages/routerpages/Home';
import Camera from './pages/routerpages/Camera';
import Gallery from './pages/routerpages/Gallery';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/home">
          <ResponsiveAppBar />
        </Link>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;

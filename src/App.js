import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ResponsiveAppBar from './pages/ResponsiveAppBar';
import Camera from './pages/Camera';
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
          <Route path="/camera" element={<Camera />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;

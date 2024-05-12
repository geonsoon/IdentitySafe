import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Camera from './pages/Camera';
import Album from './pages/Album';

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/album" element={<Album />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div>
        메인
      </div>
      <div>
        푸터
      </div>
    </div>
  );
}

export default App;
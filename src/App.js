import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route , Link} from "react-router-dom";
import Logo from '../src/image/identitysafe.png';
import ResponsiveAppBar from './pages/ResponsiveAppBar';
import ActionAreaCard from './pages/ActionAreaCard';
import FooterAreaCard from './pages/FooterAreaCard';

function App() {
  return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/home">
              <ResponsiveAppBar></ResponsiveAppBar>
            </Link>
          </div>
          <div>
            <ActionAreaCard></ActionAreaCard>
          </div>
          <div>
            <FooterAreaCard></FooterAreaCard>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
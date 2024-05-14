import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route , Link} from "react-router-dom";
import Logo from '../src/image/identitysafe.png';
import ActionAreaCard from './pages/ActionAreaCard';

function App() {
  return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo" width={200} />
            </Link>
          </div>
          <div>
            <ActionAreaCard></ActionAreaCard>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
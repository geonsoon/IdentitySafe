import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route , Link} from "react-router-dom";
import Logo from '../src/image/identitysafe.jpeg';
import ActionAreaCard from './pages/ActionAreaCard';
import Safefunction from './pages/Safefunction';

function App() {
  return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo" width={100} height={100}/>
            </Link>
          </div>
          <div>
            <ActionAreaCard></ActionAreaCard>
          </div>
          <div>
            <Safefunction></Safefunction>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
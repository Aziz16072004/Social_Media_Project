import 'bootstrap/dist/css/bootstrap.css'

import "./App.css"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componants/Home';
import Login from './componants/login/Login';
import SignUp from './componants/login/Singup';


function App() {
  return (
    
    <Router>

      <Routes>
        <Route path="/Social_Media_Project"  element={<Login />} />

        <Route path="/Social_Media_Project/signup" element={<SignUp />} />
        <Route path="/Social_Media_Project/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.css'

import "./App.css"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componants/Home';
import Login from './componants/login/Login';
import SignUp from './componants/login/Singup';


function App() {
  return (
    
    <Router basename="/Social_Media_Project">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

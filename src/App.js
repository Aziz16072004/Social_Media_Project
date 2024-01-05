// App.js or wherever your main component is defined

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/Singup';
import Profile from './components/profile';
// import ImageUpload from './components/addImage';
import GetImgs from './components/GetImages';


function App() {
  return (
    
    <Router>

      <Routes>
        <Route path="/"  element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/profile/:id" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;

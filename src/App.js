import 'bootstrap/dist/css/bootstrap.css'

import "./App.css"
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componants/Home';
import Login from './componants/login/Login';
import SignUp from './componants/login/Singup';
import Setting from './componants/setting/Setting';
import Profile from './componants/profile/Profile';
import Bookmarks from './componants/Bookmarks';
import Addfriends from './componants/Addfriends';
import Chat from './componants/Chat';
import io from "socket.io-client"


function App() {
  const socket = io("http://localhost:8000");
  

  return (
    
    <Router basename="/Social_Media_Project">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/home" exact element={<Home socket={socket}/>} />
        <Route path="/setting/:id"  element={<Setting/>} />
        <Route path="/profile/:id"  element={<Profile/>} />
        <Route path="/bookmarks/:id"  element={<Bookmarks />} />
        <Route path="/addfriends/:id"  element={<Addfriends />} />
        <Route path="/chat/:id1"  element={<Chat socket={socket}/>} />
        <Route path="/chat/:id1/:id2"  element={<Chat/>} />
      </Routes>
    </Router>
  );
}


export default App;

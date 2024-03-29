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
import StoriesCreate from './componants/StoriesCreate';


function App() {
  
  const [socket, setSocket] = useState(null);
  const [showTheme, setShowTheme] = useState(false);
  const [color,setColor] = useState("lightMode");
  const [theme,setTheme] = useState("lightMode");
  const themeMapping = [
    {
      class : "bachgroundLight" ,
      themeMoode : "lightMode",
      paragraphe : "Light"
    },
    {
      class : "bachgroundDark" ,
      themeMoode : "darkMode",
      paragraphe : "Dark"
    },
    {
      class : "bachgroundBlack" ,
      themeMoode : "blackMode",
      paragraphe : "Black"
    }
  ]
  const colors = ["mainColor","yellow","red","green","aqua"]
  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("theme"));
    if (data) {
      
      setTheme(data.theme)
      setColor(data.color)
    }
  },[])
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify({ theme: theme, color: color }));
}, [theme, color]);
  const updateSetShowTheme = (newValue) => {
    setShowTheme(newValue);
  };
  return (
    
    <div className={`${theme} ${color}`}>
      
    {showTheme ?(
      
      <div className={"main-theme-bar row " + theme +" " +color}>
      
              <div class="theme_bar col-11 col-md-9 col-lg-7 mx-auto">
                <ion-icon name="close-outline" onClick={(e) => {setShowTheme(false)}}></ion-icon>
      
                  <div class="theme-info">
                      <h2>Cstomize your view</h2>
                      <p>manage your font size , color , and background</p>
                  </div>
                  <p class="theme-font-title">Font Size</p>
                  <div class="size-bar">
                      
                  <small>Aa</small>
                  <div class="size-line">
                  {
                    Array.from({ length: 5 }).map((_, i) => (
                      <span
                      id={`active${i + 1}`}
                      onClick={() => {
                        const allElements = document.querySelectorAll('.size-line span');
                        allElements.forEach(element => {
                          element.classList.remove('active');
                        });
                        document.getElementById(`active${i + 1}`).classList.toggle('active');
                      }}
                      ></span>
                      ))
                    }
                  </div>
                  <h2>Aa</h2>
                  </div>
                  <p class="theme-color-title">Font Size</p>
                  <div class="color-bar">
                  {colors.map((color, index) => (
                    <span
                    key={index}
                    id={`color${index + 1}`}
                    onClick={() => {
                      const allElements = document.querySelectorAll('.color-bar span');
                      allElements.forEach(element => {
                        element.classList.remove('activeColor');
                      });
                      document.getElementById(`color${index + 1}`).classList.toggle('activeColor');
                      setColor(color);
                    }}
                    ></span>
                    ))}
                  </div>
                  <p class="theme-background-title">Background</p>
                  <div class="background-bar">
                    {themeMapping.map((e,i)=>(
                      <div className={`${e.class} background`}  id={`activeTheme${i + 1}`}
                      onClick={() => {
                        const allElements = document.querySelectorAll('.background-bar div');
                        allElements.forEach(element => {
                          element.classList.remove('activeTheme');
                        });
                        document.getElementById(`activeTheme${i + 1}`).classList.toggle('activeTheme');
                        setTheme(e.themeMoode)
                        
                      }}>
                        <div class="circal"></div>
                        <p>{e.paragraphe}</p>
                    </div>
                    ))}
                  </div>
              </div> 
          </div>
                    ):null}
    <Router basename="/Social_Media_Project">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/home" exact element={<Home socket={socket} theme={theme} updateSetShowTheme={updateSetShowTheme}/>} />
        <Route path="/setting/:id"  element={<Setting />} />
        <Route path="/profile/:id"  element={<Profile socket={socket}/>} />
        <Route path="/bookmarks/:id"  element={<Bookmarks />} />
        <Route path="/addfriends/:id"  element={<Addfriends />} />
        <Route path="/chat/:id1"  element={<Chat socket={socket} theme={theme} color={color}/>} />
        <Route path="/chat/:id1/:id2"  element={<Chat theme={theme} color={color}/>} />
        <Route path="/stories/create/:id"  element={<StoriesCreate/>} />
      </Routes>
    </Router>
    </div>
                   
  );
}


export default App;

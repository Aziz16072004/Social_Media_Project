import { useEffect, useRef, useState } from "react"
import React from 'react';
import { Link} from 'react-router-dom';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import song from '../audio/notification.mp3';
export default function ControleBar({socket , updateSetShowTheme}) {

    
    const [data,setData] = useState([])
    const [notification,setNotification] = useState([])
    const [dataStoraged,setDataStoraged] = useState({})
    const [newNotifi,setNewNotifi] = useState(0)
    const audioRef = useRef(null);
    
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        }
    };
    useState(()=>{
       
        const data = JSON.parse(localStorage.getItem("user"));
        setDataStoraged(data)
    },[])
    
    useEffect(() => {
        
        if (socket) {
        socket.on("receive-notification", (notification) => {
            playAudio()
            setNotification(prevNotifi =>[notification , ...prevNotifi  ])
            setNewNotifi(prevNotifi =>prevNotifi+1)
        });}
    }, [socket]);

    function formatPostDate(createdAt) {
        const postDate = new Date(createdAt);
        const currentDate = new Date();
      
        const yearDiff = currentDate.getFullYear() - postDate.getFullYear();
        const monthDiff = currentDate.getMonth() - postDate.getMonth();
        const dayDiff = currentDate.getDate() - postDate.getDate();
      
        if (yearDiff > 0) {
          return `${yearDiff === 1 ? 'year' : 'years'} ago`;
        } else if (monthDiff > 0) {
          return `${monthDiff === 1 ? 'month' : 'months'} ago`;
        } else if (dayDiff > 0) {
          return `${dayDiff === 1 ? 'day' : 'days'} ago`;
        } else {
          return 'Today';
        }
      }
    const [display , setDisplay] = useState(false)
    const handleNotifications = async()=>{
        setDisplay(!display)
        try{
            await axios.post(`http://localhost:8000/notification/readAllNotifications?user=${dataStoraged._id}`)
            setNewNotifi(0)
        }catch(err){
            console.log(err);
        }
    }
    const readOneNotification = async (Idnotifi) => {
        try {
            const res = await axios.post(`http://localhost:8000/notification/readOneNotification?notifi=${Idnotifi}`);
            if (res) {
                const updatedNotifications = notification.map((notifi) => {
                    if (notifi._id === Idnotifi) {
                        return { ...notifi, read: true };
                    } else {
                        return notifi;
                    }
                });
                setNotification(updatedNotifications);
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/notification/getNotification?receiver=${dataStoraged._id}`);
                setNotification(res.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`http://localhost:8000/user/getuser/${dataStoraged._id}`);
            setData(res.data);
            setNewNotifi(res.data.newNotifi)
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [dataStoraged._id]);
    
    const Contoller = [
        {
            Name: "Home",
            NameDir: "home",
            lineClass : "line-home",
            ionIconName : "home-outline"
        },
        {
            Name: "notifications",
            lineClass : "line-notification",
            ionIconName : "notifications-outline"
        },
        {
            Name: "Messages",
            NameDir: "chat",
            lineClass : "line-pricetag",
            ionIconName : "chatbubbles-outline"
        },
        {
            Name : "Setting",
            NameDir: "setting",
            ionIconName : "settings-outline",
            lineClass : "line-settings"
        },
        {
            Name : "Bookmarks",
            NameDir: "bookmarks",
            ionIconName : "bookmark-outline",
            lineClass : "line-bookmark"
        
        }
    ]
    return(
        <div className="controle-bar col-md-3  ">
             <audio ref={audioRef} src={song} style={{display:"none"}}></audio> 
             
                <Link to={`/profile/${data._id}`}  className="profile-bar" >
                    <div className="profile-bar-content"  >
                        <div className="profile-img">
                            <img src={`http://localhost:8000/${data.profileImg}`}alt=""/>
                        </div>
                        <div className="info">
                            <b id="name-of-profile">{data.username}</b> <br/>
                            <small id="tag-of-profile">{data.email}</small>
                        </div>
                    </div>
                </Link>
                <div className="paramettre">
                    {Contoller.map((e , i)=>{
                        
                        if(e.Name === "notifications"){
                            return (
                                <div className="home"  key={uuidv4()}>

                                <div className="home notifications" onClick={()=>{handleNotifications()}} >
                                    <div className="notifiIcon">
                                        <ion-icon name={e.ionIconName}></ion-icon>
                                        {newNotifi>0 && <span className="newNotifi">{newNotifi}</span>}
                                    </div>
                                <div className="info">
                        
                        <span className={e.lineClass}></span>
                        < p >{e.Name}</p>
                        </div>
                                </div>
                                <div className={ !display ? "notification-bar" : "notification-bar notification-bar-active" }>
            
                { notification && notification.map((notifi , i)=>{
                    return(
                    <div className={notifi.read ? "notification-person " :"notification-person notRead"} key={uuidv4()} onClick={()=>{readOneNotification(notifi._id)}} >
                        <div className="profile-img">
                            <img src={`http://localhost:8000/${notifi.sender.profileImg}`} alt=""/>
                        </div>
                        <div className="notification-info"> 
                            <b>{notifi.sender.username}</b> <small> {notifi.description}<br/>
                            {formatPostDate(notifi.createdAt)}
                            </small>
                        </div>
                    
                </div>)
                })}
                </div>
            </div>)
                        }
                        else{
                        return(
                        <Link to={e.NameDir==="home" ? `/${e.NameDir}`:(`/${e.NameDir}/${data._id}`)} className="home"  key={uuidv4()} >
                        <ion-icon name={e.ionIconName}></ion-icon>
                        <div className="info">
                            <span className={e.lineClass}></span>
                        < p >{e.Name}</p>
                        </div>
                        </Link>)}})}
                        <div className="home"  onClick={()=>{updateSetShowTheme(true)}}>
                            <ion-icon name="cloudy-outline"></ion-icon>
                            <div className="info">
                                <span className="theme"></span>
                            <p>theme</p>
                            </div>
                        </div>
                     </div>
                     
            </div>
    )
}
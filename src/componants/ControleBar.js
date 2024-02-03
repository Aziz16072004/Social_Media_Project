import { useEffect, useState } from "react"
import React from 'react';
import { Link} from 'react-router-dom';
import axios from "axios";


export default function ControleBar({socket}) {

    const [data,setData] = useState([])
    const [notification,setNotification] = useState([])
    const [dataStoraged,setDataStoraged] = useState({})
    useState(()=>{
        setDataStoraged(JSON.parse(localStorage.getItem("user")));
    },[])

    useEffect(() => {
        if (socket) {
        socket.on("receive-notification", (notification) => {
            setNotification(prevNotifi =>[notification , ...prevNotifi  ])
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
    function handleNotifications(){
        setDisplay(!display)
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`http://localhost:8000/user/getuser/${dataStoraged._id}`);
            setData(res.data);
            setNotification(res.data.notifications)
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
            ionIconName : "pricetag-outline"
        },
       
        {
            Name: "Theme",
            lineClass : "line-cloudy",
            ionIconName : "cloudy-outline"
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
        
        },
        {
            Name : "Addfriends",
            NameDir: "addfriends",
            ionIconName : "person-add-outline",
            lineClass : "line-addfriends"
        }
    ]
   
    return(
        <div className="controle-bar col-md-3  ">
                <Link to={`/profile/${data._id}`} className="profile-bar">
                    <div className="profile-bar-content">
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
                                <div className="home"  key={i} onClick={()=>{handleNotifications()}}>

                                <div className="home notifications"  >
                                    <div className="notifiIcon">
                                        <ion-icon name={e.ionIconName}></ion-icon>
                                        <span className="newNotifi">2</span>
                                    </div>
                                <div className="info">
                        
                        <span className={e.lineClass}></span>
                        < p >{e.Name}</p>
                        </div>
                                </div>
                                <div className={ !display ? "notification-bar" : "notification-bar notification-bar-active" }>
            
                { notification && notification.map((notifi , i)=>{
                    return(
                    <div className="notification-person" >
                    <div className="profile-img">
                        <img src={`http://localhost:8000/${notifi.user.profileImg}`} alt=""/>
                    </div>
                    <div className="notification-info"> 
                        <b>{notifi.user.username}</b> <small> {notifi.description}<br/>
                        {formatPostDate(notifi.createdAt)}
                        </small>
                    </div>
                    
                </div>)
                })}
                </div>
            </div>)
                        }
                        else{
                        return(<Link to={e.NameDir=="home" ? `/${e.NameDir}`:(`/${e.NameDir}/${data._id}`)} className="home" >
                        <ion-icon name={e.ionIconName}></ion-icon>
                        <div className="info">
                            <span className={e.lineClass}></span>
                        < p >{e.Name}</p>
                        </div>
                        </Link>)}})}  
                     </div>
            </div>
    )
}
import { useState } from "react"
import my_profile_photo from "../imgs/my-profile-photo.jpg"
import profil_img from "../imgs/profil-img.jfif"

export default function ControleBar() {
    const data = JSON.parse(localStorage.getItem("user"));
    const [display , setDisplay] = useState(false)
    function handleNotifications(){
        setDisplay(!display)
    }
    const Contoller = [
        {
            Name: "Home",
            lineClass : "line-home",
            ionIconName : "home-outline"
        },
        {
            Name: "Explore",
            lineClass : "line-dawnload",
            ionIconName : "download-outline"
        },
        {
            Name: "notifications",
            lineClass : "line-notification",
            ionIconName : "notifications-outline"
        },
        {
            Name: "Messages",
            lineClass : "line-pricetag",
            ionIconName : "pricetag-outline"
        },
        {
            Name: "Bookmarks",
            lineClass : "line-bookmark",
            ionIconName : "bookmark-outline"
        },
        {
            Name: "Analytics",
            lineClass : "line-analytics",
            ionIconName : "analytics-outline"
        },
        {
            Name: "Theme",
            lineClass : "line-cloudy",
            ionIconName : "cloudy-outline"
        },
        {
            Name: "Settings",
            lineClass : "line-settings",
            ionIconName : "settings-outline"
        },
    ]
    const notifications = [
        {
            userName : "Keke Benjamin",
            image : profil_img,
            message : " accepted your friend request",
            CreatedAt : "2 DAYS AGO"
        },
        {
            userName : "Keke Benjamin",
            image : profil_img,
            message : " accepted your friend request",
            CreatedAt : "2 DAYS AGO"
        },
        {
            userName : "Keke Benjamin",
            image : profil_img,
            message : " accepted your friend request",
            CreatedAt : "2 DAYS AGO"
        },
        {
            userName : "Keke Benjamin",
            image : profil_img,
            message : " accepted your friend request",
            CreatedAt : "2 DAYS AGO"
        },
        {
            userName : "Keke Benjamin",
            image : profil_img,
            message : " accepted your friend request",
            CreatedAt : "2 DAYS AGO"
        },
        {
            userName : "Keke Benjamin",
            image : profil_img,
            message : " accepted your friend request",
            CreatedAt : "2 DAYS AGO"
        },
        {
            userName : "Keke Benjamin",
            image : profil_img,
            message : " accepted your friend request",
            CreatedAt : "2 DAYS AGO"
        },
    ]
    return(
        <div className="controle-bar col-md-3  d-none d-md-block">
                <div className="profile-bar">
                    <div className="profile-bar-content">
                    <div className="profile-img">
                        <img src={my_profile_photo}alt=""/>
                    </div>
                    <div className="info">
                        <b id="name-of-profile">{data.username}</b> <br/>
                        <small id="tag-of-profile">{data.email}</small>
                    </div>
                    </div>
                </div>
                <div className="paramettre">
                    {Contoller.map((e , i)=>{
                        if(e.Name === "notifications"){
                            return (
                            <div className="home"  key={i} onClick={()=>{handleNotifications()}}>
                                <div className="home notifications"  >
                                <ion-icon name={e.ionIconName}></ion-icon>
                                <span className={e.lineClass} ></span>
                                <p>{e.Name}</p>
                                </div>
                                <div className={ !display ? "notification-bar" : "notification-bar notification-bar-active" }>
                
                {notifications.map((e , i)=>{
                    return(
                    <div className="notification-person" >
                    <div className="profile-img">
                        <img src={e.image} alt=""/>
                    </div>
                    <div className="notification-info"> 
                        <b>{e.userName}</b> <small> {e.message}<br/>
                        {e.CreatedAt}</small>
                    </div>
                </div>)
                })}
                </div>
            </div>)
                        }
                        else{
                        return(<div className="home" key={i}>
                        <ion-icon name={e.ionIconName}></ion-icon>
                        <span className={e.lineClass}></span>
                        <p>{e.Name}</p>
                        </div>)}
                    })}
                </div>

                <button className="button btn2">Create Post</button>

            
            </div>
    )
}
import my_profile_photo from "../imgs/my-profile-photo.jpg"

export default function ControleBar() {
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
    return(
        <div class="controle-bar col-md-3  d-none d-md-block">
                <div class="profile-bar">
                    <div class="profile-img">
                        <img src={my_profile_photo}alt=""/>
                    </div>
                    <div class="info">
                        <b id="name-of-profile">Aziz chaabani</b> <br/>
                        <small id="tag-of-profile">@mohamed</small>
                    </div>
                </div>
                <div className="paramettre">
                    {Contoller.map((e , i)=>{

                        return(<div className="home" key={i}>
                        <ion-icon name={e.ionIconName}></ion-icon>
                        <span className={e.lineClass}></span>
                        <p>{e.Name}</p>
                        </div>)
                    })}
                </div>

                <button class="button btn2">Create Post</button>



            <div class="notification-bar">
                <div class="notification-person">
                <div class="profile-img">
                    <img src="../imgs/profil-img.jfif" alt=""/>
                </div>
                <div class="notification-info"> 
                    <b>Keke Benjamin</b> <small> accepted your friend request <br/>
                    2 DAYS AGO</small>
                </div>
                </div>
                <div class="notification-person">
                    <div class="profile-img">
                        <img src="images/profil-img.jfif" alt=""/>
                    </div>
                    <div class="notification-info"> 
                        <b>Keke Benjamin</b> <small> accepted your friend request <br/>
                        2 DAYS AGO</small>
                    </div>
                    </div>
                    <div class="notification-person">
                        <div class="profile-img">
                            <img src="images/profil-img.jfif" alt=""/>
                        </div>
                        <div class="notification-info"> 
                            <b>Keke Benjamin</b> <small> accepted your friend request <br/>
                            2 DAYS AGO</small>
                        </div>
                        </div>
                        <div class="notification-person">
                            <div class="profile-img">
                                <img src="images/profil-img.jfif" alt=""/>
                            </div>
                            <div class="notification-info"> 
                                <b>Keke Benjamin</b> <small> accepted your friend request <br/>
                                2 DAYS AGO</small>
                            </div>
                        </div>
                        <div class="notification-person">
                            <div class="profile-img">
                                <img src="images/profil-img.jfif" alt=""/>
                            </div>
                            <div class="notification-info"> 
                                <b>Keke Benjamin</b> <small> accepted your friend request <br/>
                                2 DAYS AGO</small>                                
                            </div>
                        </div>
                        <div class="notification-person">
                            <div class="profile-img">
                                <img src="images/profil-img.jfif" alt=""/>
                            </div>
                            <div class="notification-info"> 
                                <b>Keke Benjamin</b> <small> accepted your friend request <br/>
                                2 DAYS AGO</small>
                            </div>
                        </div>
                        <div class="notification-person">
                        <div class="profile-img">
                            <img src="images/profil-img.jfif" alt=""/>
                        </div>
                        <div class="notification-info"> 
                            <b>Keke Benjamin</b> <small> accepted your friend request <br/>
                             2 DAYS AGO</small>
                        </div>
                        </div>




            </div>
            </div>
    )
}
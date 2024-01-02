import my_profile_photo from "../imgs/my-profile-photo.jpg"

export default function ControleBar() {
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
                <div class="paramettre">
                    <div class="home home1">
                        <ion-icon name="home-outline"></ion-icon>
                        <span class="line-home" ></span>
                        <p>Home</p>
                    </div>
                    <div class="home">
                        <ion-icon name="download-outline"></ion-icon>
                        <span class="line-dawnload"></span>
                        <p>Explore</p>
                    </div>
                    <div class="home space_notification"  >
                        <ion-icon name="notifications-outline"></ion-icon>
                        <span class="line-notification"></span>
                        <p>notifications</p>
                    </div>
                    <div class="home">
                        <ion-icon name="pricetag-outline"></ion-icon>
                        <p>Messages</p>
                    </div>
                    <div class="home">
                        <ion-icon name="bookmark-outline"></ion-icon>
                        <p>Bookmarks</p>
                    </div>
                    <div class="home">
                        <ion-icon name="analytics-outline"></ion-icon>
                        <p>Analytics</p>
                    </div>
                    <div class="home" >
                        <ion-icon name="cloudy-outline"></ion-icon>
                        <p>Theme</p>
                    </div>
                    <div class="home">
                        <ion-icon name="settings-outline"></ion-icon>
                        <p>Settings</p>
                    </div>


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
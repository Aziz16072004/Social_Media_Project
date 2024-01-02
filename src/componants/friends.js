import chalouati from "../imgs/chalouati-profile.jpg"
import safouen from "../imgs/safouen-profile.jpg"
import yassine from "../imgs/yassine-profile.jpg"
import ghassen from "../imgs/ghassen-profile.jpg"
import ghofran from "../imgs/ghofran-profile.jpg"
import mouhib from "../imgs/mouhib-profile.jpg"
import profile_img from "../imgs/profil-img.jfif"

export default function Friends(){
    const friends = [
        {
            username : "Chàabani Ghøfran",
            image: ghofran,
            lastMessage : " just wake up bruh"
        },
        {
            username : "Mouhamed Chalouati",
            image: chalouati,
            lastMessage : " just wake up bruh"
        },
        {
            username : "Souid Safwen",
            image: safouen,
            lastMessage : " just wake up bruh"
        },
        {
            username : "Yassine Chaabani",
            image: yassine,
            lastMessage : " just wake up bruh"
        },
        {
            username : "Ghassen Ayari",
            image: ghassen,
            lastMessage : " just wake up bruh"
        },
        {
            username : "Mouhib Rezgui",
            image: mouhib,
            lastMessage : " just wake up bruh"
        },
    ];
    const Requests = [
        {
            username : "Keke Benjamin",
            image : profile_img
        }
    ]
    return(
        <div class="friend col-md-3 d-none d-lg-block">
                <div class="message">
                    <div class="messages-title">
                        <h4>Messages</h4>
                        <ion-icon name="clipboard-outline"></ion-icon>
                    </div>
                    <div class="searche-friends">
                        <ion-icon name="search-outline"></ion-icon>
                        <input type="text" placeholder="searche messages"/>
                    </div>
                    <div class="show-friends row">
                        <a href="#" class="col-4">Primary</a>
                        <a href="#" class="col-4">General</a>
                        <a href="#" class="col-4">Requests</a>
                    </div>
                    {friends.map((element)=>{

                    return(
                    <div class="message-person ">
                        <div class="profile-img-friends ">
                            <img src={element.image} alt=""/>
                        </div>
                        <div class="message-info"> 
                            <b>{element.username}</b> <br/> <small> {element.lastMessage}</small>
                        </div>
                    </div>)
                    })}
                    

                </div>
                <h2 class="title">Requests</h2>
                {Requests.map((element)=>{
                    return(
                <div class="requests">
                    <div class="requests-person ">
                        <div class="profile-img">
                            <img src={element.image} alt=""/>
                        </div>
                        <div class="requests-info"> 
                            <b>{element.username}</b> <br/> <small> 8 mutal friends</small>
                        </div>
                        
                    </div>
                    <div className="request-btn">
                    <a href="#post" class="btn-rquests-accept">Accept</a>
                    <a href="#post" class="btn-rquests-reject">Reject</a>
                    </div>
                </div>
                )
                })}
            </div>
    )
}
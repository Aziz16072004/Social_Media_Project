import livvyland_profile from "../imgs/livvyland_profile.jpg"
import nike_profile from "../imgs/nike_profile.jpg"
import painting_profile from "../imgs/painting_profile.jpg"
import neymar_profile from "../imgs/neymar_profile.jpg"
import tokyoghoul_profile from "../imgs/tokyoghoul_profile.jpg"
import depression_profile from "../imgs/depression_profile.jpg"
import chat from "../imgs/chat.png"
import share from "../imgs/share.png"
import ribbon from "../imgs/ribbon.png"

import zenitsu from "../imgs/zenitsu.jpg"
import uchiha from "../imgs/uchiha-logo.jpg"
import luffy from "../imgs/luffy-logo.jpg"
import nike from "../imgs/nike-logo-photo.jpg"
import my_profile_photo from "../imgs/my-profile-photo.jpg"

export default function HomeSection() {
    const Stories  = [
        {
            img : livvyland_profile,
            storyName : "Livvy Land"
        },
        {
            img : nike_profile,
            storyName : "Air Nike"
        },
        {
            img : painting_profile,
            storyName : "Painting"
        },
        {
            img : neymar_profile,
            storyName : "Neymar"
        },
        {
            img : tokyoghoul_profile,
            storyName : "Tokyo Ghoul"
        },
        {
            img : depression_profile,
            storyName : "ERROR"
        },
    ]
    const posts = [
        {
            userName : "lana Rose",
            CreatedAt : "Dubai ,15 MINUTES AGO",
            profileImg : zenitsu
        },
        {
            userName : "Uchiha Itachi",
            CreatedAt : "konoha ,1 HOUR AGO",
            profileImg : uchiha
        },
        {
            userName : "Monckey D Luffy",
            CreatedAt : "wano ,2 MINUTES AGO",
            profileImg : luffy
        },
        {
            userName : "Air Nike",
            CreatedAt : "sans-Francisco ,2 MINUTES AGO",
            profileImg : nike
        },
    ]
    return (
        <div className="acceuil col-12 col-md-9 col-lg-6">
            <div className="storys">
            {Stories.map((ele , index)=>{
                let className = `block_story_${index + 1} story`;
                return(<div className={className} key={index}>
                    <div className="img-profile-story">
                        <img src={ele.img} alt=""/>
                    </div>
                    <div className="story_info">
                        <p>{ele.storyName}</p>
                    </div>
                </div>)
            })}
                
        </div>
        <div className="post-bar" >
                    <div className="profile-img profile-img-post">
                        <img src={my_profile_photo} alt=""/>
                    </div>
                    <div className="input-post-bar">
                        <input type="text" placeholder="what's on your mind , Diana?"/>
                    </div>
                    <a href="#post" className="button btn-post">Post</a>
        </div>
        <div className="section2">
        {posts.map((ele , index)=>{
            let className = `postes-images-post${index + 1}`;
            return(
            <div className="posts">
            <div className="post-title">
                            <div className="profile-img img-post">
                                <img src={ele.profileImg} alt=""/>
                            </div>
                            <div className="post-name-utilisateur">
                                <h3>{ele.userName}</h3>
                                <p>{ele.CreatedAt}</p>
                            </div>
                        </div>
                        <div className={className}></div>
                        <div className="icons-posts">
                            <div className="icons-posts-right">
                                <ion-icon name="heart-outline"></ion-icon>
                                <img src={chat} alt=""/>
                                <img src={share} alt=""/>
                            </div>
                        
                            <div className="icons-posts-right"><img src={ribbon} alt=""/></div>
                        </div>
                            <div className="vue">
                                <div className="line1-vue">
                                    <img src={painting_profile} alt="" className="img1"/>
                                    <img src={nike_profile} alt=""  className="img2"/>
                                    <img src={livvyland_profile} alt=""  className="img3"/>
                                    <p>Like by <b>Emest Achiever</b> and <b>2,323</b> </p>
                                </div>
                                <div className="line2-vue">
                                <p> <b>Lana Rose </b>Lorem ipsum dolor sit amet consectetur . #lifeStyle</p>
                                <small>Vue all 277 comments</small>
                                </div>
                            </div>
            </div>)
         })}
        </div>

        </div>
        
    )
}
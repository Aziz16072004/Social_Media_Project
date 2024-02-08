import React from 'react';
import livvyland_profile from "../imgs/livvyland_profile.jpg"
import nike_profile from "../imgs/nike_profile.jpg"
import painting_profile from "../imgs/painting_profile.jpg"
import neymar_profile from "../imgs/neymar_profile.jpg"
import tokyoghoul_profile from "../imgs/tokyoghoul_profile.jpg"
import depression_profile from "../imgs/depression_profile.jpg"
function Stories({user}) {
    const Stories  = [
        {
            img : livvyland_profile,
            storyName : "Livvy Land",
            username : "a",
        },
        {
            img : nike_profile,
            storyName : "Air Nike",
            username : "g",
        },
        {
            img : painting_profile,
            storyName : "Painting",
            username : "g",
        },
        {
            img : neymar_profile,
            storyName : "Neymar",
            username : "g",
        },
        {
            img : tokyoghoul_profile,
            storyName : "Tokyo Ghoul",
            username : "g",
        },
        {
            img : depression_profile,
            storyName : "ERROR",
            username : "g"
        },
        {
            img : neymar_profile,
            storyName : "Neymar",
            username : "g",
        },
        {
            img : tokyoghoul_profile,
            storyName : "Tokyo Ghoul",
            username : "g",
        },
        {
            img : depression_profile,
            storyName : "ERROR",
            username : "g"
        }
    ]
  return (
 <div className="allStories">
    <div className="storys">
                <div className="block_story story createStory" onClick={()=>console.log("add story function ")} >
                    <img src={`http://localhost:8000/${user.profileImg}`} className='storyImg'/>
                    <div className='addStory'>
                        <ion-icon name="add-outline"></ion-icon>
                    </div>
                    <p className="story_info story_info_create ">create Story</p>
                    
                </div>
            {Stories.map((ele , index)=>(
        
                <div className="block_story story" key={index}>
                    <img src={livvyland_profile} className='storyImg'/>
                    <div className="img-profile-story">
                        <img src={livvyland_profile} alt=""/>
                    </div>
                    
                    <p className="story_info">{ele.username}</p>
                    
                </div>
            ))}
            
    </div>
    </div>
  );
}

export default Stories;

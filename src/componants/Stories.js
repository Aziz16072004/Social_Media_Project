import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import Storiet from "stories-react";
import "stories-react/dist/index.css";
function Stories({user}) {
    const [stories , setStories] = useState([])
    const [showStories , setShowStories] = useState(false)
    const [ storiesContent, setStoriesContent] = useState([])
    const hundleStorie = async (user) =>{
        setShowStories(true)
        try{
            const res = await axios.get(`http://localhost:8000/story/getStoriesForSwipper?userId=${user}`)
            setStoriesContent(res.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        const fetchStories = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8000/story/getAllStories`)
                setStories(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStories()
    },[])
  return (
 <div className="allStories">
    <div className="storys">
                    <Link to={`/stories/create/${user._id}`} className="block_story story createStory">
                    <img src={`http://localhost:8000/${user.profileImg}`} className='storyImg'/>
                    <div className='addStory'>
                        <ion-icon name="add-outline"></ion-icon>
                    </div>
                    <p className="story_info story_info_create ">create Story</p>
                </Link>
            {stories.length>0 && stories.map((ele , index)=>(
                <div className="block_story story" key={index} onClick={()=>{hundleStorie(ele.lastStory.user._id)}}>
                    <img src={`http://localhost:8000/${ele.lastStory.image}`} className='storyImg'/>
                    <div className="img-profile-story">
                        <img src={`http://localhost:8000/${ele.lastStory.user.profileImg}`} alt=""/>
                    </div>
                    <p className="story_info">{ele.username}</p>
                </div>
            ))}
    </div>
    {showStories ?
  (  <div className='swipperStories'>
        <button onClick={()=>{setShowStories(false)}}> X</button>
        <Storiet  width="400px" height="600px" stories={storiesContent} className="swipperContent"/> 

    </div>)
        :null}  
    </div>
  );
}

export default Stories;

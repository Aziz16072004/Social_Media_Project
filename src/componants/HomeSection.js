import { useState , useEffect, useRef } from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import livvyland_profile from "../imgs/livvyland_profile.jpg"
import nike_profile from "../imgs/nike_profile.jpg"
import painting_profile from "../imgs/painting_profile.jpg"
import neymar_profile from "../imgs/neymar_profile.jpg"
import tokyoghoul_profile from "../imgs/tokyoghoul_profile.jpg"
import depression_profile from "../imgs/depression_profile.jpg"

import close from "../imgs/close.png"
import send from "../imgs/paper-plane-top.png"
import whiteLove from "../imgs/whiteLove.png"
import blackLove from "../imgs/blackLove.png"
import loveColored from "../imgs/loveColored.png"

import chat from "../imgs/chat.png"
import share from "../imgs/share.png"
import ribbon from "../imgs/ribbon.png"
import bookmark from "../imgs/bookmark.png"
import Stories from "./Stories"
export default function HomeSection({theme}) {
    
    const [postWidget, setPostWidget] = useState(false);
    const [postName, setPostName] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [data,setData] = useState({})
    const [coloredLove , SetColoredLove] = useState(false)
    const [comment , setComment] = useState("")
    const [showPostInformation , setShowPostInformation] = useState(false)
    const [showRatings , setShowRatings] = useState(false)
    const [showComments , setShowComments] = useState(false)
    const [ratingData , setRatingData] = useState({})
    const fileInputRef = useRef(null);
    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    async function fetchData(postId){
      
        setShowPostInformation(true);
        try {
          const res = await axios.get(`http://localhost:8000/posts/showPost?postId=${postId}`);
          setRatingData(res.data || {});
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    async function hundleClickLike(post){
        try {
          let updatedRates;
          
          if (!post.peopleRated.some(rate => rate.user._id === data._id)) {
            await axios.post("http://localhost:8000/posts/addRate", {
              postId: post && post._id,
              userId: data && data._id,
            });
            updatedRates = post.rates + 1;
          } else {
            await axios.delete("http://localhost:8000/posts/removeRate", {
              data: { postId: post && post._id, userId: data && data._id },
            });
            updatedRates = post.rates - 1;
          }
    
          setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(p => {
              if (p._id === post._id) {
                return {
                  ...p,
                  peopleRated: post.peopleRated.some(rate => rate.user._id === data._id)
                    ? p.peopleRated.filter(rate => rate.user._id !== data._id)
                    
                    : [...p.peopleRated, { user: { _id: data._id ,profileImg : data.profileImg , username : data.username} }],
                  rates: updatedRates,
                };
              }
              return p;
            });
            return updatedPosts;
          });
          SetColoredLove(!coloredLove);
        } catch (error) {
          console.log("Update Rating Error:", error);
        }
    }
    const handleImageChange = (e) => {
      setPostImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', postName);
      formData.append('image', postImage);
      formData.append('userId', data._id);
      try {
        const response = await axios.post(/*'https://blushing-train-newt.cyclic.app/posts/upload'*/"http://localhost:8000/posts/upload", formData);
        setPosts(prevPosts => [response.data,...prevPosts]);
      } catch (error) {
        console.error('Error uploading Post:', error);
      }
    }
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
    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setData(JSON.parse(userData));
      }
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:8000/posts");
          setPosts(response.data);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  };
  fetchProducts();
 }, []);
    
    return (
        <>
         {postWidget ? (
          <div className="change row">
        
          <div className="container col-10 col-md-8 my-auto col-lg-6">
            <div className="createdPostHeader w-100">
              <div className="createdPostHeaderName text-align-center">
                <h3 col->Create Post </h3>
              </div>
              <div className="exite-btn">
                <ion-icon name="close-outline" onClick={()=>{setPostWidget(false)}}></ion-icon>
              </div>
            </div>
            <div className="userPost row"> 
              <img src={`http://localhost:8000/${data.profileImg}`} className="col-2" alt=""/>
              <div className="col-10">
                <h4>{data.username}</h4>
                <p>{data.email}</p>
              </div>
            </div>
          <form onSubmit={handleSubmit}>
            <div className="formContent ">
              <div className="w-100">  
                <input type="text" placeholder="Qoui de noeuf aziz ?" onChange={(e)=>setPostName(e.target.value)}/> 
              </div>
              
          <div className="addPostImage">
            <div className="w-100 albums" onClick={()=>{handleClick()}}>
            {postImage ? 
            
            (<img src={URL.createObjectURL(postImage)} alt=""/>)
            : (<div>
              <ion-icon name="albums-outline"></ion-icon>
              <p>Add pictures or videos</p>      
              </div>)}
          </div>
          </div>

            <p className="d-none">
            <label>Select Image:</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange }/>
            </p>
          <div>
            {postImage && postName !== "" ?(

              <input type="submit" className="submit-btn" value="Save Post"  onClick={()=>{setPostWidget(true)}}/> 
              ):  <input type="submit" className="submit-btn dontsubmit" value="Save Post"/> }
            
          
          </div>
            </div>
            </form>
            </div>
          </div>
          ):null
        } 
        <div className="acceuil col-12 col-md-9 col-lg-6">
         

           <Stories user={data}/>
        
            
        <div className="post-bar" >
                    <div className="profile-img profile-img-post">
                    {data && data.profileImg && (
                        <img src={`http://localhost:8000/${data.profileImg}`} alt=""/>
                    )}
                    </div>
                    <div className="input-post-bar">
                        <input type="text" placeholder="what's on your mind , Diana?"/>
                    </div>
                    <button href="#post" className="button btn-post"  onClick={()=>{setPostWidget(true)}}>Post</button>
        </div>
        <div className="section2">
        
         {posts.map((post)=>{
             const createdAt = formatPostDate(post.createdAt)
            return(
                <div className="posts" key={post._id}>
                    <div className="post-title">
                            <div className="profile-img img-post">
                           
                                <img src={`http://localhost:8000/${post.userId.profileImg}`} alt=""/>
                            
                                </div>
                            <div className="post-name-utilisateur">
                                <h3><Link to={`/profile/${post.userId._id}`}> {post.userId?.username}</Link> </h3>
                                <p>{createdAt} , post Created</p>
                            </div>
                        </div>
                        <div className="post-description ">{post.name}</div>
                        <div className="postes-images-post">
                            <img src={`http://localhost:8000/${post.image}`} alt=""/>
                        </div>
                        <div className="icons-posts">
                            <div className="icons-posts-left">
                            <img
                              alt=""
                              src={post.peopleRated.some(rate => rate.user._id === data._id) ? loveColored : (theme === "blackMode" || theme === "darkMode" ? whiteLove : blackLove)}
                              onClick={async ()=>{hundleClickLike(post)}}/>
                              <ion-icon name="chatbubble-ellipses-outline" onClick={()=>{fetchData(post._id) ; setShowPostInformation(true) ; setShowComments(true)}}></ion-icon>
                  
                              <ion-icon name="share-social-outline"></ion-icon>
                    </div>
                    <div className="icons-posts-right"><img  src={data.postMarkes.some(marke => marke.post === post._id) ? bookmark : ribbon} alt="" onClick={async ()=>{
                      try {
                        const res = await axios.post("http://localhost:8000/posts/postMarkes" , {
                          postId: post && post._id,
                          userId: data && data._id,
                        })
                        localStorage.setItem("user", JSON.stringify(res.data));
                        setData(res.data);
                      } catch (error) {
                        console.log(error);
                      }
                    }}/></div>
                        </div>
                            <div className="vue">
                                <div className="line1-vue">
                                  <div>
                                  {post.peopleRated.map((rater, index) => (
  index < 3 ? <img src={`http://localhost:8000/${rater.user.profileImg}`} alt="" className={`img${index+1}`} key={rater.user._id} /> : ""
))}
              </div>
                                    <p onClick={()=>{fetchData(post._id) ;setShowRatings(true)}}>Like by <b>{post.peopleRated.length > 0 ? post.peopleRated[0].user.username : ""}</b> and <b>{post.rates > 0 ? post.rates - 1 : 0} other</b></p>
</div>


{showPostInformation ? (
  showRatings ? (
    <div className="showRates">
      <div className="showRatesContent">
        <div className="topBarRates">
          <p><img src={loveColored} alt="Love Colored" /></p>
          <p><img src={close} alt="Close" onClick={() => { setShowPostInformation(false) ; setShowRatings(false) ; setShowComments(false) }} /></p>
        </div>
        <div className="ratesBody">
          
          {ratingData && ratingData.peopleRated ? (
            ratingData.peopleRated.map((rate) => (
              <div className="personRateInformation" key={rate.user._id}>
                <div>
                  <img src={`http://localhost:8000/${rate.user.profileImg}`} alt="" />
                  <img src={loveColored} className="coloredHeartRate" alt="Love Colored" />
                </div>
                <p>{rate.user.username}</p>
              </div>
            ))
          ) : (
            <p>No rating data available</p>
          )}
        </div>
      </div>
    </div>
  ) : (showComments ? (
    <div className="showRates">
      <div className="showRatesContent">
        <div className="topBarRates">
          <p><img src={chat} alt="Love Colored" /></p>
          <p><img src={close} alt="Close" onClick={() => { setShowPostInformation(false) ; setShowRatings(false) ; setShowComments(false) }} /></p>
        </div>
        <div className="ratesBody">
          {ratingData.comments && ratingData.comments.length>0 ?
          ratingData.comments.map((com)=>(
            <div className="comment" key={com._id}>
              
                  <img src={`http://localhost:8000/${com.user.profileImg}`} alt=""/>
                  <div className="comment_description">
                    <p className="comment_title"><b>{com.user.username}</b></p>
                    <p className="comment_writing"> {com.comment}</p>
                  </div>
                </div>
            ))
            :<h1>no comments</h1>}
            </div>
          </div>
        </div>
      ) : null)
    ) : null}
          </div>
          <div className="comments">
            <small onClick={()=>{
              
              fetchData(post._id)
              setShowPostInformation(true)
              setShowComments(true)}
              
              }>Vue all {post.comments.length} comments</small>
              {post.comments.length>0 ?
                <div className="comment">
                  
                  <img src={`http://localhost:8000/${post.comments[0].user.profileImg}`} alt=""/>
                  <div className="comment_description">
                    <p className="comment_title"><b>{post.comments[0].user.username}</b></p>
                    <p className="comment_writing"> {post.comments[0].comment}</p>
                  </div>
                </div>
            :null}
                <div className="addComment">
                <img src={`http://localhost:8000/${data.profileImg}`} alt=""/>
                  <div className="comment_description">
                    <input type="text" placeholder="write a comment ...." value={comment} onChange={(e)=>setComment(e.target.value)} />
                    <img src={send} alt="dddd" className="imggggggg" onClick={async ()=>{
                      setComment("");
                      await axios.post("http://localhost:8000/posts/addComment", {
                        postId: post && post._id,
                        userId: data && data._id,
                        comment : comment
                      });
                    }}/>
                  </div>
                </div>
              </div>
            </div>)
         })}
         <div>
            
        </div>
        </div>

        </div>
        
         </>
    )
}
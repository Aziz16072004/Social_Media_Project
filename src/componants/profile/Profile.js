

import { useEffect, useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useParams } from "react-router-dom";
export default function Profile({socket}){
    const [userData , setUserData] = useState(null)
    const [posts , setPosts] = useState([])
    const [dataStoraged , setDataStoraged] = useState({})
    const { id } = useParams();
    const addFriend = async () =>{
        try {
            if (socket) {
                socket.emit("addFriend", {
                    to: userData._id,
                    from: dataStoraged._id,
                    img : dataStoraged.profileImg,
                    username : dataStoraged.username,
                });
                socket.emit("send-notification", {
                    to: userData._id,
                    message : "send an invitation",
                    img : dataStoraged.profileImg,
                    username : dataStoraged.username,
                    createdAt : Date.now()
                });
            }
            await axios.post("http://localhost:8000/user/addFriend/",{sender: dataStoraged._id ,recipient :userData._id })
            
            userData.requests = [{user:dataStoraged._id}, ...userData.requests]
            setUserData((prevUserData) => {
                const newRequests = [{ user: dataStoraged._id }, ...prevUserData.requests];
                return { ...prevUserData, requests: newRequests };
            });    
            
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/getOneUser/${id}`)
                const res2 = await axios.get(`http://localhost:8000/posts/showPostJustForProfile?userId=${id}`)
                setUserData(res.data)
                setPosts(res2.data)
            } catch (error) {
                console.log(error);
            }
        }
        setDataStoraged(JSON.parse(localStorage.getItem('user')))

        fetchData()
    },[])
    return (
         userData ? (
            
            <div className="row profileContent ">
            
            <div className="profileItem row col-10 col-md-8  mx-auto   align-items-center " >

            <img src={`http://localhost:8000/${userData.profileImg}`} alt="" className="col-lg-4 col-12 mx-auto"/>
            <div className="col-12 col-lg-8">
            <div className="profileInfo row my-3 mx-auto justify-content-center align-items-center ">
                    <p className="col-md-5 col-4 mx-auto">{userData.username}</p>
                    <div className="col-md-5 col-5 ">

{
  userData._id === dataStoraged._id ? (
    <Link to={`/setting/${userData._id}`} className="btn">modify profile</Link>
  ) : (
    userData.friends.some((friend) => friend.user === dataStoraged._id) ? (
      <button className="btn button w-100 w-md-50 text-left btn-friend">friend</button>
    ) : (
      userData.requests.some((req) => req.user === dataStoraged._id) ? (
        <button className="btn button w-100 w-md-50 text-left btn-sended">sended</button>
      ) : (
        <button className="btn button w-100 w-md-50 text-left" onClick={() => { addFriend() }}>add friend</button>
      )
    )
  )
}



                   
                    </div>
        </div>
                    <div className="row postInfo">
                    <p className="col-4">{posts.length} publications</p>
                    <p className="col-4">127 amie</p>
                    <p className="col-4">169 suivie</p>
                    </div>
                    </div>
            </div>
            {posts.length>0 && (

                <div className="posts  col-10 col-md-9 col-lg-8 mx-auto  align-items-center ">
                <div className="row">
                    { posts.map((post)=>(
                        
                        <div className="post col-12 col-md-6 col-lg-4" key={post._id}>
                            <img src={`http://localhost:8000/${post.image}`} alt="" />
                        <div className="postpic__content">
                        <div className='row'>
                            <div className="col-6">
                            <ion-icon name="heart-outline"></ion-icon>
                            <p>{post.rates} likes</p>
                            </div>
                            <div  className="col-6">
                            <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                            <p>{post.comments.length} comment</p>
                            </div>
                        </div>
                       
                        </div>
                        </div>
                        
                        ))}
                    
                </div>
            </div>
                        )}
            </div>
            ):null
            
    )
} 
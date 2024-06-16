
import { useEffect, useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
export default function Friends({socket , users}){
    const [friends , setFriends] = useState([])
    const [requests , setRequests] = useState([])
    const userData = JSON.parse(localStorage.getItem("user"));
    const [searchUsers , setSearchUsers] = useState([])
    const [lastMessages, setLastMessages] = useState({});
    
    const searchingUsers = (e)=>{
        const searche = e.target.value
        const filteredUsers = friends.filter((friend) =>
        friend.user?.username.toLowerCase().includes(searche.toLowerCase())
        );
        setSearchUsers(filteredUsers)

    }
    useEffect(() => {
        if (socket) {
        socket.on("receive-addFriends", (userReq) => {
            setRequests(prevReq => [userReq,...prevReq])
        });}
    }, [socket]);
    const acceptFriend = async (req)=>{
        try {
            if (socket) {
                socket.emit("send-notification", {
                    to: req.user?._id,
                    message : "accept your friends request",
                    img : userData.profileImg,
                    username : userData.username,
                    createdAt : Date.now()
                });
                }
            const res = await axios.post("http://localhost:8000/user/acceptfriend", {recipient : userData._id, sender :  req.user?._id,withCredentials: true })
            setFriends((prevFriends) => (Array.isArray(prevFriends) ? [...prevFriends, {user :res.data}] : [{user : res.data}]));
            setRequests(prevRequests => prevRequests.filter(request => request.user?._id !== req.user?._id))
        } catch (error) {
            console.log(error);
        }
    }
  
    const rejectFriend = async (req)=>{
        try {
            if (socket) {
                socket.emit("send-notification", {
                    to: req.user?._id,
                    message : "reject your friends request",
                    img : userData.profileImg,
                    username : userData.username,
                    createdAt : Date.now()
                });
                }
            await axios.delete("http://localhost:8000/user/rejectfriend", {
                data: { recipient: userData._id, sender: req.user?._id },withCredentials: true 
              })
            setRequests(prevRequests => prevRequests.filter(request => request.user?._id !== req.user?._id))
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const res = await axios.get(`http://localhost:8000/user/getuser/${userData._id}`,{withCredentials: true })
                setFriends(res.data.friends)
                setSearchUsers(res.data.friends)
                
                setRequests(res.data.requests)
                const newLastMessages = [];
                await Promise.all(
                res.data.friends.map(async (friend) => {
                    try {
                    const lastMsgResponse = await axios.get(
                        `http://localhost:8000/message/getLastMsg/?from=${userData._id}&to=${friend.user?._id}`,{withCredentials: true }
                    );
                    const lastMessage = lastMsgResponse.data;
                    newLastMessages[friend.user?._id] = lastMessage;

                    } catch (error) {
                    console.error(`Error fetching last message for ${friend.user?.username}:`, error);
                    }
                })
                );

setLastMessages(newLastMessages);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])
    return(
        <div className="friend col-md-3 d-none d-lg-block">
            
                <div className="message">
                    <div className="messages-title">
                        <h4>Messages</h4>
                        <ion-icon name="clipboard-outline"></ion-icon>
                    </div>
                    <div className="searche-friends">
                        <ion-icon name="search-outline"></ion-icon>
                        <input type="text" placeholder="searche messages" onChange={(e)=>searchingUsers(e)}/>
                    </div>
                    <div className="show-friends row">
                        <a href="#" className="col-4">Primary</a>
                        <a href="#" className="col-4">General</a>
                        <a href="#" className="col-4">Requests</a>
                    </div>
                    
                    {searchUsers && searchUsers.map((friend)=>{

                    return(
                    <Link to={`/chat/${userData._id}/${friend.user?._id}`}   className="message-person ">
                        
                        <div className="profile-img-friends ">
                            <img src={`http://localhost:8000/${friend.user?.profileImg}`} alt=""/>
                            {users.some(user => user?.userId ===friend.user?._id) ?(

                                <span className="activePerson"></span>
                                
                            ):null}
                        </div>
                        <div className="message-info"> 
                            <b>{friend.user?.username}</b> <br/> 
                            <small>{lastMessages[friend.user?._id]}</small>
                          
                            
                            
                        </div>
                    </Link>)
                    })}
                </div>
                <h2 className="title">Requests</h2>
                {requests && requests.map((req)=>{
                    return(

                <div className="requests" key={req.user?._id}>
                    <div className="requests-person ">
                        <div className="profile-img">
                            <img src={`http://localhost:8000/${req.user?.profileImg}`} alt=""/>
                        </div>
                        <div className="requests-info"> 
                            <b>{req.user?.username}</b> <br/> <small> 8 mutal friends</small>
                        </div>
                    </div>
                    <div className="request-btn">
                        <button className="btn-rquests-accept" onClick={()=>{acceptFriend(req)}} >Accept</button>
                        <button className="btn-rquests-reject"  onClick={()=>{rejectFriend(req)}}>Reject</button>
                    </div>
                </div>
                )
                })}
            </div>
    )
}
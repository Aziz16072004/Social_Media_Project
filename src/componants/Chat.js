import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
export default function Chat({socket}){  
    const {id1} = useParams()
    const {id2} = useParams()
    const [friends , setFriends] = useState([])
    const [message , setMessage] = useState("")
    const [messages , setMessages] = useState([])
    const [showUser , setShowUser] = useState(null)
    const [waitingMessage , setWaitingMessage] = useState(false)
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [users , setUsers] = useState([])
    const scrollRef = useRef()
    
    useEffect(() => {
        if (socket) {
            socket.emit('add-user', id1);
        }
    }, [socket]);
        useEffect(()=>{
            if (socket) {
                socket.on("getUsers", getUsers => {
                setUsers(getUsers);
            });
        }
        },[socket])
        useEffect(() => {
            if (socket) {
            socket.on("receive-message", (message) => {
                setArrivalMessage(message)
                setWaitingMessage(false)
            });}
        }, [showUser]);
        
        useEffect(() => {
            if (socket) {
            socket.on("receiving-message", (checking) => {
                setWaitingMessage(checking)
            });
        }
        }, [showUser]);
        
        
        useEffect(() => {

            scrollRef.current?.scrollIntoView({ behavior: "smooth"});
            
        }, [messages]);
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    const hundleSendMessage = async () => {
        setMessage("")
        try {
            if (socket) {
            socket.emit("send-message", {
                to: showUser.user._id,
                from: id1,
                message,
            });
            }
            await axios.post("http://localhost:8000/message/addmsg", {
                from: id1,
                to: showUser.user._id,
                message: message,
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { fromSelf: true, message: message }
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (showUser) {
                    const response = await axios.post("http://localhost:8000/message/getmsg", {
                        from: id1,
                        to: showUser.user._id,
                    });
                    setMessages(response.data);
                }
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };
        fetchData();
    }, [showUser]);
    useEffect(()=>{
        const fetchData = async()=>{
            try {  
                const res = await axios.get(`http://localhost:8000/user/getuser/${id1}`)
                if (id2) {
                    const res2 = await axios.get(`http://localhost:8000/user/getuser/${id2}`)
                    setShowUser({user : res2.data})
                }
                setFriends(res.data.friends)
            }catch(err){
                console.log(err);
            }
        }
        fetchData()
    },[])
    return(
        <div className="row">
          
            <div className="chat col-12 col-md-9 row mx-auto align-items-center ">   
                
                <div className={!showUser?("friendsBar col-12 col-md-4"):("friendsBar friendsBarHidden col-12 col-md-4")}>    
                {friends.map((friend)=>(
                    
                    <div className="message-person" onClick={()=>{setShowUser(friend)}}>
                        <div className="profile-img-friends ">
                            <img src={`http://localhost:8000/${friend.user.profileImg}`} alt=""/>
                            {users.some(user => user.userId ===friend.user._id) ?(
                                <span className="activePerson"></span>
                            ):null}
                        </div>
                        <div className="message-info"> 
                            <b>{friend.user.username}</b> <br/> <small> wake up brooo !!!!</small>
                        </div>
                    </div>
                    ))}
                </div>
               
                {showUser ? (
                    <div className="chatBar col-12 col-md-8 ">                    
                    <div className={showUser? "chatNavBar" :"chatNavBar chatNavBarHidden" }>
                            <button onClick={()=>setShowUser(false)}>back</button>
                        <div className="message-person ">
                            <div className="profile-img-friends ">
                                    <img src={`http://localhost:8000/${showUser.user.profileImg}`} alt=""/>
                            </div>
                            <div className="message-info"> 
                                <b>{showUser.user.username}</b> <br/> <small> wake up brooo !!!!</small>
                            </div>
                        </div>
                    </div>
                    <div className="chatBar-content">
                            <div className="discussion">

                                {messages.map((msg)=>(
                                    <div className={msg.fromSelf ? "reciever" : "sender"} ref={scrollRef}>
                                        {/* <img src={`http://localhost:8000/${showUser.user.profileImg}`}/> */}
                                        <p>{msg.message}</p>
                                    </div>
                                ))}
                                {waitingMessage ? (
                                    <div className= "sender">
                                        <p>...</p>
                                    </div>
                                    ):null}
                            </div>
                        <div className="addChat">
                            <input type="text" value={message}onChange={(e)=>{
                                setMessage(e.target.value) 
                                if (socket) {
                                socket.emit("sending-message", {
                                    to: showUser.user._id,
                                });
                            }
                            }}/>
                            <button onClick={hundleSendMessage}>send</button>
                        </div>
                    </div>
                </div>
                ):null}
                
            </div>
        </div>
    )
}
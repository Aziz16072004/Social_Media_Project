import searcheImg  from "../imgs/search-interface-symbol.png"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';


export default function Header({socket}){
    const [showSearchingBar , setShowSearchingBar] = useState(false)
    const [users , setUsers] = useState([])
    const [dataStoraged , setDataStoraged] = useState({})
    const addFriend = async (user) =>{

        try {
            if (socket) {
                socket.emit("send-notification", {
                    to: user._id,
                    message : "send an invitation",
                    img : dataStoraged.profileImg,
                    username : dataStoraged.username,
                    createdAt : Date.now()
                });
                }
            const res = await axios.post("http://localhost:8000/user/addFriend/",{sender: dataStoraged._id ,recipient :user._id })
        } catch (error) {
            console.log(error);
        }
    }
    const hundleFocuse = async () => {
  setShowSearchingBar(true);

  try {
    const res = await axios.get("http://localhost:8000/getAllUsers");
    setUsers(res.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
useEffect(()=>{
    setDataStoraged(JSON.parse(localStorage.getItem('user')))
},[])
    return(
        <div className="container">
        <header className="row d-sm-flex justify-content-between">
            <div className="logo col-8 col-md-4 text-center ">
                <h2>Social Media</h2>
            </div>
            <div className="searche  d-none col-md-5 d-md-flex col-6 text-center">
                <img src={searcheImg} alt="" className="searcheImg"/>
                <input type="text" onFocus={()=>{hundleFocuse() }}  placeholder="searche for creator , inspiration and projects"/>
                {showSearchingBar ? (
                    <div className="searchingBar">
                    <ion-icon name="close-outline" onClick={(e) => { e.stopPropagation(); setShowSearchingBar(false); }}></ion-icon>
                   {users.map((user)=>{
                    const isFriend = user.friends.find((friend) => friend.user == dataStoraged._id )
                    return(
                    <div  className="serachePerson row container px-5 my-3 align-items-center">
                        <img src={`http://localhost:8000/${user.profileImg}`} alt="" className="col-2"/>
                        <Link to={`/profile/${user._id}`} className="serachePersonInformation col-8">
                            <p>{user.username}</p>
                           <p className="status">{isFriend ? "Ami(e)" : "Non ami(e)"}</p>
                        </Link>
                        {!isFriend? <button className="btn btn-info col-2" onClick={()=>{addFriend(user)}}>Add friend</button> :null}
                    </div>)
                })}
                   
                </div>):null}
            </div>
            <div className="header-rigth col-4 col-sm-3  text-center">
                <a href="#create" className="button">Create</a>
            </div>
        </header>
        </div>
    )
}
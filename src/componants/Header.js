import searcheImg  from "../imgs/search-interface-symbol.png"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';


export default function Header({theme , color}){
    const [showSearchingBar , setShowSearchingBar] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const [users , setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [dataStoraged , setDataStoraged] = useState({})
    const hundleFocuse = async () => {
        setShowSearchingBar(true);
    }
    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
        const filteredItems = users.filter((user) =>
        user?.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredItems)
        
      }
      useEffect(()=>{
        const fetchData=async()=>{
            
            try {
                const res = await axios.get("http://localhost:8000/getAllUsers",{
                    withCredentials: true,
                });
                setUsers(res.data);
                setFilteredUsers(res.data)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchData()
      },[])
    useEffect(()=>{
        setDataStoraged(JSON.parse(localStorage.getItem('user')))
},[])
return(
    <nav className={`${theme} ${color}`}>

    <div className="container" >
        <header className="row d-sm-flex justify-content-between" >
            <div className="logo col-8 col-md-4 text-center ">
                <h2>Social Media</h2>
            </div>
            <div className="searche  d-none col-md-5 d-md-flex col-6 text-center" >
                <img src={searcheImg} alt="" className="searcheImg"/>
                <input type="text"  onChange={handleInputChange} onFocus={()=>{hundleFocuse() }}  placeholder="searche for creator , inspiration and projects"/>
                {showSearchingBar ? (
                    <div className="searchingBar">
                    <ion-icon name="close-outline" onClick={(e) => { e.stopPropagation(); setShowSearchingBar(false); }}></ion-icon>
                   
                   {filteredUsers.map((user)=>{
                       const isFriend = user?.friends.find((friend) => friend.user === dataStoraged._id )
                       return(
                           <div  className="serachePerson container align-items-center" key={user?._id}>
                        <img src={`http://localhost:8000/${user?.profileImg}`} alt="" className=""/>
                        <Link to={`/profile/${user?._id}`} className="serachePersonInformation ">
                            <p>{user?.username}</p>
                           <small className="status">{isFriend ? "Ami(e)" : "Non ami(e)"}</small>
                        </Link>
                        
                    </div>)
                })}
                   
                </div>):null}
            </div>
            <div className="header-rigth col-4 col-sm-3  text-center">
                <a href="#create" className="button">Create</a>
            </div>
        </header>
        </div>
    </nav>
    )
}
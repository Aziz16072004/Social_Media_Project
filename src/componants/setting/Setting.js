import "./Setting.css"
import 'bootstrap/dist/css/bootstrap.css'
import React, { useRef } from 'react';
    
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
export default function Setting(){
    const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    setProfileImg(e.target.files[0]);
    setShowProfileImg(URL.createObjectURL(e.target.files[0]))

  };
  
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [validation, setValidation] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImg, setProfileImg] = useState(userData.profileImg);
  const [showProfileImg, setShowProfileImg] = useState("");
  

  const { id } = useParams();

  useEffect(() => {
    const getUserInformations = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/user/getUser/${id}`);
        setUserData(res.data);
        setUsername(res.data.username);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInformations();
  }, []);

  const hundleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('profileImg', profileImg);
    if (currentPassword === "" && newPassword === "") {
      formData.append('newPassword', userData.password);
    }
    else if (currentPassword !== "" &&  newPassword === ""){
    return setErrorMessage("new password should be full")
  }
    else if (currentPassword !== userData.password  &&  newPassword !== ""){
      return setErrorMessage("current Password is invalide")
  }
    else {
    setErrorMessage("")
    formData.append('newPassword', newPassword);
    try {
      const res = await axios.patch(`http://localhost:8000/user/updateUser/${id}`, formData);
      if(res.data){
        setValidation("saving data successfully")
      }
      setUserData(res.data);    
      localStorage.setItem("user",JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  };
    return(
        <form className="container-parametre" onSubmit={hundleSubmit}>
        <div className="container rounded bg-white">
        <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                
            <div className="profilepic" onClick={()=>{handleClick()}}>  
            <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
  <img className="profilepic__image" src={showProfileImg !== "" ?showProfileImg :`http://localhost:8000/${userData.profileImg}`} width="150" height="150" alt="Profibild" />
  <div className="profilepic__content">
  <ion-icon name="camera-outline"></ion-icon>

    <span className="profilepic__text">Edit Profile</span>
  </div>
</div>
<span className="font-weight-bold">{username}</span><span>{userData.email}</span><span> </span>
                
                
                </div>
        </div>
        <div className="col-md-5 border-right" >
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                    <p className="alert alert-danger" style={ErrorMessage.length > 0 ? { display: 'block' } : { display: 'none' }}>{ErrorMessage}</p>
                    <p className="alert alert-success" style={validation.length > 0 ? { display: 'block' } : { display: 'none' }}>{validation}</p>
                    <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value={username} onChange={(e)=>{setUsername(e.target.value)}}/></div>
                    
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" onChange={()=>{}} /></div>
    
                    <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" readOnly value={userData.email} onChange={()=>{}}/></div>
                    <div className="col-md-12"><label className="labels">current password</label><input type="password" className="form-control" placeholder="enter password" value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}}/></div>
                    <div className="col-md-12"><label className="labels">new password</label><input type="password" className="form-control" placeholder="enter password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/></div>
                    
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value="" onChange={()=>{}}/></div>
                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state" onChange={()=>{}}/></div>
                </div>
                <div className="mt-5 text-center"><input className="btn btn-primary profile-button" type="submit" value="Save Profile" onChange={()=>{}}/></div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br/>
                <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value="" onChange={()=>{}}/></div> <br/>
                <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value="" onChange={()=>{}}/></div>
            </div>
        </div>
    </div>
</div>
</form>

    )
}
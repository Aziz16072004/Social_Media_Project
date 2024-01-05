import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useParams } from "react-router-dom";

const UserNameChange = ({ newUserName, handleUserNameChange }) => {
  return (
    <>
      <label>New Username:</label>
      <input type="text" value={newUserName} onChange={handleUserNameChange} />
    </>
  );
};

const PasswordChange = ({ newPassword, handlePasswordChange }) => {
  return (
    <>
      <label>New Password:</label>
      <input type="text" value={newPassword} onChange={handlePasswordChange} />
    </>
  );
};

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getOneUser() {
      try {
        const res = await axios.get(`http://localhost:8000/home/profile/${id}`);
        setUser(res.data);
        setNewUserName(res.data.username || ""); 
        setNewPassword(res.data.password || ""); 
      } catch (error) {
        console.log(error);
      }
    }

    getOneUser();
  }, [change]);

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
    
      const res = await axios.patch(`http://localhost:8000/home/profile/${id}`, {username: newUserName ,password: newPassword });
      console.log(res.data);
      localStorage.setItem("user",JSON.stringify(res.data));
      setSuccessMessage(`Changes saved successfully`);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again. ");
    } finally {
    
      setChange(false);
    }
  };

  return (
    <div>
      {change ? (
        <div className="change">
         
          <div className="container">
          <button onClick={() => setChange(false)}>Exit X</button>
            <UserNameChange newUserName={newUserName} handleUserNameChange={handleUserNameChange} />
            <br />
            <br />
            <PasswordChange newPassword={newPassword} handlePasswordChange={handlePasswordChange} />
            
            <br />
            <br />
            <button onClick={() => setChange(false)}>
              Cancel
            </button>
            <button onClick={handleSaveChanges} >
              Save Password Changes
            </button>
            </div>
          </div>
       
      ) : null}

      <div>
        <h1>Fetching data...</h1>
        <div>
          <h2>
            Votre donner:{" "}
            <button onClick={() => setChange(true)}>
              Changer
            </button>
          </h2>
          <p>Email: {user && user.email}</p>
          <p>ID: {user && user._id}</p>
          <p>Password: {user && user.password}</p>
        </div>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Profile;

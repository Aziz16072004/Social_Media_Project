import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"
function Singup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("https://blushing-train-newt.cyclic.app/signup", {username, email, password});
      if (res.data === "existe") {
        alert("User already exists");
      } else if (res.data === "nonexiste") {
        alert("regitering successfuly")
        navigation("/");
      }
      if (res.status !== 200) {
        alert("Error: " + res.statusText);
        return;
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  }

  return (

    <div className="signup">
      <form action="POST" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

<fieldset>
  <legend><span className="number">1</span> Your basic info</legend>
  <label>Name:</label>
  <input type="text" onChange={(e)=> setUsername(e.target.value)}/>

  <label >Email:</label>
  <input type="email"  onChange={(e) => setEmail(e.target.value)}/>

  <label >Password:</label>
  <input type="password" onChange={(e) => setPassword(e.target.value)}/>
  
</fieldset>



<input type="submit" value="SignUp"/>
Or <Link to="/">Login page</Link>








        {/* old code  */}
       
        
      </form>
      </div>
  );
}

export default Singup;

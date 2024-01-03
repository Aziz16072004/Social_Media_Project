import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"
function Singup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    history("/Social_Media_Project" );
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
Or <Link to="/Social_Media_Project">Login page</Link>








        {/* old code  */}
       
        
      </form>
      </div>
  );
}

export default Singup;

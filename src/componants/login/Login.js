
  import { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import "./login.css"
import axios from "axios";
  function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const res = await axios.post("https://blushing-train-newt.cyclic.app/", { email, password });
        console.log(res);
        if (res.data.email === email &&  res.data.password === password ) {
          navigate("/home");
          localStorage.setItem("user",JSON.stringify(res.data));
          
          
        } 
        else if(res.data.email === email &&  res.data.password !== password )  {
          alert("check your password")
        }
        else if (res.data === "nonexiste") {
          alert("User has not registered");
          console.log(res.data);
        }
        else{
          alert("error")
        }
        
      } catch (error) {
        alert("Error");
        console.log(error);
      }
    }

    return (
      <div className="login">
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
          <p>
            email :<input type="email" onChange={(e) => setEmail(e.target.value)} />
          </p>
          <p>
            password : <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </p>
          <input type="submit" value="login" />
          Or <Link to="/signup">SignUp</Link>
        </form>
      </div>
    );
  }

  export default Login;

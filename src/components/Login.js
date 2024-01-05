  import axios from "axios";
  import { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";

  function Login() {
    const navigate = useNavigate(); // Use `navigate` instead of `history`
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const res = await axios.post("/", { email, password });

        if (res.data.email === email &&  res.data.password === password ) {
          navigate("/home", { state: { id: email } });
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


  import { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import "./login.css"
  function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
      e.preventDefault();
      navigate("/Social_Media_Project/home");
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
          Or <Link to="/Social_Media_Project/signup">SignUp</Link>
        </form>
      </div>
    );
  }

  export default Login;

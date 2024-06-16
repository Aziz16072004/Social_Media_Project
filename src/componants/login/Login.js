
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from 'js-cookie';

import * as yup from "yup" ;
function Login() {
    const navigate = useNavigate(); 
    const schema = yup.object().shape({
      email: yup.string().email("email invalide").required("Email required"),
      password: yup.string().required("Password required"),
    })
    
    const {register , handleSubmit, formState :{errors}} = useForm({
      resolver : yupResolver(schema) ,
    }) ;
    async function onSubmit(data) {
      try {
        const res = await axios.post(/*"https://blushing-train-newt.cyclic.app/"*/"http://localhost:8000/auth/signin",  {
          email: data.email,
          password: data.password
        });
        if (res.data.user.email === data.email &&  res.data.user.password === data.password ) {
          console.log(res);
          navigate("/home");
          localStorage.setItem("user",JSON.stringify(res.data.user));
          Cookies.set('jwt',res.data.token , { expires: 7 });
          
        } 
        else if(res.data.user.email === data.email &&  res.data.user.password !== data.password )  {
          alert("check your password")
        }
        else if (res.data.user === "nonexiste") {
          alert("User has not registered");
          console.log(res.data.user);
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
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <p className="errorMessage"> {errors.email?.message}</p>
          <p> email :<input type="email" {...register("email")}/>  </p>
          <p className="errorMessage"> {errors.password?.message}</p>
          <p> password : <input type="password" {...register("password")}/> </p>
          <input type="submit" value="login" />
          Or <Link to="/signup">SignUp</Link>
        </form>
      </div>
    );
  }

  export default Login;

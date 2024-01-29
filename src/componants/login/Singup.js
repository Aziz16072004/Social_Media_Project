import axios from "axios";
import { useForm } from "react-hook-form";

import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import "./login.css"

function Singup() {
  const navigation = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required("Name required"),
    email: yup.string().email("email invalide").required("Email required"),
    password: yup.string().required("Password required"),
  })
  
const {register , handleSubmit, formState :{errors}} = useForm({
  resolver : yupResolver(schema) ,
}) ;
async function onSubmit(data) {
  try {
    const res = await axios.post(/*"https://blushing-train-newt.cyclic.app/signup"*/"http://localhost:8000/signup", {
      username: data.username,
      email: data.email,
      password: data.password
    });

    if (res.data === "existe") {
      alert("User already exists");
    } else if (res.data === "nonexiste") {
      alert("Registering successfully");
      navigation("/");
    }

    if (res.status !== 200) {
      alert("Error: " + res.statusText);
    }
  } catch (error) {
    alert("Error");
    console.log(error);
  }
}

  return (

    <div className="signup">
      <form action="POST" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>

<fieldset>
  <legend><span className="number">1</span> Your basic info</legend>
  <label>Name:</label>
  <p className="errorMessage"> {errors.username?.message}</p>
  <input type="text" {...register("username")}/>

  <label >Email:</label>
  <p className="errorMessage"> {errors.email?.message}</p>
  <input type="email"   {...register("email")}/>

  <label >Password:</label>
  <p className="errorMessage"> {errors.password?.message}</p>
  <input type="password"  {...register("password")}/>
  
</fieldset>
      <input type="submit" value="SignUp"/>
      Or <Link to="/">Login page</Link>
      </form>
      </div>
  );
}

export default Singup;

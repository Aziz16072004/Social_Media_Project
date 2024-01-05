  import {Link } from "react-router-dom";
  import axios from "axios";
  import Rating from '@mui/material/Rating';
  import Stack from '@mui/material/Stack';
  import "../App.css";
  import car from "../imgs/car.jpg"
  import { useEffect, useState } from "react";


  function Login() {
    const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [productWidget, setProductWidget] = useState(false);
  const [productName, setProductName] = useState("");
  const [changeRate , setChangeRate] = useState(null)
  useEffect(() => {
    console.log("aaa");
    async function fetchData() {
      const storeUserData = JSON.parse(localStorage.getItem("user"));
      setUserData(storeUserData);
      try {
        const res = await axios.get("http://localhost:8000/home");
        setData(res.data);
      } catch (error) {
        console.log("Fetch Data Error:", error);
      }
    }
    
    fetchData();
  }, [changeRate]);
    return (
      
      <div className="HomePage">
        
        {productWidget ? (
          <div className="change">
          
          <div className="container">
          <form >
          <button>Exit X</button>
            <label>product name</label>
            <input type="text" onChange={(e)=>setProductName(e.target.value)}/> 
            <br />
            <br />
            <label>Select Image:</label>
          <input
            type="file"
            accept="image/*"
          
          />
          <div>
          
          </div>
            
            <br />
            <br />
            <button onClick={()=>{setProductWidget(false)}}>
              Cancel
            </button>
            <input type="submit" value="Save Product"/>
            </form>
            </div>
          </div>
          ):null

        } 
        <div>Profile :{userData && <Link to={`/home/profile/${userData._id}`}>Profile</Link>}</div>
        <h1>hello {userData && userData.email} and welcome to the Home</h1>
        <button className="addProduct" onClick={()=>{setProductWidget(true)}}>+</button>
      <div className="cardsContainer">
      { data.length > 0 ? (
          data.map((element, i) => (
              <div className="userCard" key={i}>
                  <img src={car} width={400} height={350} alt={element.productName} />
                  <h1>{element.productName}</h1>
                  <h3></h3>
                  <h1>AVERAGE ratings : {element.averageRating} </h1>
                  <Stack spacing={"1"}>

                  <Rating 
    name="half-rating" 
    defaultValue={1} 
    precision={0.5} 
    value={ element.ratings.some(rating => rating.idUser === userData._id) 
      ? element.ratings.find(rating => rating.idUser === userData._id).value 
      : 0}
    onChange={async (e) => { 

      const newRate = e.target.value;
      console.log(newRate);
      setChangeRate({ id: element._id, value: newRate });
      try {
        const res = await axios.post("http://localhost:8000/home", {
          productId: element._id,
          value: newRate,
          userId: userData._id
        });
        
          setData(prevData => prevData.map(item => 
            item._id === element._id ? { ...item, averageRating: res.data.averageRating } : item
          ));
        
        
      } catch (error) {
        console.log("Update Rating Error:", error);
      }
    }} 
  />

                  </Stack>
                  rate
              </div>
          ))
      ) : (
          <p>No products available.</p>
      )}
  </div>

      </div>
    );
  }

  export default Login;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
const GetImgs = () => {
    const [images, setImages] = useState([]);
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axios.get('http://localhost:8000/getImages');
          setImages(response.data); 
        } catch (error) {
          console.error('Error getting images:', error);
        }
      };
  
      fetchImages();
    }, []); 
  
    return (
      <div>
        <h1>All Images:</h1>
        <div>

        {images.map((ele, index) => {
  const imagePath = `http://localhost:3001/${ele.path.replace(/\\/g, '/')}`;
  
  return (
    <div key={index}>
      <img src={imagePath} alt={ele.name} />
      <p>{ele.name}</p>
    </div>
  );
})}
        </div>
      </div>
    );
  };
  
  export default GetImgs;
  
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import car from "./imgs/car.jpg"

export default function HalfRating() {
    const [rate , setRate] = React.useState(1)
  return (
    
    <div className='Product'>
      <div>
        <img src={car} width={400} height={350}/>
        <h1>Suzuji Fronx</h1>
      </div>
      <Stack spacing={1}>
        <Rating name="half-rating" value={rate} defaultValue={1} precision={rate} onChange={(e)=>{setRate(e.target.value)}} />
      </Stack>
    </div>
  );
}
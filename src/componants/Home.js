import { useEffect, useState } from 'react';
import Header from './Header';
import MainSection from './MainSection';
const Home = ({socket}) => {
    const [dataStoraged, setDataStoraged] = useState({});
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const storedData = localStorage.getItem('user');
                setDataStoraged(storedData)
                if (storedData) {
                    const newData = JSON.parse(storedData);
                    socket.emit('add-user', newData._id);
                    console.log(newData._id);
                } else {
                    console.warn('No user data found in local storage.');
                }
            } catch (error) {
                console.error('Error fetching or parsing data:', error);
            }
        };
        
        fetchData()
    },[dataStoraged])
    return (
        <>
            
            <Header/>
            <MainSection socket={socket}/>
        </>
    );
};

export default Home;

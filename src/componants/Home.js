import { useEffect, useState } from 'react';
import Header from './Header';
import MainSection from './MainSection';
const Home = ({socket ,theme ,updateSetShowTheme}) => {
    const [users, setUsers] = useState([]);
useEffect(() => {
  const handleGetUsers = (receivedUsers) => {
    setUsers(receivedUsers);
  };
  const storedData = localStorage.getItem('user');

  if (storedData && socket) {
    const newData = JSON.parse(storedData);

    socket.emit('add-user', newData._id);
    socket.on("getUsers", handleGetUsers);
  }

  return () => {
    if (socket) {
      socket.off("getUsers", handleGetUsers);
    }
  };
}, [socket]);


  
    return (
        <>
        
           
            <Header socket={socket}/>
            <MainSection socket={socket} theme={theme} users={users} updateSetShowTheme={updateSetShowTheme}/>
        </>
    );
};

export default Home;

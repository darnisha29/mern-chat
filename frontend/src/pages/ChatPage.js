import React, { useEffect,useState } from 'react';
import axios from "axios";



const ChatPage = () => {
  const  [chats,setChats] = useState([]);

    useEffect(() => {
      const fetchChats =async() => {
          const {data} = await axios.get('/api/chat');
          setChats(data);
          console.log(chats);
          
     }
        fetchChats();
        // console.log(state.datas)
    },[]);
  return (
    <div>{chats.map(chat => <div key={chat._id}>{chat.chatName}</div>)}</div>
  )
}

export default ChatPage

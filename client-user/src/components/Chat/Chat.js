import React, {useState, useEffect} from 'react';
import queryString from 'query-string'; //used to get data from URL
import io from "socket.io-client";

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import UserContainer from '../UserContainer/UserContainer';

import ScrollToBottom from 'react-scroll-to-bottom';


let socket;

const Chat = ({location}) => {
  const [name,setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:8000'

  useEffect(()=>{
    const {name, room} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join',{name, room}, (error)=>{
      if(error) {
              alert(error);
      }
    }) //to send an event - join is event name and the values of name and room
    //are sent to backend

    return ()=>{
      socket.emit('disconnect');
      socket.off();
    }
  },[ENDPOINT,location.search]);

  //to update messages array whenever a message is sent by admin or user
  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages([...messages, message]);
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  }, [messages]);

  //function for sending messages
  const sendMessage = (event)=>{

    //to prevent refresh when we press key
    event.preventDefault();

    if(message){
      socket.emit('sendMessage',message, ()=> setMessage(''));
    }
  }

  return (
    <div>


    <div className="outer">
    <div className="chat-container">
      <div className="search-container">
        <h1><img className="logo" src="https://image.flaticon.com/icons/svg/2950/2950581.svg" alt="logo"/>ChatGram</h1>
      </div>

      <div className="conversation-list">
        <UserContainer users={users}/>
      </div>

      <div className="new-message-container">

      </div>

      <div className="chat-title">
        <InfoBar room={room} />
      </div>

      <ScrollToBottom className="chat-message-list">
        <Messages messages={messages} name={name} />
      </ScrollToBottom>

      <div className="chat-form">
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>

    </div>

    </div>
    </div>
  )
}

export default Chat;

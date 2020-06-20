import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage})=>(
  <form className="form">
    <input className="input" type="text" placeholder="Type message ..."
    value={message}
    onChange={(event)=> setMessage(event.target.value)}
    onKeyPress={(event)=> event.key === 'Enter' ? sendMessage(event):null}
    />
    <button className="sendButton" onClick={(event)=> sendMessage(event)}>Send<img className="send-icon" src="https://image.flaticon.com/icons/png/512/2948/2948170.png" alt="send" /></button>
  </form>
)

export default Input;

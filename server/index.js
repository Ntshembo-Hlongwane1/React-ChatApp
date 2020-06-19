const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUsersOfRoom} = require('./users.js')

const PORT = process.env.PORT || 8000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{
  socket.on('join',({name, room},callback)=>{
    const {error, user} = addUser({id:socket.id, name, room});

    if(error)
      return callback(error);

    //admin generated messages are called 'message'
    //welcome message for user
    socket.emit('message',{user:"admin",text:`${user.name}, welcome to the room ${user.room}`})

    //message to all the users of that room except the newly joined user
    socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});

    socket.join(user.room);

    callback();
  })

  //user generated message are called 'sendMessage'
  socket.on('sendMessage',() => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message',{user:user.name, text:message});

    callback();
  })

  socket.on('disconnect',()=>{
    console.log("User had Left !");
  })
})

app.use(router);

server.listen(PORT, ()=>{
  console.log(`Server Started on PORT ${PORT}`)
})

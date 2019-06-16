var express = require('express');
var socket = require('socket.io');
var path = require('path');

//App setup
var app = express();
const filePath = path.join(__dirname, 'index.html');
var server = app.use(express.static('.'),(req, res) => res.sendFile(filePath))
.listen(4000, function(){
  console.log('listening to port 4000');
});

//Static files
//app.use((req, res) => {
//  const htmlPath = path.join(__dirname, 'index.html');
//  const chatPath = path.join(__dirname, 'chat.js');
//  const javascriptPath = path.join(__dirname, 'index.js');
//  const stylesPath = path.join(__dirname, 'styles.css');
//  res.sendFile(htmlPath);
//  res.sendFile(chatPath);
//  res.sendFile(javascriptPath);
//  res.sendFile(stylesPath);
//  return
//})
//Socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection', socket.id);
  console.log('I MADE IT TO THE CLIENT')

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
});

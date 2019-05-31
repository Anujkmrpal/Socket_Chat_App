var express = require('express');
var path =require('path');
var app=express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port=8000;

var user=[];
app.use(express.static(path.join(__dirname,'public')));

io.on("connection",function(socket){
    console.log("new connection made");

    // Join private room
    socket.on('join-private',function(data){
        socket.join('private');
    })

    // Join group chat
    socket.on('private-chat',function(data){
        socket.broadcast.to('private').emit('show-message',data.meaage);
    })

    // show all users when first logged on
    socket.on('get-users',function(){
        socket.emit('all-users',user);
    })

// when new socket joins
    socket.on('join',function(data){
    
        socket.nickName=data.nickName;
        user[socket.nickName]=socket;
        var userObj={
            nickName:data.nickName,
            socketId:socket.id
        }
        user.push(userObj);
        io.emit('all-users',user);
    });

    socket.on('send-message',function(data){
        // socket.broadcast.emit("message-received",data);
        io.emit("message-received",data);
    });


    // like 
    socket.on('send-like',function(data){
        console.log(data);
        socket.broadcast.to(data.like).emit('user-liked',data);
    })


    // disconnection
    socket.on('disconnect',function(){
        var users=user.filter(function(item){
            return item.nickName!==socket.nickName;
        })
        io.emit("all-users",users);
    })
});


server.listen(port,()=>{
    console.log("listening on port "+port);
})
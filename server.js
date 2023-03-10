const express = require('express');
const app = express();

app.use(express.static(__dirname+"/public"));
const http = require('http').createServer(app);


http.listen(3000,()=>{
    console.log("server is started on port 3000");
})

app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
})

const io = require('socket.io')(http);

io.on('connection',socket =>{
    console.log("connected");

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})
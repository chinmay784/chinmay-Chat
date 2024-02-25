const Server = require("socket.io")
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io =  Server(server,{
    cors:{
        origin:['http://localhost:3000'],
        methods:["GET,POST"]
    }
})

const getReciversocketId = (reciverId) =>{
    return userSocketmap[reciverId]
}


const userSocketmap = {};



io.on('connection',(socket) =>{
    console.log(" a user connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != "undefind"){
        userSocketmap[userId]= socket.id;
    }

    io.emit("getOnlineUsers",Object.keys(userSocketmap));


    socket.on("disconnected", () =>{
        console.log("user disconnect",socket.id)
        delete userSocketmap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketmap));
    })
})

module.exports= {app,io,server,getReciversocketId};
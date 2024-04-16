const express = require("express");
const cookieparser = require("cookie-parser")
const path = require("path")
const cors = require("cors")
const authRoute = require("./routes/auth_route");
const messageRoute = require("./routes/messageRoute");
const userroute = require("./routes/userRoutes")
const connectTOmongoDB = require("./db/connectDB");
const { app, server } = require("./sockets/socket");
require("dotenv").config();
const port = process.env.PORT || 4000;





app.use(express.json());
app.use(cookieparser());

app.use(cors(
    {
     origin:["https://chinmay-chat-frontend.vercel.app/"] ,
     methods:["POST","GET"],
     credentials:true,

    }
));

app.get("/",(req,res) =>{
    res.json("Hello")
})

app.use("/api/auth",authRoute);
app.use("/api/messages",messageRoute);
app.use("/api/users",userroute);

const __dirname1 = path.resolve()

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname1, '/frontend/dist')));

//     app.get("*", (req, res) => {
// 	  res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
//    });
// }

server.listen(port,() =>{
    connectTOmongoDB();
    console.log(`server is running in ${port}`);
})

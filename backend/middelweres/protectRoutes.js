const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const JWT_SECRET = 'jijigijijt';


exports.protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        

        if(!token){
            return res.status(401).json({
                error:"Unothorised - No token provide"
            })
        }

        const decode = jwt.verify(token,JWT_SECRET );

        if(!decode){
            return res.status(401).json({
                error:"Invalid token"
            })
        }


        const user = await User.findById(decode.userId).select("-password");


        if(!user){
            return res.status(401).json({
                error:"User not found"
            })
        }


        req.user= user;


        next();

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
}




const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken")
const JWT_SECRET = 'jijigijijt';

exports.signup = async (req,res) =>{
    try {
        const {fullName ,userName, password,confrimpassword,gender} = req.body;


        if(!fullName || !userName || !password || !gender){
            return res.status(400).json({
                sucess:false,
                error:"Please provide all details"
            })
        }


        if(password !== confrimpassword){
            return res.status(400).json({
                sucess:false,
                error:"password and confrimpassword not match"
            })
        }


        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({
                sucess:false,
                error:"user already exist"  
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);
		// console.log(hashedPassword);
		console.log("hellllooo")
        
        // https://avatar.iran.liara.run/public/boy

        // const boyProfilepic = `https://avatar.iran.run/public/boy/username${userName}`;
        // const girlprofilepic = `https://avatar.iran.run/public/girl/username${userName}`;


        const boyProfilepic = `https://avatar.iran.liara.run/public/boy`;
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl`;


        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilepic: gender === "male"? boyProfilepic :girlprofilepic
        });


        if(newUser){

            generateToken(newUser._id,res)

            await newUser.save();
            res.status(201).json({
                _id:userName._id,
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilepic:newUser.profilepic,
                sucess:true,
                message:"User Created"
            })
        }else{
            return res.status(400).json({
                sucess:false,
                error:"Invalid User Data"  
            })
        }



    } catch (error) {
        console.log("error in signup controller",error.message);

        return res.status(500).json({
            sucess:false,
            message:"error in signup controller"
        })
    }
}


exports.login = async (req,res) =>{
    try {
        const {userName,password} = req.body;
        console.log(userName)

        if(!userName || !password){
            return res.status(400).json({
                sucess:false,
                error:"provide all filds"
            })
        }

        const user = await User.findOne({userName});
        console.log(user,"fhgdfjghfdjghfd")

        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");


        if(!user || !isPasswordCorrect){
            return res.status(400).json({
                sucess:false,
                error:"Invalid UserName or Password"
            })
        }


        generateToken(user._id,res)

        

        if(user){
            return res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                userName:user.userName,
                profilepic:user.profilepic,
                sucess:true,
                message:"User login Sucessfully"
            })
        }        
    } catch (error) {
        console.log("error in login controller",error.message);

        return res.status(500).json({
            sucess:false,
            message:"error in login controller"
        })
    }
}


exports.logout = async (req,res) =>{
    try {
        
        res.cookie("jwt","",{
            maxAge:0
        })

        res.status(200).json({
            sucess:true,
            message:"logout Sucessfully",
        })


    } catch (error) {
        console.log("error in logout controller",error.message);

        return res.status(500).json({
            sucess:false,
            error:"error in logout controller"
        })
    }
}
const User = require("../models/userModel");

exports.getUserForSidebar = async (req,res) =>{
    try {
        const logInUserId = req.user._id;

        const filterUsers = await User.find({
            _id : { $ne : logInUserId}
        }).select("-password")
        


        return res.status(500).json(filterUsers)

     
        
    } catch (error) {
        console.log("error in User controller",error.message);

        return res.status(500).json({
            sucess:false,
            message:error.message,
        })
    }
}
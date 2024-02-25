const mongoose = require("mongoose");


const conversatationSchema = new mongoose.Schema({
    particepents : [{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",  
    }],
    messages :[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Message", 
        default:[],
    }]
},{timestamps:true})



const Conversatation = mongoose.model("Conversatation",conversatationSchema);

module.exports = Conversatation


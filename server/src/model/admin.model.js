const mongoose = require("mongoose");

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    admin_key:{
        type:String,
        required:true,
        unique:true,
        minlength:[8,"Admin key must be at least 8 characters long"]
    },
    admin_pin:{
        type:Number,
        required:true,unique:true,
        minlength:[6,"Admin pin must be at  6 characters long"],
        maxlength:[6,"Admin pin must be at  6 characters long"]
    }
})

module.exports=mongoose.model("Admin",adminSchema);
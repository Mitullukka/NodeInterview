import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true

    },
    password:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);
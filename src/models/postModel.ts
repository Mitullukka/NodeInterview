import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },

},{timestamps:true});

module.exports = mongoose.model('Post',postSchema) 
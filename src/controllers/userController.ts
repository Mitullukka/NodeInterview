import { Request,Response } from "express";

const User = require('../models/userModel');


async function register(req:Request,res:Response) {
 try{
    const { name,mobile,email,password,image } = req.body

    const user = new User({
        name,
        mobile,
        email,
        password,
        image
    })
    
    await user.save();

    res.status(200).json({message:"Resgister succesfully",user});
 }catch(e){
    console.log(e);    
 }    
}

async function loginUser(req:Request,res:Response) {
    try{
        const { email,password } = req.body
        console.log(req.body);
        

    const user = await User.findOne({email:email,password:password});

    if(!user){
        return res.status(400).json({message:"Invalid"})
    }

    return res.status(200).json({message:"Login sucessfully",user:user})
}catch(e){
    console.log(e);        
}
}


export default {
    register,
    loginUser
}
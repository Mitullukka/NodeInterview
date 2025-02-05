import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

const User = require('../models/userModel');
const Post = require('../models/postModel');
const config = require("config");

const bcrypt = require("bcryptjs")


async function register(req: Request, res: Response) {
    try {
        const { name, phone, email, password, image } = req.body

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            phone,
            email,
            password: hashedPassword,
            image
        })

        await user.save();

        res.status(200).json({ message: "Register succesfully", user });
    } catch (e) {
        console.log(e);
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        const passwordMatch = await bcrypt.compare(password,user.password)
        
        if(!passwordMatch){
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign({userId:user._id},config.get('JWT_ACCESS_SECRET'),{
            expiresIn:'1h'
        }); 

        return res.status(200).json({ message: "Login sucessfully", user: user,token })
    } catch (e) {
        console.log(e);
    }
}

async function createPost(req:any,res:Response){
    try{
        const {title,description} = req.body
        const userId = req.user.userId;
                
        const post = new Post({
            userId,
            title,
            description
        })    

        await post.save();

        return res.status(200).json({message:"Post stored"});
    }catch(e){
        console.log(e);        
    }
}


async function getPost(req:any,res:Response) {
    try{
        const userId = req.user.userId;
        
        const post = await Post.find({userId});

        return res.status(200).json({post})
    }catch(e){

    }
}

async function deletePost(req:Request,res:Response){
    try{
        const {postId} = req.body

        const post = await Post.findByIdAndDelete({_id:postId});

        return res.status(200).json({message:"Delete sucessfully"});
    }catch(e){
        console.log(e);        
    }
}



export default {
    register,
    loginUser,
    createPost,
    getPost,
    deletePost
}
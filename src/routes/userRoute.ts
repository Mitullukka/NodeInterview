const express = require("express");
import mongoose from "mongoose";
import userController from "../controllers/userController";
import { authMiddleware } from "../middelwares/jwtData";

const {validateRegister} = require("../validation");


const router = express.Router();


router.post('/register',validateRegister,userController.register);
router.post('/login',userController.loginUser);

router.post('/create-post',authMiddleware,userController.createPost);
router.get('/get-post',authMiddleware,userController.getPost);
router.post('/delete-post',authMiddleware,userController.deletePost);




module.exports = router;

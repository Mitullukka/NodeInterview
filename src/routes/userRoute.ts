const express = require("express");
import mongoose from "mongoose";
import userController from "../controllers/userController";

const router = express.Router();


router.post('/register',userController.register);
router.post('/login',userController.loginUser);



module.exports = router;

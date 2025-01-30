import mongoose from "mongoose";
const express = require("express")
const config = require("config")

const app = express();
const userRouter = require('./routes/userRoute')
const PORT = 3000

app.use(express.json())
app.use('/api/',userRouter)

app.listen(PORT,()=>{
    console.log(`[NodeJs server]:Server is running on http://localhost:${PORT}`)
    mongoose.connect(config.get("DB_CONN_STRING")).
    then(()=>console.log('mongoose connected')).catch((err)=>console.log(err));
})
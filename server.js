import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const PORT = 3000;
import CourseRoutes from './routes/ProjectRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MongoDB connected successfully!");
}).
catch((error)=>{
    console.log(error);
})
    
app.use("/projects",CourseRoutes);

app.get("/",async(req,res)=>{
    res.send("Server running!")
});

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
});

import express from 'express';
const router=express.Router();
import ProjectModel from '../models/ProjectModel.js';

router.post("/",async(req,res)=>{
    try {
        const data=req.body;
        await ProjectModel.create(data);
        res.status(201).json(ProjectModel);
    } catch (error) {
        console.log("error",error);
    }
})

router.get("/getprojects",async(req,res)=>{
    try {

        const data = await ProjectModel.find();
        res.json(data);
        
    } catch (error) {
        console.log("error",error)
    }

})

export default router;
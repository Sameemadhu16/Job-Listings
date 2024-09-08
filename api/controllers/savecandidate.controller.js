import mongoose from "mongoose";
import resp from "../models/savecandidate.js"

export const applyForJob  = async(req,res,next)=>{
    const {posterId,seekerId,postId,response,name,address,age,nic,email} = req.body;
    try {
        const application = new resp({
            posterId,seekerId,postId,response,name,address,age,nic,email
        }
        )
        const savedApplication = await application.save();
        res.send(200).json({savedApplication});
    } catch (error) {
        next(error)
    }
}

export const allApplications = async (req, res, next) => {
    try {
      const allApplicants = await resp.find({});
      res.status(200).json({ allApplicants });
    } catch (error) {
      next(error);
    }
  };
  

export const findApplicant = async(req,res,next)=>{
    const seekerId = req.params;
    try{
        const seeker = await resp.find(seekerId);
        res.status(200).json({seeker});
    }catch(error){
        next(error)
    }
}




export const createposterresponse  = async(req,res,next)=>{
    
    try {
        const posterresponse = await response.findByIdAndUpdate(
            req.params.postId,req.params.userId,
            
            {
                $set:{
                    posterresponse:req.body.posterresponse,
                }
            }
    
        )
        res.status(200).json(updatePost)
    } catch (error) {
        next(error)
    }
}

export const getposterresponse  = async(req,res,next)=>{
    try {
        const posterresponse = await response.findById(
            req.params.postId,req.params.userId,  
        )
        const res1 = await response.find()

        res.status(200).json({
            res1
        })
    } catch (error) {
        next(error)
    }
}

export const getseekerresponse  = async(req,res,next)=>{
    try {
        const seekerresponse = await response.findById(
            req.params.postId,req.params.userId,  
        )
        const res2 = await response.find()

        res.status(200).json({
            res2
        })
    } catch (error) {
        next(error)
    }
}
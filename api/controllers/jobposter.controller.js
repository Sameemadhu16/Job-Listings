import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getJobPosters = async (req,res,next) =>{


    //check jobposter true or false
    
    
    if(!req.role==="jobposter"){
        return next(errorHandler(403, 'you are not allowed to see all user'));
    }
    try {
        const jobposter = await User.find({ role: 'jobPoster' })

        const usersWithoutPassword = jobposter.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
          });

          const totalUsers = await User.countDocuments({ role: 'jobPoster' });

          res.status(200).json({
            jobposter: usersWithoutPassword,
            totalUsers,
        });
        
    } catch (error) {
        next(error)
    }
}


export const updateJobpoter = async(req,res,next)=>{

    console.log(req.body)
}
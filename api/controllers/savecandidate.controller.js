import response from "../models/savecandidate.js"

export const createseekerresponse  = async(req,res,next)=>{
    try {
        const seekerresponse = await response.findById(
            req.params.postId,req.params.userId,
            
            {
                $set:{
                    response:req.body.response,
                }
            }
        )
    } catch (error) {
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
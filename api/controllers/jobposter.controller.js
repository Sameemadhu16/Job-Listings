export const getJobPosters = async (req,res,next) =>{


    //check jobposter true or false
    
    
    if(!req.user.isJobposter){
        return next();
    }
    try {

        
        
    } catch (error) {
        
    }
}
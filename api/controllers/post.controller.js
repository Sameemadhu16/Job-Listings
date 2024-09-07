import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async(req,res,next) => {
    
    try{

        const {
            title,
            venue,
            date,
            sTime,
            eTime,
            salary,
            members,
            gender,
            type,
            description,
            companyName,
            companyLink,
            companyEmail,
            essential,
            requirement,
            image,
            number
        } = req.body;
        const userId = req.user.id;

        
            

        // Create a new post
        const newPost = new Post({
            userId,
            title,
            venue,
            date,
            sTime,
            eTime,
            salary,
            members,
            gender,
            type,
            companyEmail,
            companyLink,
            companyName,
            requirement,
            essential,
            description,
            image,
            number,
            createdBy: req.user._id  // Associate the post with the user who created it
        });
  
        // Save the post to the database
        const savedPost = await newPost.save();

        // Return a success response with the created post
        res.status(201).json({
        message: 'Post created successfully',
        post: savedPost
      });

    }catch(error){
        // Handle any server or database errors
        return next(error);
    }
}

export const updatePost = async(req,res,next) => {
    
    if(req.user.id !==req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this post'))
    }

    try{
        const updatePost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set:{
                    title:req.body.title,
                    venue:req.body.venue,
                    date:req.body.date,
                    sTime:req.body.sTime,
                    eTime : req.body.eTime,
                    salary:req.body.salary,
                    members:req.body.members,
                    gender:req.body.gender,
                    companyName:req.body.companyName,
                    companyEmail:req.body.companyEmail,
                    companyLink:req.body.companyLink,
                    description:req.body.description,
                    essential:req.body.essential,
                    requirement:req.body.requirement,
                    image:req.body.image
                }
            },{new:true}
        )
        res.status(200).json(updatePost)
    }catch(error){
        next(error);
    }
}

export const deletePost = async(req,res,next) => {

    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete this post'))
    }

    try{
        const deletePost = await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('This post has been deleted');
    }catch(error){
        next(error);
    }
}

export const getPosts = async  (req,res,next) => {
    
    try{
        const totalPosts = await Post.countDocuments();
        const posts = await Post.find().sort({createdAt: -1})

        res.status(200).json({
            totalPosts,
            posts
        })
    }catch (error) {
        next(error);
    }
};

export const getpostForUser = async(req,res,next)=>{
    
    try {
        const  userId  = req.user.id;
        
        const allPost = await Post.find({userId});
        const count = await Post.countDocuments({userId});

        res.status(200).json({ allPost,count });

    } 
    catch (error) {
        next(error);
    }
}

export const getPostById = async (req, res, next) => {
    try {
      const postId = req.params.postId // Get the postId from the request parameters
    
      const post = await Post.findById(postId); // Find the post by its ID
    
    if (!post) {
        return res.status(404).json({ message: 'Post not found' }); // Handle case where post is not found
    }

      res.status(200).json(post); // Respond with the post data
    } 
    catch (error) {
      next(error); // Pass any errors to the error handler middleware
    }
  };
  
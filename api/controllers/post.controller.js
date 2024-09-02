import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async(req,res,next) => {
    
    if(req.user.role === "jobPoster"){

        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-');
        const newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.id,
    });

        try{
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        }catch(error){
            next(error);
        }
    }else {
        return next(errorHandler(403,'You are not allowed to create a post'));
    }
}

export const updatePost = async(req,res,next) => {
    console.log(req.user);
    if(req.user.id !==req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this post'))
    }

    try{
        const updatePost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set:{
                    title:req.body.title,
                    essential:req.body.essential,
                    selectType:req.body.selectType,
                    description:req.body.description
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
        const { userId } = req.params;
        //console.log(userId);
        const allpost = await Post.find({userId});
        const count = await Post.countDocuments({userId});

        res.status(200).json({ allpost,count });

    } 
    catch (error) {
        next(error);
    }
}
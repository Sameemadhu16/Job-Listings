import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async(req,res,next) => {
    if(!req.body.essential){
        return next(errorHandler(400,'You are not allowed to create a post'))
    }

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
                    essential:req.body.title,
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
        
        res.status(200).json({
            totalPosts,
        })
    }catch (error) {
        next(error);
    }
};
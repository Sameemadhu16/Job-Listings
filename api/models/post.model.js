import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        title:{
            required:true,
            type:String,
            unique:true
        },
        essential:{
            type:String
        },
        selectType:{
            type:String
        },
        description:{
            type:String,
        },
        companyName:{
            type:String,
            required:true
        },
        image:{
            type:String,
            default:'https://www.shutterstock.com/image-photo/work-time-art-collage-female-260nw-2361102709.jpg'
        }

    },{timestamps:true}
);

const Post = mongoose.model('Post',postSchema);
export default Post
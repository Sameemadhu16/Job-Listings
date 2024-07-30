import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
    {
        /*userId:{
            type:String,
            required:true
        },*/
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
        }

    },{timestamps:true}
);

const Post = mongoose.model('Post',postSchema);
export default Post
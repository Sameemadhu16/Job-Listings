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
        },
        
        type:{
            type:String
        },
        venue:{
            type:String
        },
        date:{
            type:Date
        },
        sTime :{
            type:String
        },
        eTime:{
            type:String
        },
        salary:{
            type:String
        },
        members:{
            type:Number
        },
        gender:{
            type:String
        },
        description:{
            type:String,
        },
        companyName:{
            type:String,
            
        },
        image:{
            type:String,
            default:'https://www.shutterstock.com/image-photo/work-time-art-collage-female-260nw-2361102709.jpg'
        }

    },{timestamps:true}
);

const Post = mongoose.model('Post',postSchema);
export default Post
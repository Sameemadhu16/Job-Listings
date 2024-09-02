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
        date:{
            type:Date
        },
        startTime :{
            type:String
        },
        endTime:{
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

const Post = mongoose.model('Job',postSchema);
export default Post
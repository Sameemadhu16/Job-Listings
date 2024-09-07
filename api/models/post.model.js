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
        essential:{
            type:String
        },
        requirement:{
            type:String
        },
        companyLink:{
            type:String
        },
        companyEmail:{
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
            default:'https://sebringohio.net/wp-content/uploads/2021/03/job_posting.jpg'
        },
        number:{
            type:String,
        }

    },{timestamps:true}
);

const Post = mongoose.model('Post',postSchema);
export default Post
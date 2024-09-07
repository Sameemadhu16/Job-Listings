import mongoose from "mongoose";

const responseScheme = new mongoose.Schema({
        posterId:{
            type:String,
            required: true,
           
        },
        seekerId:{
            type:String,
            required: true,
        },
        postId:{
            type:String,
            required:true,
        },
        response:{
            type:String,
            required:false,
           
        },
        



},
{ timestamps: true }
);
const response = mongoose.model("response", responseScheme);
export default response;
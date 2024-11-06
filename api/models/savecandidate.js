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
        name:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:false,
           
        },
        age:{
            type:String,
            required:false,
           
        },
        nic:{
            type:String,
            required:false,
           
        },
        email:{
            type:String,
            required:false,
           
        },
        



},
{ timestamps: true }
);
const resp = mongoose.model("resp", responseScheme);
export default resp;
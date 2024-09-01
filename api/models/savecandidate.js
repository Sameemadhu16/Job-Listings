import mongoose from "mongoose";

const candidateScheme = new mongoose.Schema({
        posterId:{
            type:String,
            required: true,
           
        },
        seekerId:{
            type:String,
            required: true,
        }



},
{ timestamps: true }
);
const Savecandidate = mongoose.model("Savecandidate", candidateScheme);
export default Savecandidate;
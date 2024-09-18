import mongoose from "mongoose";

const messageShema = new mongoose.Schema(

    {
        reciveId:{
            type:String,
            require:true
        },

        sendId:{
            type:String,
            require:true
        },

        postId:{
            type:String,
            require:true
        },

        message:{
            type:String,
        },
        file:{
            type:String,
        }
    },{timestamps:true}
);

const Message = mongoose.model('Message',messageShema);
export default Message;
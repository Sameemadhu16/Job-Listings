import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";

export const createMessage = async(req,res,next)=>{
    console.log(req.body);
    
    try{
        const {message,sendId , reciveId , postId } = req.body;
        const newMessage = new Message({
            message,
            sendId,
            reciveId,
            postId
        });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            message:'Message created',
            message:savedMessage
        })
    }catch(error){
        return next(error)
    }
}

export const getMessage = async (req, res, next) => {
    try {
        // Get sender and receiver IDs (ensure correct IDs are used)
        const sendId = req.user.id; // assuming this is the logged-in user's ID
        const receiveId = req.params.receiveId || req.body.receiveId; // get receiver's ID from params or body

        // Fetch messages concurrently using Promise.all()
        const [sendMessages, receiveMessages] = await Promise.all([
            Message.find({ sendId, receiveId }), // Messages sent by the current user
            Message.find({ sendId: receiveId, receiveId: sendId }) // Messages received by the current user
        ]);

        // Return the messages
        res.status(200).json({
            success: true,
            sendMessages,  // Sent messages
            receiveMessages // Received messages
        });

    } catch (error) {
        next(error); // Handle error via middleware
    }
};

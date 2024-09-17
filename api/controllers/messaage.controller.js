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
        const userId = req.user.id; // assuming req.user.id is the authenticated user's ID
        const postId = req.params.postId; // correctly extract postId from req.params

        // Fetch messages where the user is either the sender or receiver
        const messages = await Message.find({
            postId,
            $or: [{ sendId: userId }, { reciveId: userId }]
        });

        // const sendMessages = messages.filter(message => message.sendId === userId)
        // const reciveMessages = messages.filter(message => message.reciveId === userId)

        // Return the found messages as a response
        return res.status(200).json({
            messages
        });

    } catch (error) {
        next(error); // Handle error via middleware
    }
};


import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";

export const createMessage = async(req,res,next)=>{
    
    try{
        const {message,sendId , reciveId , postId , file , image } = req.body;
        const newMessage = new Message({
            message,
            sendId,
            reciveId,
            postId,
            file,
            image
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
export const getReciveMessage = async (req, res, next) => {
    try {
        const reciveId = req.user.id;

        // Use aggregation to group messages by `sendId` and `postId`
        const rMessages = await Message.aggregate([
            { 
                $match: { reciveId } // Match messages for the specific recipient
            },
            {
                $group: {
                    _id: {
                        sendId: "$sendId",   // Group by sendId
                        postId: "$postId"    // Include postId in _id
                    },
                    messages: { 
                        $push: {
                            message: "$message",      // Push relevant message data
                            createdAt: "$createdAt",  // Include the createdAt field
                            updatedAt: "$updatedAt"   // Include the updatedAt field
                        } 
                    }
                }
            },
            {
                $project: {
                    _id: 0,                       // Remove _id from output
                    sendId: "$_id.sendId",         // Output sendId
                    postId: "$_id.postId",         // Output postId
                    messages: 1                   // Output the messages array
                }
            }
        ]);

        // Map the aggregated messages into an array structure to send to the frontend
        const groupedMessages = rMessages.map(group => ({
            sendId: group.sendId,
            postId: group.postId,
            messages: group.messages
        }));

        return res.status(200).json({
            receivedMessages: groupedMessages
        });

    } catch (error) {
        next(error);
    }
};

export const getPosterMessage = async (req, res, next) => {
    try {
        const reciveId = req.user.id;
        const postId = req.params.postId;
        const sendId = req.params.sendId;

        // Fetch messages where either the sender or receiver matches the user IDs and the postId matches
        const messages = await Message.find({
            postId: postId,
            $or: [
                { sendId: sendId, reciveId: reciveId },
                { sendId: reciveId, reciveId: sendId }
            ]
        });

        return res.status(200).json({
            messages
        });

    } catch (error) {
        next(error);
    }
};

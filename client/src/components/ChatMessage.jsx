import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatMessage = ({ message }) => {

    const navigate = useNavigate();

    const Navigate = () => {
        navigate(`/chatbox?id=${message.postId}`)
    }
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer" onClick={Navigate}>
            <div className="flex items-center space-x-4">
                {/* <img 
                src={image} 
                alt={`${name}'s avatar`} 
                className="w-12 h-12 rounded-full object-cover"
                /> */}
                <div>
                <div className="flex items-center">
                    <span className="font-semibold text-gray-800">name</span>
                    <span className="text-xs text-gray-500 ml-2">{new Date(message.createdAt).toLocaleDateString()}</span>
                    <span className="text-xs text-gray-500 ml-2">{new Date(message.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-gray-600">{message.message}</p>
                </div>
            </div>
            <div className="relative">
                {/* {unreadCount > 0 && (
                <div className="w-6 h-6 flex items-center justify-center text-white text-sm bg-red-500 rounded-full">
                    unreadCount
                </div>
                )} */}
            </div>
            </div>
        );
};

export default ChatMessage;

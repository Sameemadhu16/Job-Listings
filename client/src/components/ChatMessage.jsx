import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const ChatMessage = ({ message }) => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user);
    const [post, setPost] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(true); // Set initial loading state

    const handleNavigate = () => {
        if (currentUser && currentUser.currentUser) {
            const { role } = currentUser.currentUser;
            const { postId } = message;
            const sendId = message.sendId; // Ensure sendId is available in the message
    
            // Ensure role and postId are valid
            if (role && postId) {
                if (role === 'jobSeeker') {
                    navigate(`/chatbox?id=${postId}`);
                } else {
                    navigate(`/poster-chat-box/${postId}/${sendId}`);
                }
            } else {
                console.error('Invalid user role or postId');
            }
        } else {
            console.error('currentUser or currentUser.currentUser is undefined');
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            if (message && message.postId) {
                try {
                    const res = await fetch(`/api/post/get-job/${message.postId}`);
                    const data = await res.json();
                    if (res.ok) {
                        setPost(data);
                    } else {
                        console.error('Failed to fetch post', data);
                    }
                } catch (error) {
                    console.error('Error fetching post', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPost();
    }, [message.postId]);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (!post) {
        return <div>No post data available</div>; // Handle case where post data is not available
    }

    const lastMessage = message.messages[message.messages.length - 1];

    return (
        <div
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-150"
            onClick={handleNavigate}
        >
            <div className="flex items-center space-x-4">
                <img
                    src={post.image}
                    alt={`${post.title}'s avatar`} // Use post.title here
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-800 dark:text-white">{post.title}</span>
                        <span className="text-xs text-gray-500 dark:text-slate-200 ml-2">
                            {new Date(lastMessage.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-slate-200 ml-2">
                            {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-100">{lastMessage.message}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;

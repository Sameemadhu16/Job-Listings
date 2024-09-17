import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, TextInput, Label } from 'flowbite-react';
import { FiSend, FiHash } from 'react-icons/fi'; // React icons for hash and send button
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';

export default function Chat() {

    const currentUser = useSelector(state => state.user);
    const [message, setMessage] = useState('');
    const [publishError, setPublishError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get('id');

    const [formData, setFormData] = useState({
        sendId: currentUser.currentUser._id,
        reciveId:'',
        message: ''
    });

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/get-job/${postId}`);
                const data = await res.json();

                if (res.ok) {
                    setPost(data);
                    setUserId(data.userId);
                }
                if (!res.ok) {
                    console.log(data.message);
                }
            };
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId]);

    useEffect(() => {
        try {
            const fetchUser = async () => {
                const res = await fetch(`/api/auth/get-user/${userId}`);
                const data = await res.json();

                if (res.ok) {
                    setUser(data.user);
                }
                if (!res.ok) {
                    console.log(data.message);
                }
            };
            if (userId) fetchUser(); // Fetch user only if userId is available
        } catch (error) {
            console.log(error.message);
        }
    }, [userId]);

    // Handle input change for the message field
    const handleInputChange = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            message: value,
        }));
    };

    const sendMessage = async (e) => {
        e.preventDefault();
    
        try {
            formData.reciveId = userId
            formData.postId = postId
            const res = await fetch(`/api/message/create-message/${currentUser.currentUser._id}/${formData.receiveId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
    
            setPublishError(null);
            setFormData(prevFormData => ({
                ...prevFormData,
                message: ''
            }));
        } catch (error) {
            console.error("Failed to send message:", error);
            setPublishError("Failed to send message. Please try again.");
        }
    };
    

    useEffect(() => {
        const getMessage = async () => {
            try {
                // Fetch messages using the current user's ID and the selected user's ID
                const res = await fetch(`/api/message/get-message/${currentUser.currentUser._id}/${user._id}/${postId}`);
                const data = await res.json();
    
                // Check if the response is successful
                if (res.ok) {
                    setMessages(data.messages); // Assuming 'data' contains the messages, update the messages state
                } else {
                    console.log(data.message); // Log the error message if the request fails
                }
            } catch (error) {
                console.log(error.message); // Log any error that occurs during the fetch process
            }
        };
    
        // Call the function to fetch messages
        if (user._id) { // Ensure user._id is available before making the request
            getMessage();
        }
    
    }, [currentUser.currentUser._id, user._id]); // Add user._id to the dependency array
    

    return (
        <div className='min-h-screen'>
            <div className='p-10 bg-blue-50 '>
                <h1 className='text-3xl font-semibold text-black'>Chat</h1>
                <p className='text-slate-600 mt-2'>Connect and chat with users in real-time, where every conversation brings us closer together!</p>
                <div className='flex justify-center items-center'>
                    <div className='w-full md:w-3/4 flex flex-col mt-10'>
                        <div className='bg-white rounded-lg'>
                            <div className='p-5 border-b-2 border-b-slate-400'>
                                <div className='flex items-center gap-2'>
                                    <Avatar alt="User settings" img={user.profilePicture} rounded />
                                    <p>{user.username}</p>
                                    {
                                        user.role === 'jobSeeker' ?
                                            <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Finder</Label> :
                                            <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Poster</Label>
                                    }
                                </div>
                            </div>
                            <div className='min-h-screen bg-gray-100'>
                                <div className='p-10 flex flex-col gap-3'>
                                    {
                                        messages.map((sendMessage)=>(
                                            <Message key={sendMessage._id} sendMessage={sendMessage} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <form className="flex items-center w-full p-2 bg-white border-t border-gray-200" onSubmit={sendMessage}>
                                    {/* Icon on the left */}
                                    <FiHash className="text-gray-400 text-xl mx-2" />

                                    {/* Input field */}
                                    <input
                                        type="text"
                                        placeholder="Start typing..."
                                        value={formData.message}
                                        id='message'
                                        onChange={handleInputChange}
                                        className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-gray-600 placeholder-gray-400 px-2"
                                    />

                                    {/* Send button */}
                                    <button type="submit" className="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
                                        <FiSend className="text-xl" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

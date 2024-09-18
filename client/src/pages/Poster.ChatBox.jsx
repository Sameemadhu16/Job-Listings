import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, TextInput, Label , Spinner } from 'flowbite-react';
import { FiSend, FiHash } from 'react-icons/fi'; // React icons for hash and send button
import { useParams } from 'react-router-dom';
import Message from '../components/Message';

export default function PosterChatBox() {

    const currentUser = useSelector(state => state.user);
    const [message, setMessage] = useState('');
    const [publishError, setPublishError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const {postId , sendId} = useParams();
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        sendId: currentUser.currentUser._id,
        reciveId:'',
        message: ''
    });


    useEffect(() => {
        try {
            const fetchUser = async () => {
                setLoading(true);
                const res = await fetch(`/api/auth/get-user/${sendId}`);
                const data = await res.json();

                if (res.ok) {
                    setLoading(false)
                    setUser(data.user);
                }
                if (!res.ok) {
                    setLoading(false)
                    console.log(data.message);
                }
            };
            if (sendId) fetchUser(); // Fetch user only if userId is available
        } catch (error) {
            console.log(error.message);
        }
    }, [sendId]);

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
            formData.postId = postId
            formData.reciveId = sendId
            
            const res = await fetch(`/api/message/create-message/${currentUser.currentUser._id}/${formData.reciveId}`, {
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
                const res = await fetch(`/api/message/get-poster-message/${sendId}/${postId}`);
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
            <div className='p-10 bg-blue-50 dark:bg-slate-700'>
                <div className='text-center flex flex-col items-center justify-center'>
                    <div className='flex flex-row text-center items-center gap-1'>
                        <p className='text-3xl font-bold text-blue-800 dark:text-white'>
                            Chat With 
                        </p>
                        <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Finder</Label>
                    </div>
                    <p className='text-slate-600 dark:text-slate-200 mt-2'>Connect and chat with users in real-time, where every conversation brings us closer together!</p>
                </div>
                <div className='flex justify-center items-center '>
                    <div className='w-full md:w-3/4 flex flex-col mt-10 shadow-lg'>
                        <div className='bg-white dark:bg-slate-800 rounded-lg'>
                            <div className='p-5 border-b-2 border-b-slate-400'>
                                <div className='flex items-center gap-2'>
                                    <Avatar alt="User settings" img={user.profilePicture} rounded />
                                    <p className='dark:text-white'>{user.username}</p>
                                    {
                                        user.role === 'jobSeeker' ?
                                            <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Finder</Label> :
                                            <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Poster</Label>
                                    }
                                </div>
                            </div>
                            <div className='min-h-screen bg-gray-100 dark:bg-slate-600'>
                            {loading && (
                                <div className="flex justify-center items-center min-h-screen">
                                    <Spinner className="text-center"></Spinner>
                                </div>
                            )}
                                <div className='p-10 flex flex-col gap-3'>
                                    {
                                        messages.map((sendMessage)=>(
                                            <Message key={sendMessage._id} sendMessage={sendMessage} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <form className="flex items-center w-full p-2 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-400" onSubmit={sendMessage}>
                                    {/* Icon on the left */}
                                    <FiHash className="text-gray-400 dark:text-white text-xl mx-2" />

                                    {/* Input field */}
                                    <input
                                        type="text"
                                        placeholder="Start typing..."
                                        value={formData.message}
                                        id='message'
                                        onChange={handleInputChange}
                                        className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-white px-2"
                                    />

                                    {/* Send button */}
                                    <button type="submit" className="text-blue-500 dark:text-white hover:bg-blue-100 dark:hover:bg-slate-700 p-2 rounded-full">
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

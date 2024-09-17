import React,{useEffect, useState} from 'react';
import { Avatar } from 'flowbite-react';

const ChatMessage = ({sendMessage}) => {

    const userId = sendMessage.sendId;
    const [user,setUser] = useState([]);

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

  return (
        <div className="max-w-md my-4">
        {/* Chat message container */}
            <div className="flex space-x-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    <Avatar alt="User settings" img={user.profilePicture} rounded />
                </div>

                {/* Message content */}
                <div className="flex-1">
                {/* User name */}
                <div className="text-sm font-bold text-gray-900">{user.username}</div>
                
                {/* Message text */}
                <div className="mt-1 text-sm text-gray-700 bg-blue-100 rounded-lg p-3">
                    {sendMessage.message}
                </div>
                
                {/* Timestamp */}
                <div className="mt-1 text-xs text-gray-500 flex flex-row justify-between">
                    <p>{new Date(sendMessage.createdAt).toLocaleDateString()}</p>
                    <p>{new Date(sendMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                </div>
            </div>
        </div>
  );
};

export default ChatMessage;

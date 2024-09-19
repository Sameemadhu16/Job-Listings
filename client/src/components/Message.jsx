import React,{useEffect, useState} from 'react';
import { Avatar } from 'flowbite-react';
import { FiDownload } from 'react-icons/fi';

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
                <div className="text-sm font-bold text-gray-900 dark:text-slate-200">{user.username}</div>
                
                {/* Message text */}
                <div className="mt-1 text-sm text-gray-700 bg-blue-100 dark:bg-blue-900 dark:text-white rounded-lg p-3">
            
                    {
                        sendMessage.image && (
                            <div className="mb-4 flex gap-2 cursor-pointer  relative group">
                                <img src={sendMessage.image} alt="Message attachment" className="h-20 w-auto rounded mb-2" />
                                <a href={sendMessage.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 ">
                                    <button className="bg-slate-200 dark:bg-blue-800 text-slate-800 dark:text-white h-10 w-10 rounded-full flex items-center justify-center  hover:bg-slate-300 dark:hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-1 right-1">
                                        <FiDownload className='self-center'/>
                                    </button>
                                </a>
                            </div>
                        )
                    }

            
                    {
                        sendMessage.file && (
                            <div className="mb-4 flex gap-2 cursor-pointer  relative group">
                                <iframe src={sendMessage.file} className="h-48 w-3/4 rounded mb-2" title="File attachment"></iframe>
                                <a href={sendMessage.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300">
                                    <button className="bg-slate-200 dark:bg-blue-800 text-slate-800 dark:text-white h-10 w-10 rounded-full flex items-center justify-center  hover:bg-slate-300 dark:hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-1 right-1">
                                        <FiDownload className='self-center'/>
                                    </button>
                                </a>
                            </div>
                        )
                    }

                    
                    <p>{sendMessage.message}</p>
                </div>
                
                {/* Timestamp */}
                <div className="mt-1 text-xs text-gray-500 dark:text-slate-200 flex flex-row justify-between">
                    <p>{new Date(sendMessage.createdAt).toLocaleDateString()}</p>
                    <p>{new Date(sendMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                </div>
            </div>
        </div>
  );
};

export default ChatMessage;

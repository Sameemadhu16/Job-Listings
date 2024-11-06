import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Spinner, TextInput } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';

export default function ChatList() {

    const [loading,setLoading] = useState(false);
    const currentUser = useSelector(state => state.user);
    const [reciveMessages,setReciveMessages] = useState([]);

    useEffect(() => {
        // Function to fetch received messages from the backend
        const fetchReceivedMessages = async () => {
            try {
                const res = await fetch(`/api/message/get-chat/${currentUser.currentUser._id}`)
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message)
                }
                if(res.ok){
                    setReciveMessages(data.receivedMessages)
                    console.log(reciveMessages[0])
                }
                
            } catch (error) {
                console.error("Error fetching received messages", error);
            }
        };
    
        fetchReceivedMessages();
    }, []);

    return (
        <div className="bg-blue-50 dark:bg-slate-700 min-h-screen">
            {loading && (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner className="text-center" />
                </div>
            )}
            <main className="max-w-4xl mx-auto py-12">
                <h1 className="text-center text-3xl font-bold text-blue-800 dark:text-slate-200">
                    Your Chat List
                </h1>
                <p className="text-center text-lg text-gray-600 dark:text-white">Chat With Job finder</p>

                

                <div className="bg-white dark:bg-blue-950 shadow-md rounded-md p-6 mt-10">

                    <div className="space-y-4 font-bold">
                        {
                            reciveMessages.length === 0 ? 'NO CHAT YET...' : 
                                reciveMessages.map((message)=>(
                                    <ChatMessage message={message}/>
                                ))
                            
                        }
                    </div>
                </div>

            </main>
        </div>
    );
}

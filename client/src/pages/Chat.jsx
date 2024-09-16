import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Avatar , TextInput } from 'flowbite-react';
import { FiSend, FiHash } from 'react-icons/fi'; // React icons for hash and send button

export default function Chat() {

    const currentUser = useSelector(state=> state.user);
console.log(currentUser)
    return (
        <div className='min-h-screen'>
            <div className='p-10 bg-blue-50'>
                <h1 className='text-3xl font-semibold text-black'>Chat</h1>
                <p>Chat with users</p>
                <div className='bg-white rounded-lg'>
                    <div className='p-5 border-b-2 border-b-slate-400'>
                        <div className='flex items-center gap-2 '>
                            <Avatar alt="User settings" img={currentUser.currentUser.profilePicture} rounded />
                            <p>{currentUser.currentUser.username}</p>
                        </div>
                    </div>
                    <div className='min-h-screen bg-gray-100 rounded-lg'>
                        {/* chat body */}
                    </div>
                    <div>
                    <form className="flex items-center w-full p-2 bg-white border-t border-gray-200">
                        {/* Icon on the left */}
                        <FiHash className="text-gray-400 text-xl mx-2" />

                        {/* Input field */}
                        <input
                            type="text"
                            placeholder="Start typing..."
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
    )
}

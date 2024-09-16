import React from 'react';

const ChatMessage = () => {
  return (
        <div className="max-w-md mx-auto my-4">
        {/* Chat message container */}
            <div className="flex space-x-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                D
                </div>

                {/* Message content */}
                <div className="flex-1">
                {/* User name */}
                <div className="text-sm font-bold text-gray-900">Dimas Eza</div>
                
                {/* Message text */}
                <div className="mt-1 text-sm text-gray-700 bg-blue-100 rounded-lg p-3">
                    Ngedesign dashboard yu gais gaskeun ga sih?
                </div>
                
                {/* Timestamp */}
                <div className="mt-1 text-xs text-gray-500">4.30 PM</div>
                </div>
            </div>
        </div>
  );
};

export default ChatMessage;

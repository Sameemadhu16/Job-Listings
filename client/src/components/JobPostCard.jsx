import React from 'react';
import { Label } from 'flowbite-react';

const JobPostCard = ({post}) => {
  return (
    <div className="w-1/2 rounded overflow-hidden shadow-lg bg-white hover:scale-105 cursor-pointer transition-transform duration-150">
      <img
        className="w-full h-48 object-cover"
        src={post.image}// Replace with your image URL
        alt="Blog post"
      />
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{post.title}</h2>
        <Label className='border-2 border-blue-700 py-1 px-2 text-blue-700'>{post.type == 'full' ? 'FULL TIME' : 'PART TIME'}</Label>
        <div className="flex items-center mb-4">
        
        <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{post.requirement}</p>
            <p className="text-xs text-gray-500">{new Date(post.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-gray-700 text-base">
          {post.description}</p>
      </div>
    </div>
  );
};

export default JobPostCard;

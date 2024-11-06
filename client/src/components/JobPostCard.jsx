import React, { useState } from 'react';
import { Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const JobPostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 100; // Set your character limit here
  const navigate = useNavigate();

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = () => {
    navigate(`full-post/${post._id}`)
  }

  return (
    <div className="w-[300px] rounded overflow-hidden shadow-lg bg-white dark:bg-slate-600 hover:scale-105 cursor-pointer transition-transform duration-150" >
      <img
        className="w-full h-48 object-cover p-3"
        src={post.image} // Replace with your image URL
        alt="Job post"
        onClick={handleNavigate}
      />
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2 dark:text-white">{post.title}</h2>
        <Label className='border-2 border-blue-700 dark:border-blue-200 py-2 px-1 text-blue-700 dark:text-blue-200'>
          {post.type === 'full' ? 'FULL TIME' : 'PART TIME'}
        </Label>
        <div className="flex items-center mb-4">
          <div className="ml-3 mt-3">
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">{post.requirement}</p>
            <p className="text-xs text-gray-500 dark:text-slate-200">{new Date(post.updatedAt).toLocaleDateString()}</p>
            <p className='text-xs text-gray-500 dark:text-slate-200'>{post.companyName}</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm dark:text-slate-200">
          {isExpanded ? post.description : `${post.description.slice(0, characterLimit)}...`}
        </p>
        {post.description.length > characterLimit && (
          <button
            onClick={toggleReadMore}
            className="text-blue-500 text-sm mt-2 focus:outline-none"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobPostCard;

import React, { useState } from 'react';
import { Button , Label } from 'flowbite-react';
import { HiHeart, HiOutlineBookmark, HiOutlineHeart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SeekerCartPost({ post, ShowAddcart }) {

  const [favorite,setFavorite] = useState(true);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  console.log(currentUser.currentUser)
  

  const handleFavorite = () => {

    setFavorite(!favorite)
  }

  const handleNavigate = () => {
    post.type === 'full' ? navigate(`/full-post/${post._id}`) : navigate(`/post/${post._id}`)
  }
  return (
    <div onClick={handleNavigate} className="bg-white w-5/6 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
      <img
        src={post.image || 'https://via.placeholder.com/300'}
        alt={post.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {post.company}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {post.description}
        </p>
        <div className="flex justify-between items-center">
          
          <Label className='border-2 border-blue-700 dark:border-blue-200 py-2 px-1 text-blue-700 dark:text-blue-200'>
            {post.type === 'full' ? 'FULL TIME' : 'PART TIME'}
          </Label>
          
          {
            currentUser.currentUser.role === 'jobSeeker' && 
              <Button outline gradientDuoTone="tealToBlue" className="flex items-center gap-2" onClick={handleFavorite}>
              {
                favorite ? 
                (<>
                  <HiOutlineHeart className="text-xl" />
                  Add to Favourite
                </>) : (
                  <>
                  <HiHeart className="text-xl" />
                  Remove from Favourite
                </>
                )

              }
            </Button>
          }
        </div>
      </div>
    </div>
  );
}

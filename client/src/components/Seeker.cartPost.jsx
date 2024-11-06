import React, { useState } from 'react';
import { Button, Label } from 'flowbite-react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaComment, FaPaperPlane } from 'react-icons/fa';
import DashComments from './Seeker.commentsection';
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';

export default function SeekerCartPost({ post, ShowAddcart, showApply, showDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [favorite, setFavorite] = useState(true);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

console.log(currentUser.role)
  const handleCommentModalOpen = (event) => {
    event.stopPropagation(); // Prevent parent click navigation
    setIsCommentModalOpen(true); // Set comment modal open
  };

  const handleCommentModalClose = () => {
    setIsCommentModalOpen(false); // Close comment modal
  };
  const handleFavorite = async (event) => {
    event.stopPropagation(); // Prevent event from triggering parent click handler
    try {
      setFavorite(!favorite);

      // Add item to cart
      if (!currentUser || !currentUser._id) {
        throw new Error('User ID not available');
      }

      const res = await fetch(`/api/seeker/addcart/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post._id }), // Assuming post._id is available from props
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add post to cart');
      }

      console.log('Post added to cart successfully');
      setShowAlert(true);
      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Navigate to cart page
      // navigate('/seeker-dashboard?tab=cart');

    } catch (error) {
      console.error('Error adding post to cart:', error.message);
      // Handle error: display error message or perform other actions
    }
  };


  const handleAppliedjobs = async () => {
    try {
      if (!currentUser || !currentUser._id) {
        throw new Error('User ID not available');
      }

      const res = await fetch(`/api/seeker/addapplied/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post._id }), // Assuming post._id is available from props
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add post to applied list');
      }

      console.log('Post added to apllied list successfully');
    } catch (error) {
      console.error('Error adding post to applied list:', error.message);
      // Handle error: display error message or perform other actions
    }
    
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleApplyButtonClick = () => {
    handleModalOpen();
    handleAppliedjobs();
  };

  const handleNavigate = () => {
    post.type === 'full' ? navigate(`/full-post/${post._id}`) : navigate(`/post/${post._id}`);
  };

  return (
    <div  className="bg-slate-50 w-5/6 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer relative">
      {showAlert && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center p-2 z-50">
          Item added to cart!
        </div>
      )}
      <img
        src={post.image || 'https://via.placeholder.com/300'}
        alt={post.title}
        className="w-full h-40 object-cover"
        onClick={handleNavigate}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{post.company}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{post.description}</p>
        <div className="flex justify-between items-center">
          <Label className="border-2 border-blue-700 dark:border-blue-200 py-2 px-1 text-blue-700 dark:text-blue-200">
            {post.type === 'full' ? 'FULL TIME' : 'PART TIME'}
          </Label>
          {ShowAddcart && currentUser.role === 'jobSeeker' && (
            <Button outline gradientDuoTone="tealToBlue" className="flex items-center gap-2" onClick={handleFavorite}>
              {favorite ? (
                <>
                  <HiOutlineHeart className="text-xl" />
                  Add to Favourite
                </>
              ) : (
                <>
                  <HiHeart className="text-xl" />
                  Remove from Favourite
                </>
              )}
            </Button>
          )}
          
            <div className='flex'>
          {showApply && showDelete && (
            <Button
              outline
              gradientDuoTone="tealToBlue"
              className="flex items-center gap-2"
              onClick={handleCommentModalOpen}
            >
              <div className='text-center flex items-center'>
                <FaComment className="text-xl m-1" />
                Comments
              </div>
            </Button>
            
          )}
          {showApply && showDelete && post.type == 'full' && (
            <Button
              outline
              gradientDuoTone="tealToBlue"
              className="flex items-center gap-2"
              onClick={handleApplyButtonClick}
            >
              <div className='text-center flex items-center'>
                <FaPaperPlane className="text-xl m-1" />
                Apply
              </div>
            </Button>
            
          )}
          </div>
          
        </div>
      </div>

      {/* Comment Modal */}
      <DashComments isOpen={isCommentModalOpen} onClose={handleCommentModalClose} postId={post._id} />
      <CompanyDetailsModal isOpen={isModalOpen} onClose={handleModalClose} showSendCVLink={true} post={post}/>
    </div>
  );
}
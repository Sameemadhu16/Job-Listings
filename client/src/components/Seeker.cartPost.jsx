import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';
import { useSelector } from 'react-redux';
import DashComments from './Seeker.commentsection';

export default function SeekerCartPost({ ShowAddcart, showApply, showDelete, post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [cartPostIdToDelete, setCartPostIdToDelete] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCommentModalOpen = () => {
    setIsCommentModalOpen(true);
  };

  const handleCommentModalClose = () => {
    setIsCommentModalOpen(false);
  };

  const handleCart = async () => {
    try {
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
  const handleApplyButtonClick = () => {
    handleModalOpen();
    handleAppliedjobs();
  };
  

  const date = new Date(post.createdAt);

  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <div className='group relative w-full sm:w-[380px] border border-teal-500 hover:border-2 h-[380px] overflow-hidden rounded-lg transition-all'>
      {/* Alert message */}
    {showAlert && (
      <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center p-2 z-50">
        Item added to cart!
      </div>
    )}
      <Link to={''}>
        <img
          src={post.image}
          alt='post-cover'
          className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.companyName}</span>
        <div className='flex p-2 font-semibold text-sm justify-between'>
          <p>{time}</p>
          <p>{formatDate(post.createdAt)}</p>
        </div>
        {showApply && showDelete && (
          <div className='flex items-center text-center gap-2 ml-5'>
            <Button className='px-8 bg-slate-500' onClick={handleCommentModalOpen}>
              comments
            </Button>
            <Button className='px-10' onClick={handleApplyButtonClick}>
              Apply
            </Button>
          </div>
        )}
        {ShowAddcart && (
          <Button className='px-20' onClick={handleCart}>
            Add to cart
          </Button>
        )}
        {showApply && !showDelete && (
          <Button className='px-20' onClick={handleModalOpen}>
            Apply
          </Button>
        )}
      </div>
      <CompanyDetailsModal isOpen={isModalOpen} onClose={handleModalClose} showSendCVLink={true} />
      <DashComments isOpen={isCommentModalOpen} onClose={handleCommentModalClose} postId={post._id}/>
    </div>
  );
}

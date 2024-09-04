import React, { useState } from 'react';
import { Modal, Button, Label } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaMagento, FaPaperPlane } from 'react-icons/fa';

export default function CompanyDetailsModal({ isOpen, onClose, showSendCVLink = true , post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

  //when user click send cv button it will go to applied list
  const handleapplied = async () => {
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
        throw new Error(data.message || 'Failed to add post to applied');
      }

      console.log('Post added to applied list successfully');

    } catch (error) {
      console.error('Error adding post to applied list:', error.message);
      // Handle error: display error message or perform other actions
    }
  };


  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        <div className='flex items-center justify-between'>
          <div className='text-green-500 font-medium'>
            WE ARE <span className='text-green-800 font-bold'>HIRING </span>
            <br />
            <span className='text-slate-900'>{post.title}</span>
          </div>
          <div className='font-extrabold text-4xl mx-20 text-blue-900 flex gap-2 items-center justify-center'>
            
            {post.companyName}
          </div>
          <Label className='border-2 border-blue-700 py-1 px-2 text-blue-700'>{post.type == 'full' ? 'FULL TIME' : 'PART TIME'}</Label>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className='flex items-center'>
          <div className="space-y-6">
            <div>
              <h3 className='font-semibold'>
                Requirements:
              </h3>
              <ul className="list-disc list-inside pl-5 text-gray-500 space-y-1">
                <li>{post.requirement}</li>
                
              </ul>
            </div>
            <div>
              <h3 className='font-semibold'>
                Essencial Traits:
              </h3>
              <ul className="list-disc list-inside  text-gray-500 space-y-1">
                <li>{post.essential}</li>
                
              </ul>
            </div>
            <div>
              <h3 className='font-semibold'>
                Description:
              </h3>
              <ul className="list-disc list-inside pl-5 text-gray-500 space-y-1">
                <li>{post.description}</li>
                
              </ul>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center ml-32">
            <img 
              src={post.image}
              alt='image-poster'
              className='rounded-full bg-gray-500'

            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='flex justify-between w-full'>
          
            <button onClick={onClose} className='bg-blue-500 py-2 px-10 text-white hover:bg-blue-600 rounded-lg ' >
              Close
            </button>
            {/* should hidden this link when it call in AppliedJobs component*/}
            {showSendCVLink && (
              <Link to={`mailto:irumiaeywickrama@gmail.com?subject=Regarding Software Engineer`} className='bg-slate-800 text-white text-center p-3 uppercase rounded-lg hover:opacity-95' onClick={''}>
                Send your CV
              </Link>
            )
            }
        </div>
        
      </Modal.Footer>
    </Modal>
  );
}

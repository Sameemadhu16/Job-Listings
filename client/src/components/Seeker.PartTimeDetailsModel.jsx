import React, { useState } from 'react';
import { Modal, Button, Label } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendar, FaClock, FaLandmark, FaMagento, FaMale, FaMap, FaMapMarked, FaMapMarkedAlt, FaPaperPlane, FaPhone, FaUser } from 'react-icons/fa';

export default function SeekerPartTimeDetailsModel({ isOpen, onClose, showSendCVLink = true ,post }) {
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
                WE ARE <span className='text-green-800 font-bold'>HIRING</span>
                <br />
                <span className='text-slate-900'>{post.title}</span>
            </div>
            <div className='font-extrabold text-2xl mx-20 text-black flex gap-2 items-center justify-center'>
                    LKR.{post.salary}
            </div>
            <Label className='border-2 border-blue-700 py-1 px-2 text-blue-700'>{post.type == 'full' ? 'FULL TIME' : 'PART TIME'}</Label>
        </div>
        </Modal.Header>
    <Modal.Body>
        <div className='flex items-center'>
            
            <div className="space-y-3">

            <div>
                    <h3 className='font-semibold text-xl flex gap-1 items-center'>
                        <FaPhone/>
                        Contact: {post.mobileNumber}
                    </h3>
                    
                </div>

                <div>
                    <h3 className='font-semibold flex gap-1 items-center'>
                        <FaCalendar/>
                        Date: <p className='text-gray-500 text-sm'>{new Date(post.date).toLocaleDateString()}</p>
                    </h3>
                
                </div>

                <div>
                    <h3 className='font-semibold flex gap-1 items-center'>
                        <FaClock/>
                        Start At: <p className='text-gray-500 text-sm'>{post.sTime}</p>
                    </h3>
                    
                </div>
            <div>
                <h3 className='font-semibold flex gap-1 items-center'>
                    <FaClock/>
                    End At: <p className='text-gray-500 text-sm'>{post.eTime}</p>
                </h3>
            
            </div>
            <div>
                <h3 className='font-semibold flex gap-1 items-center'>
                    <FaUser/>
                    Members: <p className='text-gray-500 text-sm'>{post.members}</p>
                </h3>
            
            </div>

            <div>
                <h3 className='font-semibold flex gap-1 items-center'>
                    <FaMale/>
                    Gender: <p className='text-gray-500 text-sm'>{post.gender == 'male' ? "Male" : "Female"}</p>
                </h3>
            
            </div>
            <div>
                <h3 className='font-semibold flex gap-1 items-center'>
                    <FaMapMarked/>
                    Venue: <p p className='text-gray-500 text-sm'>{post.venue}</p>
                </h3>
            
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
                
            </div>
        
        </Modal.Footer>
    </Modal>
  );
}

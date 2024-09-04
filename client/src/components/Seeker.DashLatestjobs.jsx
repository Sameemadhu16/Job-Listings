import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiClock, HiCurrencyDollar, HiLocationMarker } from 'react-icons/hi';
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';
import {FaArrowRight} from 'react-icons/fa'

export default function SeekerDashLatestjobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  const [posts,setPosts] = useState([]);

  useEffect(() =>{
    const fetchPosts = async () => {
      const res = await fetch('/api/post/get-posts');
      const data = await res.json();
      setPosts(data.posts)
    }
    fetchPosts();
  },[])


  const calculateDaysRemaining = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate - createdDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800 dark:text-white">
      <h1 className="p-6 font-bold text-slate-600">Latest Jobs</h1>
      {posts && posts.length > 0 && (
      <Table hoverable>
      {posts.map((post)=>(
        <Table.Body className="divide-y">
          <Table.Row className="bg-slate-200 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className='flex justify-between items-center'>
              <div className='flex gap-6'>
                <img
                  src='https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='
                  alt='user'
                  className="w-10 h-10 rounded-full bg:gray-500"
                />
                <div>
                  <h3 className="font-semibold text-md text-slate-800">{post.title}</h3>
                  <div className='flex gap-4'>
                    <div className='flex items-center'>
                      <HiLocationMarker />
                      {/* {post.companyName} */}
                    </div>
                    <div className='flex items-center'>
                      <HiCurrencyDollar />
                      $15K-20K
                    </div>
                    <div className='flex items-center'>
                      <HiClock />
                      {/* {calculateDaysRemaining(post.createdAt)} Days left after created */}
                    </div>
                  </div>
                </div>
              </div>
              <button className='bg-blue-500 hover:bg-blue-500 text-white py-2 px-2 rounded-lg'  onClick={handleModalOpen}>
                  <div className='flex flex-row text-center items-center gap-1'>
                  <p>Apply Now</p>
                </div>
              </button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
                  ))}
      </Table>
      )}
      {<CompanyDetailsModal isOpen={isModalOpen} onClose={handleModalClose} showSendCVLink={true} post/>}
    </div>
  );
}

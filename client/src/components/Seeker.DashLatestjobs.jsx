import { Button, Table , Label} from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiClock, HiCurrencyDollar, HiLocationMarker } from 'react-icons/hi';
import CompanyDetailsModal from '../components/Seeker.CompanyDetailsModal'
import SeekerPartTimeDetailsModel from '../components/Seeker.PartTimeDetailsModel';
import {FaArrowRight} from 'react-icons/fa'

export default function SeekerDashLatestjobs() {

  const [posts,setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPart, setIsModalOpenPart] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  const handleModalOpen = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

 
  const handleModalOpenPart = (job) => {
    setSelectedJob(job);
    setIsModalOpenPart(true);
  };

  const handleModalClosePart = () => {
    setIsModalOpenPart(false);
  };
  
  

  

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
    <div className="flex flex-col w-full shadow-md p-2 rounded-md bg-blue-50 dark:bg-slate-700 dark:text-white">
      <h1 className="p-6 font-bold text-slate-600 dark:text-white">Latest Jobs</h1>
      {posts && posts.length > 0 && (
      <Table hoverable>
      {posts.map((post)=>(
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-slate-700 dark:bg-gray-800">
            <Table.Cell className='flex justify-between items-center'>
              <div className='flex gap-6'>
                <img
                  src='https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='
                  alt='user'
                  className="w-10 h-10 rounded-full bg:gray-500"
                />
                <div>
                  <h3 className="font-semibold text-md text-slate-800 mb-2 dark:text-white">{post.title}</h3>
                  <Label className="border-2 border-blue-700 py-1 px-2 text-blue-700 mt-3 dark:text-blue-200 dark:border-blue-200">
                    {post.type === 'full' ? 'FULL' : 'PART'}
                  </Label>
                  <div className='flex gap-4 mt-2'>
                    
                    {
                      post.type == 'part' && 
                        <>
                          <div className='flex items-center dark:text-white'>
                        <HiLocationMarker />
                        {post.venue}
                      </div>

                        <div className='flex items-center mt-2 dark:text-white'>
                        <HiCurrencyDollar />
                        LKR{post.salary}
                      </div>
                        </>
                      
                    }
                    <div className='flex items-center gap-1 dark:text-white'>
                      <HiClock />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <button className='bg-blue-500 hover:bg-blue-500 text-white py-2 px-2 rounded-lg'  
                    onClick={() =>
                      post.type === 'part'
                        ? handleModalOpenPart(post)
                        : handleModalOpen(post)
                    }>
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
        <SeekerPartTimeDetailsModel
          isOpen={isModalOpenPart}
          onClose={handleModalClosePart}
          post={selectedJob}
        />
        <CompanyDetailsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          showSendCVLink={false}
          post={selectedJob}
      />
    </div>
  );
}

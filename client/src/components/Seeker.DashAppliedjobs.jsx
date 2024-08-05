import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';
import { useSelector } from 'react-redux';

export default function SeekerDashAppliedjobs() {
  const { currentUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userappliedjobs, setUserappliedjobs] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchapplied = async () => {
      try {
        const res = await fetch(`api/seeker/getapplied/${currentUser._id}`);
        
        const data1 = await res.json();
        const data = data1.appliedPosts;
        console.log(data);
        if (res.ok) {
          setUserappliedjobs(data);
          
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
      fetchapplied();
    
  }, [currentUser._id]);

  return (
    <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800">
      <h1 className="p-6 font-bold text-slate-600">Applied Jobs</h1>
      {userappliedjobs.length > 0 && (
        <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Job</Table.HeadCell>
          <Table.HeadCell>Date posted</Table.HeadCell>
          <Table.HeadCell>Company Name</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        {userappliedjobs.map((appliedjob) =>(
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className='flex gap-2 items-center'>
              <img
                src={appliedjob.img ||'https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='}
                alt='user'
                className="w-10 h-10 rounded-full bg:gray-500"
              />
              {appliedjob.title}
            </Table.Cell>
            <Table.Cell>
              
            {new Date(appliedjob.createdAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>

              {appliedjob.companyName}
            </Table.Cell>
            <Table.Cell>
              <Button gradientDuoTone="purpleToBlue">
                <Link onClick={handleModalOpen} className='flex items-center gap-3'>
                  View Details
                  <HiArrowNarrowRight />
                </Link>
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
       ))}
      </Table>
      )}
      
      <CompanyDetailsModal isOpen={isModalOpen} onClose={handleModalClose} showSendCVLink={false}/>
    </div>
  );
}

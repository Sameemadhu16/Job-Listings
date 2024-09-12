import { Button, Label, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom'; // Use this for navigation
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';
import SeekerPartTimeDetailsModel from './Seeker.PartTimeDetailsModel';
import { useSelector } from 'react-redux';

export default function SeekerDashAppliedjobs() {
  const { currentUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPart, setIsModalOpenPart] = useState(false);
  const [userappliedjobs, setUserappliedjobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const navigate = useNavigate(); // Initialize navigate for redirecting

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
    <div className="flex flex-col w-full shadow-md p-2 rounded-md bg-blue-50 dark:bg-slate-700">
      <h1 className="p-6 font-bold text-slate-600 dark:text-white">Applied Jobs</h1>
      {userappliedjobs.length > 0 && (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Job</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Date posted</Table.HeadCell>
            <Table.HeadCell>Company Name</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          {userappliedjobs.map((appliedjob) => (
            <Table.Body className="divide-y" key={appliedjob._id}>
              <Table.Row className="bg-white dark:border-slate-800 dark:bg-gray-800">
                <Table.Cell className="flex gap-2 items-center dark:text-white">
                  <img
                    src={
                      appliedjob.image ||
                      'https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full bg:gray-500"
                  />
                  {appliedjob.title}
                </Table.Cell>
                <Table.Cell>
                  <Label className="border-2 border-blue-700 dark:text-blue-200 dark:border-blue-200 py-1 px-2 text-blue-700">
                    {appliedjob.type === 'full' ? 'FULL' : 'PART'}
                  </Label>
                </Table.Cell>
                <Table.Cell className='dark:text-white'>{new Date(appliedjob.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell className='dark:text-white'>{appliedjob.companyName}</Table.Cell>
                <Table.Cell>
                  <Button 
                    gradientDuoTone="purpleToBlue"
                    onClick={() =>
                      appliedjob.type === 'part'
                        ? handleModalOpenPart(appliedjob)
                        : handleModalOpen(appliedjob)
                    }
                    className="flex items-center gap-3 text-center justify-center"
                  >
                    Details
                    
                  </Button>
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

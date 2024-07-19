import { Button, Table } from 'flowbite-react';
import React, { useState } from 'react';
import { HiClock, HiCurrencyDollar, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';

export default function SeekerDashLatestjobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800">
      <h1 className="p-6 font-bold text-slate-600">Latest Jobs</h1>
      <Table hoverable>
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
                  <h3 className="font-semibold text-md text-slate-800">Software Engineer</h3>
                  <div className='flex gap-4'>
                    <div className='flex items-center'>
                      <HiLocationMarker />
                      Idaho, USA
                    </div>
                    <div className='flex items-center'>
                      <HiCurrencyDollar />
                      $15K-20K
                    </div>
                    <div className='flex items-center'>
                      <HiClock />
                      4 Day Remaining
                    </div>
                  </div>
                </div>
              </div>
              <Button gradientMonochrome="info" onClick={handleModalOpen}>
                Apply Now
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <CompanyDetailsModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}

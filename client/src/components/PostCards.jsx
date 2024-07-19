import React from 'react';
import { Button } from 'flowbite-react';
import { MdDateRange } from 'react-icons/md';

export default function PostCards() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="job-card bg-gradient-to-r from-blue-400 to-green-500 p-6 rounded-lg shadow-lg flex m-10 max-w-xl">
        <div className="image-placeholder bg-gradient-to-r from-green-500 to-blue-500 rounded-lg w-1/3 h-40 flex items-center justify-center">
          {/* Placeholder for image */}
        </div>
        <div className="content ml-6 flex flex-col justify-between w-2/3">
          <div>
            <div className="date flex items-center text-gray-700 text-sm mb-2">
              <MdDateRange className="mr-2" />
              20 July 2024
            </div>
            <h2 className="title text-2xl font-bold mb-2">Part Time Job Cards</h2>
            <p className="description text-gray-700 mb-4">
              You can post your jobs on our platform
            </p>
          </div>
          <Button className="read-more-button self-start  to-red-500 text-white" pill>
            READ MORE
          </Button>
        </div>
      </div>
    </div>
  );
}

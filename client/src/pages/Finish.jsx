import React from 'react';
import { HiCheckCircle } from "react-icons/hi";
import { FaArrowRight } from 'react-icons/fa';
import { Button } from 'flowbite-react';

export default function Finish() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <HiCheckCircle className='text-6xl text-blue-500 mx-auto' />
        <p className='text-lg font-semibold mt-4'>🎉 Congratulations, Your profile is 100% complete!</p>
        <p className='text-sm text-gray-600 mt-2'>
          Start exploring your personalized dashboard. Update your profile information to get the most out of our services. Begin using our services and discover how we can assist you.
        </p>
        <div className='flex flex-row gap-2 justify-center mt-3'>
            <Button className='bg-blue-100 text-blue-700 w-1/4 text-center'>
                View Dashboard
            </Button>
            <Button className='bg-blue-500 text-white w-1/4 text-center'>
                <div className='flex items-center gap-1'>
                Post Job
                <FaArrowRight/>
                </div>
            </Button>
            
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function CompanyDetailsModal({ isOpen, onClose, showSendCVLink = true }) {
  const [contact, setContact] = useState(false)
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        <div className='flex items-center'>
          <div className='text-green-500 font-medium'>
            WE ARE <span className='text-green-800 font-bold'>HIRING </span>
            <br />
            <span className='text-slate-900'>Software Engineers</span>
          </div>
          <div className='font-extrabold mx-20 text-blue-900'>
            i-Wonder Sri Lanka
          </div>
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
                <li>Experience in C#, .NET, Angular</li>
                <li>JavaScript, CSS, HTML</li>
                <li>SQL server, Mongo DB</li>
                <li>Angular</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold'>
                Essencial Traits:
              </h3>
              <ul className="list-disc list-inside pl-5 text-gray-500 space-y-1">
                <li>Good communication skills</li>
                <li>Genuine love of coding</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold'>
                How to get selected:
              </h3>
              <ul className="list-disc list-inside pl-5 text-gray-500 space-y-1">
                <li>Pass the phone interview</li>
                <li>Face a tecnical test based on Angular and .NET</li>
              </ul>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <img 
              src='https://static.vecteezy.com/system/resources/previews/020/962/925/non_2x/software-engineer-graphic-clipart-design-free-png.png'
              alt='image-poster'
              className='rounded-full bg-gray-500'

            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='flex justify-between w-full'>
          
            <Button onClick={onClose}>
              Close
            </Button>
            {/* should hidden this link when it call in AppliedJobs component*/}
            {showSendCVLink && (
              <Link to={`mailto:irumiaeywickrama@gmail.com?subject=Regarding Software Engineer`} className='bg-slate-800 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
                Send your CV
              </Link>
            )
            }
        </div>
        
      </Modal.Footer>
    </Modal>
  );
}

import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';

export default function SeekerCartPost({ShowAddcart, showApply, showDelete}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='group relative w-1/4 border border-teal-500 hover:border-2 h-[380px] overflow-hidden rounded-lg sm:w-[380px] transition-all'>
      <Link to={""}>
        <img src={'https://www.shutterstock.com/image-photo/work-time-art-collage-female-260nw-2361102709.jpg'} alt='post-cover' className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'/>
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>post title</p>
        <span className='italic text-sm'>post company</span>
        {
            showApply && showDelete && (
                <div className='flex items-center gap-2 ml-5'>
                    <Button className='px-10 bg-red-900 hover:bg-red-700'>
                        Delete
                    </Button>
                    <Button className='px-10' onClick={handleModalOpen}>
                        Apply
                    </Button>
                </div>
            )
        }
        {
            ShowAddcart && (
                <Button className='px-20' onClick={''}>
                    Add to cart
                </Button>
            )
        }
        
        

      </div>
      <CompanyDetailsModal isOpen={isModalOpen} onClose={handleModalClose} showSendCVLink={true}/>
    </div>
  )
}

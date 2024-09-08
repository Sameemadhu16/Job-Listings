import React from 'react'
import { Button, Modal, Sidebar } from 'flowbite-react'
import { HiViewGrid, HiClipboardList, HiArrowSmRight, HiOutlineExclamationCircle } from "react-icons/hi"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CgProfile } from "react-icons/cg";
import { IoBagCheckSharp } from "react-icons/io5";
import { RiSave3Fill } from "react-icons/ri";
import { signoutSuccess } from '../redux/user/userSlice'

export default function PosterDashSidebar() {
  const location = useLocation();
  const [showModal, setShowModal]= useState(false);
  //const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">

          <Link to="/poster-dashboard">

            <Sidebar.Item
              icon={HiViewGrid}
              as="div"
            >
              Overview
            </Sidebar.Item>
          </Link>

          <Link to="/poster-dashboard/employeeprofile">

            <Sidebar.Item icon={CgProfile} as="div">
              My Profile
            </Sidebar.Item>
          </Link>

          <Link to="/create-p-job">

            <Sidebar.Item icon={HiClipboardList} as="div">
              Create Part Time Job
            </Sidebar.Item>
          </Link>
          <Link to="/create-f-job">

            <Sidebar.Item icon={IoBagCheckSharp} as="div">
              Create Full Time Job
            </Sidebar.Item>
          </Link>
         

        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
        <Sidebar.Item icon={HiArrowSmRight} classname='cursor-pointer' onClick={()=>{
            setShowModal(true)
                  }}>
            
            Sign Out
          </Sidebar.Item>

          <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to Sign Out?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={handleSignout}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

        </Sidebar.ItemGroup>
        
      </Sidebar.Items>
     
    </Sidebar>

  )
}


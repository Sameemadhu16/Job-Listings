import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Avatar, Badge, Alert, TextInput, Modal } from 'flowbite-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { GiWorld } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { updateStart, updateSuccess, updateFailure, deleteUserFailure, deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function PosterDashEmployeeProfile() {
  const { currentUser } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [ImageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [showModal, setShowModal] = useState(false)




  useEffect(() => {
    if (imageFileUploadProgress > 0 && imageFileUploadProgress < 100) {
      setShowUploadProgress(true)
    }
    if (imageFileUploadProgress >= 100) {
      setShowUploadProgress(true)
      const timeout = setTimeout(() => {
        setShowUploadProgress(false);
      }, 2000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [imageFileUploadProgress])


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (File) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }

  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storsge = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storsge, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError("could not upload image (File must be less than 2MB)");
        setImageFileUploadError(null);
        setImageFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          onchange = { handleChange }
        })
      }
    )

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart())

      const res = await fetch(`/api/jobposter/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message))
      }
      else {
        dispatch(updateSuccess(data))
      }

    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

  const handleDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/jobposter/delete/${currentUser._id}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteUserSuccess(data.message))
      } else {
        dispatch(deleteUserFailure(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  console.log(currentUser._id);


  return (
    <div className='w-full'>

      <div className="bg-gray-100 p-8 min-h-screen dark:bg-gray-900">
        <div className="w-4xl mx-auto bg-white rounded-lg shadow-md p-6  dark:bg-gray-900">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                ref={filePickerRef}
                hidden
              />
              <div className='relative'>
                {/* Profile picture */}
                <Avatar
                  img={imageFileUrl || currentUser.profilePicture}
                  rounded={true}
                  size="xl"
                  onClick={() => filePickerRef.current.click()}
                />

                {/* Circular progress bar */}
                {showUploadProgress && (
                  <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                    <CircularProgressbar
                      value={imageFileUploadProgress || 0}
                      text={`${imageFileUploadProgress}%`}
                      strokeWidth={5}
                      styles={{
                        root: {
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        },
                        path: {
                          stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                        },
                        text: {
                          fill: '#fff',
                          fontSize: '16px',
                        },
                      }}
                    />
                  </div>
                )}
                <div>
                  {/* Error alert */}
                  {ImageFileUploadError && (
                    <Alert color='failure'>
                      {ImageFileUploadError}
                    </Alert>

                  )}
                </div>

              </div>


              <div className="ml-4">
                <h1 className="text-xl font-bold">

                  <input className='dark:bg-gray-900' id='username' onChange={handleChange} defaultValue={currentUser.username} /></h1>
                <p className="text-gray-600"></p>
              </div>
            </div>
            <div className='flex'>
              <Button onClick={handleSubmit} className='m-12 bg-blue-500' >update profile</Button>
              <Button onClick={() => setShowModal(true)} color={'red'} className='m-12 bg-blue-500' >Delete profile</Button>
            </div>

          </div>


          {/* Biography and Cover Letter */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Biography */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-lg font-semibold mb-2">Biography</h2>
                <textarea className="dark:bg-gray-800  max-h-24 resize-y"

                  id='biography'
                  defaultValue=
                  {currentUser.biography}
                  onChange={handleChange}
                />
              </Card>
              {/* Cover Letter */}
              <Card className="mt-6 ">
                <h2 className="text-lg font-semibold mb-2">Cover Letter</h2>
                <textarea className="dark:bg-gray-800"

                  id='coverLetter'
                  defaultValue=
                  {currentUser.coverLetter}
                  onChange={handleChange}
                />
              </Card>
            </div>
            {/* Sidebar */}
            <div>


              {/* Personal Info */}

              <Card>
                <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
                <ul className="text-gray-700">
                  <li className="flex justify-between dark:text-white"><span>Date of Birth:</span> <span ><input id='birthday' className='dark:bg-gray-800' onChange={handleChange} defaultValue={typeof currentUser.birthday === 'object' ? '' : currentUser.birthday} /></span></li>
                  <li className="flex justify-between dark:text-white"><span>Marital Status:</span> <span><input id='maritalStatus' className='dark:bg-gray-800' onChange={handleChange} defaultValue={currentUser.maritalStatus} /></span></li>
                  <li className="flex justify-between dark:text-white"><span>Gender:</span> <span><input id='gender' className='dark:bg-gray-800' defaultValue={currentUser.gender} onChange={handleChange} /></span></li>
                </ul>
              </Card>


              {/* Resume */}




              {/* Contact Information */}
              <Card className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                <ul className="text-gray-700">
                  <li className="flex items-center dark:text-white"><span className="mr-2"><GiWorld /></span> {currentUser.email}</li>

                  <li className="flex items-center dark:text-white"><span className="mr-2"><IoCall /></span> {currentUser.mobilenumber}</li>
                  <li className="flex items-center dark:text-white"><span className="mr-2"><MdEmail /></span> {currentUser.fullname}</li>
                </ul>
              </Card>
            </div>
          </div>


          {/* Social Media */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Follow me on Social Media</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500"><FaFacebook size="2em" /></a>
              <a href="#" className="text-blue-400"><FaTwitter size="2em" /></a>
              <a href="#" className="text-pink-600"><FaInstagram size="2em" /></a>
              <a href="#" className="text-blue-700"><FaLinkedin size="2em" /></a>

            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete} >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

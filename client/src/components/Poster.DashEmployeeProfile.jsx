import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Avatar, Badge, Alert, TextInput } from 'flowbite-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { GiWorld } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

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

  return (
    <div className='w-full'>

      <div className="bg-gray-100 p-8 min-h-screen">
        <div className="w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
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

                  <input id='username' onChange={handleChange} defaultValue={currentUser.username}/></h1>
                <p className="text-gray-600"></p>
              </div>
            </div>
            <div className='flex'>
              <Button onClick={handleSubmit} className='m-12 bg-blue-500' >update profile</Button>
              <Button color={'red'} className='m-12 bg-blue-500' >Delete profile</Button>
            </div>

          </div>


          {/* Biography and Cover Letter */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Biography */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-lg font-semibold mb-2">Biography</h2>
                <textarea className="text-gray-700  max-h-24 resize-y"

                  id='biography'
                  defaultValue=
                  {currentUser.biography}
                  onChange={handleChange}
                />
              </Card>
              {/* Cover Letter */}
              <Card className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Cover Letter</h2>
                <textarea className="text-gray-700"

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
                  <li className="flex justify-between"><span>Date of Birth:</span> <span ><input id='birthday' className='' onChange={handleChange} defaultValue={typeof currentUser.birthday === 'object' ? '' : currentUser.birthday} /></span></li>
                  <li className="flex justify-between"><span>Marital Status:</span> <span><input id='maritalStatus' onChange={handleChange} defaultValue={currentUser.maritalStatus} /></span></li>
                  <li className="flex justify-between"><span>Gender:</span> <span><input id='gender' defaultValue={currentUser.gender} onChange={handleChange} /></span></li>
                </ul>
              </Card>


              {/* Resume */}




              {/* Contact Information */}
              <Card className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                <ul className="text-gray-700">
                  <li className="flex items-center"><span className="mr-2"><GiWorld /></span> {currentUser.email}</li>

                  <li className="flex items-center"><span className="mr-2"><IoCall /></span> {currentUser.mobilenumber}</li>
                  <li className="flex items-center"><span className="mr-2"><MdEmail /></span> {currentUser.fullname}</li>
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
    </div>
  )
}

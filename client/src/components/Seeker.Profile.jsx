import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaEnvelope, FaPhone, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateStart, updateSuccess, updateFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';

export default function SeekerProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/jobseeker/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Seeker's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleDeleteSeeker = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/jobseeker/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate('/sign-in');
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/jobseeker/seeker-signout', {
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
    <div className='bg-blue-50 dark:bg-slate-800'>
        <div className='max-w-4xl mx-auto p-6 '>
      {/* Profile Section */}
      <div className='bg-white dark:bg-slate-700 rounded-lg p-6'>
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-800 dark:text-gray-100'>My Profile</h1>
        <div className='flex flex-col md:flex-row items-center md:justify-between mb-8'>
          {/* Profile Picture */}
          <div className='flex items-center gap-5'>
            
            <div className='relative w-40 h-40 rounded-full overflow-hidden shadow-lg cursor-pointer mb-4 flex items-center justify-center'
            >
              {imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress}%`}
                  styles={{
                    path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                  }}
                />
              )}
              <img
                src={imageFileUrl || currentUser?.profilePicture || 'path/to/default/avatar.jpg'}
                alt='Profile'
                className='w-full h-full object-cover self-center'
              />
            </div>
            {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
            <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
            <div>
              <button onClick={() => filePickerRef.current.click()} className='bg-slate-300 px-2 py-2 rounded-lg text-black hover:bg-slate-400'>Change Photo</button>
              <p className='text-sm'>JPG or PNG max file size 2MB</p>
            </div>
          </div>

        
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
    <div className='relative'>
      <label htmlFor='fullname' className='absolute -top-3.5 left-3 bg-white dark:bg-slate-700 dark:text-white px-1 text-blue-600 text-sm'>
        Full Name
      </label>
      <input
        type='text'
        id='fullname'
        placeholder='Full Name'
        defaultValue={currentUser?.fullname}
        onChange={handleChange}
        className='border-2 border-blue-600 dark:border-slate-100 focus:border-blue-800 dark:text-white dark:bg-slate-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-0'
      />
    </div>

    <div className='relative'>
      <label htmlFor='username' className='absolute -top-3.5 left-3 bg-white dark:bg-slate-700 dark:text-white px-1 text-blue-600 text-sm'>
        Username
      </label>
      <input
        type='text'
        id='username'
        placeholder='Username'
        defaultValue={currentUser?.username}
        onChange={handleChange}
        className='border-2 border-blue-600 dark:border-slate-100 focus:border-blue-800 dark:text-white dark:bg-slate-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-0'
      />
    </div>

    <div className='relative'>
      <label htmlFor='email' className='absolute -top-3.5 left-3 bg-white dark:bg-slate-700 dark:text-white px-1 text-blue-600 text-sm'>
        Email
      </label>
      <input
        type='email'
        id='email'
        placeholder='Email'
        defaultValue={currentUser?.email}
        onChange={handleChange}
        className='border-2 border-blue-600 dark:border-slate-100 focus:border-blue-800 dark:text-white dark:bg-slate-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-0'
      />
    </div>

    <div className='relative'>
      <label htmlFor='password' className='absolute -top-3.5 left-3 bg-white dark:bg-slate-700 dark:text-white px-1 text-blue-600 text-sm'>
        Password
      </label>
      <input
        type='password'
        id='password'
        placeholder='Password'
        onChange={handleChange}
        className='border-2 border-blue-600 dark:border-slate-100 focus:border-blue-800 dark:text-white dark:bg-slate-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-0'
      />
    </div>

    <div className='relative'>
      <label htmlFor='mobileNumber' className='absolute -top-3.5 left-3 bg-white dark:bg-slate-700 dark:text-white px-1 text-blue-600 text-sm'>
        Mobile Number
      </label>
      <input
        type='text'
        id='mobileNumber'
        placeholder='Mobile Number'
        defaultValue={currentUser?.mobileNumber}
        onChange={handleChange}
        className='border-2 border-blue-600 dark:border-slate-100 focus:-blue-800 dark:text-white dark:bg-slate-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-0'
      />
    </div>

    <button
      type='submit'
      className='w-full md:w-auto bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-lg'
    >
      Update Profile
    </button>
</form>


        {/* Status Alerts */}
        {updateUserSuccess && <Alert color='success' className='mt-2'>{updateUserSuccess}</Alert>}
        {updateUserError && <Alert color='failure' className='mt-2'>{updateUserError}</Alert>}
      </div>
  </div>
    </div>
  );
}

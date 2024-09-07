
import { useEffect, useState ,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Modal,  TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaEnvelope, FaPhone, FaUserAlt, FaUserCircle } from "react-icons/fa";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/user/userSlice';


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
<div className='mx-auto p-3 w-full'>
  <h1 className='my-7 ml-7 text-teal-500 text-left font-bold text-3xl'>Seeker Profile</h1>
  
  {/* Form container with vertical layout */}
  <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    {/* Profile Details Section */}
    <div className='w-full rounded-lg flex bg-teal-50 p-3'>
  {/* Profile Picture Section */}
  <div className='w-1/2 flex items-center justify-center'>
  
    <input
      type='file'
      accept='image/*'
      onChange={handleImageChange}
      ref={filePickerRef}
      hidden
    />
    <div
      className='relative w-60 h-60 cursor-pointer shadow-xl overflow-hidden rounded-full'
      onClick={() => filePickerRef.current.click()}
    >
      {imageFileUploadProgress && (
        <CircularProgressbar
          value={imageFileUploadProgress || 0}
          text={`${imageFileUploadProgress}%`}
          strokeWidth={5}
          styles={{
            root: {
              inline_size: '100%',
              block_size: '100%',
              position: 'absolute',
              in_set_block_start: 0,
              in_set_inline_start: 0,
            },
            path: {
              stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
            },
          }}
        />
      )}
      <img
        src={imageFileUrl || (currentUser && currentUser.profilePicture) || 'path/to/default/profilePicture.jpg'}
        alt='seeker'
        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
      />
    </div>
    {imageFileUploadError && (
      <Alert color='failure'>{imageFileUploadError}</Alert>
    )}
  </div>

  {/* Profile Details Section */}
  <div className='w-1/2 flex flex-col rounded-xl bg-blue-100 shadow-md z-10 mr-10 p-3 justify-center'>
    <div className='flex flex-col items-start p-4'>
      {/* Full Name */}
      <div className='flex items-center mb-2'>
        <FaUserCircle className="text-teal-500" size={30}/>
        <div className="block text-m font-bold text-gray-700 m-4 rounded-xl bg-slate-200 p-2 w-60">
          <strong>Full Name:</strong><br/><span className='text-slate-500'>{currentUser?.fullname || 'N/A'}</span>
        </div>
      </div>

      {/* Username */}
      <div className='flex items-center mb-2'>
        <FaUserAlt className="text-teal-500" size={30}/>
        <div className="block text-m font-bold text-gray-700 m-4 rounded-xl bg-slate-200 p-2 w-60">
          <strong>Username:</strong><br/><span className='text-slate-500'>{currentUser?.username || 'N/A'}</span>
        </div>
      </div>

      {/* Email */}
      <div className='flex items-center mb-2'>
        <FaEnvelope className="text-teal-500" size={30}/>
        <div className="block text-m font-bold text-gray-700 m-4 rounded-xl bg-slate-200 p-2 w-60">
          <strong>Email:</strong><br/><span className='text-slate-500'>{currentUser?.email || 'N/A'}</span>
        </div>
      </div>

      {/* Mobile Number */}
      <div className='flex items-center mb-2'>
        <FaPhone className="text-teal-500" size={30}/>
        <div className="block text-m font-bold text-gray-700 m-4 rounded-xl bg-slate-200 p-2 w-60">
          <strong>Mobile Number:</strong><br/><span className='text-slate-500'>{currentUser?.mobilenumber || 'N/A'}</span>
        </div>
      </div>
    </div>
  </div>
</div>


    {/* Update Section */}
    <div className='w-full flex flex-col p-12 bg-teal-50 rounded-lg'>
      <div className='p-3'>
        <TextInput
          type='text'
          id='fullname'
          placeholder='Full Name'
          defaultValue={currentUser?.fullname}
          onChange={handleChange}
        />
      </div>
      <div className='p-3'>
        <TextInput
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
      </div>
      <div className='p-3'>
        <TextInput
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
      </div>
      <div className='p-3'>
        <TextInput
          type='password'
          id='password'
          placeholder='Password'
          onChange={handleChange}
        />
      </div>
      <div className='p-3'>
        <TextInput
          type='text'
          id='mobilenumber'
          placeholder='Mobile Number'
          defaultValue={currentUser?.mobilenumber}
          onChange={handleChange}
        />
      </div>
      <Button
        type='submit'
        className='bg-blue-500'
        outline
        disabled={loading || imageFileUploading}
      >
        {loading ? 'Loading...' : 'Update'}
      </Button>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
    </div>
  </form>

  {/* Alerts */}
  {updateUserSuccess && (
    <Alert color='success' className='mt-5'>
      {updateUserSuccess}
    </Alert>
  )}
  {updateUserError && (
    <Alert color='failure' className='mt-5'>
      {updateUserError}
    </Alert>
  )}
  {error && (
    <Alert color='failure' className='mt-5'>
      {error}
    </Alert>
  )}
  
  {/* Modal */}
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
          Are you sure you want to delete your account?
        </h3>
        <div className='flex justify-center gap-4'>
          <Button color='failure' onClick={handleDeleteSeeker}>
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

  );
}
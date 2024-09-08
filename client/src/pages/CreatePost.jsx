import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase'; // Make sure your firebase.js or config file is imported properly
import   {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function CreatePost() {
  
  const [formData,setFormData] = useState([]);
  const [publishError,setPublishError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUploadProgress,setImageUploadProgress] = useState(null);
  const [imageUploadProgressFailure,setImageUploadFailure] = useState(null);
  const [file,setFile] = useState(null)

  const handleUploadImage = async()=>{
    try{
      if(!file){
        setImageUploadFailure('Please select an image')
        return ;
      }
      setImageUploadFailure(null);
      const storage=getStorage(app);
      const fileName = new Date().getTime()+'-'+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot) =>{
          const progress = 
          (snapshot.bytesTransferred/snapshot.totalBytes) *100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) =>{
          setImageUploadFailure('Image upload fial')
          setImageUploadProgress(null);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        {
          setImageUploadProgress(null);
          setImageUploadFailure(null);
          setFormData({...formData,image:downloadURL});
        });

      }
      )

    }
    catch(error){
      console.log(error);
      setImageUploadFailure("Image upload Failed")
      setImageUploadProgress(null);
      console.log(error);
    }
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();

    if (!formData.title || !formData.venue || !formData.date || !formData.sTime || !formData.eTime || !formData.salary,!formData.members, !formData.gender) {
      return setPublishError('All fields are required');
  
}
    try{

        formData.type = 'part';
        const res = await fetch('/api/post/create-post',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      });
      
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
    
      if(res.ok){

        setPublishError(null);
        navigate('/poster-dashboard?tab=profile');
      }
    }
    catch(error){
      setPublishError('something went wrong')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-blue-50 w-full
    ">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-slate-800 dark:text-white p-10 flex flex-col justify-center rounded-lg shadow-xl">
        <h1 className="text-center p-10 text-5xl font-bold ">Part Time Job</h1>
        <form onSubmit={handleSubmit}>

        <div className='flex gap-4 items-center justify-between border-4
          border-blue-500 border-dotted p-3'
          > 
            <FileInput type="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
            <button type='button' onClick={handleUploadImage} className='bg-blue-500 hover:bg-blue-600 px-1 py-2 rounded-lg text-white' size='sm' outline >
            {
            imageUploadProgress  ? (
              <div>
              <CircularProgressbar className='h-20 text-white bg-white' value={imageUploadProgress} text={`${imageUploadProgress||0}%`}/>
              </div>):('Upload image')
            }
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full py-2 px-4 border dark:bg-white dark:text-gray-600 border-gray-300 rounded-md"
              placeholder="Title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="w-full py-2 px-4 border dark:bg-white dark:text-gray-600  border-gray-300 rounded-md"
              placeholder="Venue"
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full py-2 px-4 border dark:bg-white dark:text-gray-600 border-gray-300 rounded-md"
              placeholder="Date"
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sTime">Start Time</label>
            <input
              type="time"
              id="sTime"
              name="sTime"
              className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-white dark:text-gray-600"
              onChange={(e) => setFormData({ ...formData, sTime: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eTime">End Time</label>
            <input
              type="time"
              id="eTime"
              name="eTime"
              className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-white dark:text-gray-600"
              onChange={(e) => setFormData({ ...formData, eTime: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary">Number</label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder='Number'
              className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-white dark:text-gray-600"
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder='Salary'
              className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-white dark:text-gray-600"
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>

          <div className="mb-4 flex gap-2 w-full">
            <div className="w-1/2">
              <label htmlFor="members">Members</label>
              <input
                type="number"
                id="members"
                name="members"
                max={10}
                min={1}
                className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-white dark:text-gray-600"
                onChange={(e) => setFormData({ ...formData, members: e.target.value })}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-white dark:text-gray-600"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="both">Both</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold transition duration-300 ease-in-out ${
              loading ? 'cursor-not-allowed opacity-75' : 'hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </div>
            ) : (
              'Create a Job'
            )}
          </button>
          {publishError && <p className="text-red-500 mt-3">{publishError}</p>}
        </form>
      </div>
    </div>
  )
}

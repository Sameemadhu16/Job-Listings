import React, { useState } from 'react'
import { TextInput,FileInput,Button,Textarea,Select } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app} from '../firebase'
import   {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function PosterCompanyInfo() {

  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const [publishError,setPublishError] = useState(null);
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
  const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!formData.title || !formData.companyName || !formData.essential || !formData.requirement || !formData.members) {
        return setPublishError('All fields are required');
    }

      try{
        formData.type = 'full';
        const res = await fetch('/api/post/create-post',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData),
        });
        const data = await res.json();
        
        if(!res.ok){
          setError(data.message);
        }

        if(res.ok){
          setError(null);
          navigate('/poster-dashboard?tab=profile');

        }
      }catch(error){
        setError(true);
      }
    }
  return (
    <div className=' bg-blue-50 dark:bg-gray-900'>
      <div className='p-3 max-w-3xl mx-auto min-h-screen '>
      <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold'>
            Create Full Time Job 
        </h1>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' id='title'
            className='flex-1' onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
          </div>
          <p className='font-semibold'>Banner Image :</p>
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
          <p className='font-semibold'>Description :</p>
          <Textarea placeholder='Write down your company here.Let the candidate know who we are' onChange={(e) => setFormData({ ...formData, description: e.target.value })}></Textarea>
          <TextInput type='text' placeholder='company' onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}></TextInput>
          <TextInput type='text'  placeholder='essentail' onChange={(e) => setFormData({ ...formData, essential: e.target.value })}></TextInput>
          <TextInput type='text'  placeholder='requirments' onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}></TextInput>

          <div className='bg-slate-100 '>
            <div className='p-3 max-w-3xl mx-auto bg-blue-50 dark:bg-gray-800'>
              <div className="flex flex-col flex-wrap gap-4 m-10" >
                <div className='flex flex-row gap-2'>

                  <div className='flex flex-wrap gap-2'>
                    <div className='text-sm font-semibold flex flex-col gap-2'>
                      <p className='text-sm font-semibold'>Team Size :</p>
                      <TextInput type="number" name="" id="" max={10} min={1} onChange={(e) => setFormData({ ...formData, members: e.target.value })}/>
                    </div>

                    <div className='text-sm font-semibold flex flex-col gap-2'>
                      <p>Year of Estabilishment :</p>
                      <TextInput placeholder='' type='date' onChange={(e) => setFormData({ ...formData, date: e.target.value })}></TextInput>
                    </div>

                    <div className='text-sm font-semibold flex flex-col gap-2'>
                      <p>Company Website :</p>
                      <TextInput type='url' placeholder='https://example.com' onChange={(e) => setFormData({ ...formData, companyLink: e.target.value })}></TextInput>
                    </div>

                    <div className='text-sm font-semibold flex flex-col gap-2'>
                        <p>Company Email :</p>
                        <TextInput type='email' placeholder='email' onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}></TextInput>
                    </div>
                  </div>

        
        </div>
        <div className='flex gap-5'>
        
        
        </div>
        
          </div>
        </div>
      </div>
        <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg text-white'>Post Job</button>
        {publishError && <p className="text-red-500 mt-3">{publishError}</p>}
      </form>
      
        
    </div>
    </div>
  )
}

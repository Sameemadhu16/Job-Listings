import React, { useState } from 'react'
import { TextInput,FileInput,Button,Textarea,Select } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";

export default function PosterCompanyInfo() {

  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const [publishError,setPublishError] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();

      

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
    <div className='bg-slate-100'>
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
            <FileInput type="file" accept='image/*' />
            <Button type='button' className='bg-blue-500 hover:bg-blue-500 text-white' size='sm' outline >
            upload image
            </Button>
          </div>
          <p className='font-semibold'>Description :</p>
          <Textarea placeholder='Write down your company here.Let the candidate know who we are' onChange={(e) => setFormData({ ...formData, description: e.target.value })}></Textarea>
          <TextInput type='text' placeholder='company' onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}></TextInput>
          <TextInput type='text'  placeholder='essentail' onChange={(e) => setFormData({ ...formData, essential: e.target.value })}></TextInput>
          <TextInput type='text'  placeholder='requirments' onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}></TextInput>

          <div className='bg-slate-100'>
        <div className='p-3 max-w-3xl mx-auto bg-gray-100'>
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

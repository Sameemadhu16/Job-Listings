import React, { useState } from 'react'
import { TextInput,FileInput,Button,Textarea,Select } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';

export default function PosterCompanyInfo() {

  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      try{
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
          navigate('/#');

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
            CREATE POST
        </h1>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title'
            className='flex-1'/>
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
          <Textarea placeholder='Write down your company here.Let the candidate know who we are'></Textarea>
          <TextInput type='text' placeholder='company'></TextInput>
          <TextInput type='text' placeholder='essentail'></TextInput>
          <TextInput type='text' placeholder='select type'></TextInput>
          <Button type='submit' cols={50} className='bg-blue-500 hover:bg-opacity-95 mt-3' >
            Submit
        </Button>
        
      </form>
        
    </div>
    </div>
  )
}

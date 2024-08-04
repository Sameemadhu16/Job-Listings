import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function CreatePost() {
  
  const [formData,setFormData] = useState({});
  const [publishError,setPublishError] = useState(null);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
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
      }
    }
    catch(error){
      setPublishError('something went wrong')
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-semibold'>
        Create a Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title'
          className='flex-1'
          onChange={(e) =>{
            setFormData({
              ...formData,title:e.target.value
            })
          }}
          />
        <TextInput type='text' placeholder='company' required id='company'
        className=''
        onChange={(e) => {
            setFormData({
                ...formData,companyName:e.target.value
            })
        }}
        />
        </div>
        <ReactQuill theme='snow'placeholder='Write something...' className='h-72 mb-12' required
        onChange={(value) =>{
          setFormData({...formData,essential:value})
        }}
        />
        <Button type='submit'  >
          Publish
        </Button>
        {publishError && <Alert color='failure'>{
          publishError
        }</Alert>}
      </form>
    </div>
  )
}

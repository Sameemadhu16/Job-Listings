import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';



export default function CreatePost() {
  
  const [formData,setFormData] = useState({});
  const [publishError,setPublishError] = useState(null);
  const {postId} = useParams();

  useEffect(()=>{
    try{
        const fetchPost = async () => {
            const res = await fetch(`/api/post/get-posts?postId=${postId}`);
            const data = await res.json();

            if(!res.ok){
                console.log(data.message);
                setPublishError(data.message)
                return;
            }
            if(res.ok && data.posts && data.posts.length > 0){
                setPublishError(null);
                setFormData(data.posts[0]);
            }
        }
        fetchPost();
    }catch(error){
        console.log(error.message);
    }
  },[postId])
  
  const handleSubmit = () => {
    e.preventDefault();
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-semibold'>
        Update a Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title'
          className='flex-1'
          value={formData.title}
          onChange={(e) =>{
            setFormData({
              ...formData,title:e.target.value
            })
          }}
          />
        <TextInput type='text' placeholder='company' required id='company'
        className=''
        value={formData.companyName}
        onChange={(e) => {
            setFormData({
                ...formData,companyName:e.target.value
            })
        }}
        />
        </div>
        <ReactQuill theme='snow'placeholder='Write something...' className='h-72 mb-12' required
        value={formData.essential}
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

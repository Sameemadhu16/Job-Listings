import React, { useState , useEffect} from 'react'
import { TextInput,FileInput,Button,Textarea,Select } from 'flowbite-react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app} from '../firebase'
import   {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useSelector} from 'react-redux';


export default function FpostUpdate() {

    const [formData,setFormData] = useState({});
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    const [publishError,setPublishError] = useState(null);
    const [imageUploadProgress,setImageUploadProgress] = useState(null);
    const [imageUploadProgressFailure,setImageUploadFailure] = useState(null);
    const [file,setFile] = useState(null)
    const {postId} = useParams();
    const [loading,setLoading] = useState(false);
    const {currentUser}= useSelector((state)=>state.user);
    const [post, setPost] = useState({

        title: '',
        image: '',
        date: '',
        description: '',
        requirement: '',
        companyName: '',
        companyEmail: '',
        companyLink: '',
        essential:'',
        members:0,
    });


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
                setPost({... post,image:downloadURL});
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
    useEffect(() => {
        
            try{
                const fetchJobs = async () => {
                    const res = await fetch(`/api/post/get-job/${postId}`)
                    const data = await res.json();
                    
    
                    if(res.ok){
                        setLoading(false)
                        setPost(data)
                        
                        
                    }
                }
                fetchJobs();
            }catch(error){
                console.log(error)
            }
    
            
        
    },[postId])

    const handleChange = (e) =>{

        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'time' || e.target.type === 'date' || e.target.type === 'email' , e.target.type === 'file'){
            setPost({
                ...post,
                [e.target.id]:e.target.value
            })
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(post)
        try{
          const res = await fetch(`/api/post/update-post/${postId}/${currentUser._id}`,{
            method:'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(post),
          });
          const data = await res.json();
          if(!res.ok){
            setPublishError(data.message);
            return;
          }
         
          if(res.ok){
            setPublishError(null);
            navigate(`/full-post/${post._id}`);
          }
        }
        catch(error){
          setPublishError('something went wrong')
        }
      };


    return (
    <div className='bg-slate-100'>
      <div className='p-3 max-w-3xl mx-auto min-h-screen '>
      <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit} >
        <h1 className='text-3xl font-bold'>
            Change Job Details
        </h1>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' id='title' name='title'
            className='flex-1' onChange={handleChange} value={post.title}/>
          </div>
          <p className='font-semibold'>Banner Image :</p>
          <div className='flex gap-4 items-center justify-between border-4
          border-blue-500 border-dotted p-3'
          > 
            <FileInput type="file" name='image' id='image' accept='image/*' onChange={handleChange} />
            <button type='button' className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-lg' size='sm' onClick={handleUploadImage} disabled={imageUploadProgress}>
           {
            imageUploadProgress  ? (<div>
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress||0}%`}/>
            </div>):('Upload image')
           }
          </button>
            {post.image && (
                <img
                    src={post.image}
                    alt='upload'
                    className=' h-20  object-cover'
                />
        )} 
        </div>
            <p className='font-semibold'>Description :</p>
            <TextInput type='text' placeholder='Write down your company here.Let the candidate know who we are' name='description' id='description'  onChange={handleChange} value={post.description}></TextInput>
            <TextInput type='text' placeholder='company' name='companyName'  id='companyName' onChange={handleChange} value={post.companyName}></TextInput>
            <TextInput type='text'  placeholder='essential' name='essential'  id='essential'  onChange={handleChange} value={post.essential}></TextInput>
            <TextInput type='text'  placeholder='requirments' name='requirement'  id='requirement'  onChange={handleChange} value={post.requirement}></TextInput>

            <div className='bg-slate-100'>
                <div className='p-3 max-w-3xl mx-auto bg-gray-100'>
                    <div className="flex flex-col flex-wrap gap-4 m-10" >
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-wrap gap-2'>
                                <div className='text-sm font-semibold flex flex-col gap-2'>
            <p className='text-sm font-semibold'>Team Size :</p>
            <TextInput type="number" name="members" id="members" max={10} min={1} onChange={handleChange} value={post.members}/>
            </div>
            <div className='text-sm font-semibold flex flex-col gap-2'>
              <p>Year of Estabilishment :</p>
              <TextInput placeholder='' name='date' id='date' type='date' onChange={handleChange} value={post.date}></TextInput>
          </div>
          <div className='text-sm font-semibold flex flex-col gap-2'>
            <p>Company Website :</p>
            <TextInput type='url' name='companyLink' id='companyLink' placeholder='https://example.com' onChange={handleChange} value={post.companyLink}></TextInput>
        </div>

        <div className='text-sm font-semibold flex flex-col gap-2'>
            <p>Company Email :</p>
            <TextInput type='email' name='companyEmail' id='companyEmail' placeholder='email' onChange={handleChange} value={post.companyEmail}></TextInput>
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

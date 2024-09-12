import { Alert, Button, FileInput, Select, TextInput    } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';




export default function CreatePost() {

  const [publishError,setPublishError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadFailure, setImageUploadFailure] = useState(null);
  const {postId} = useParams();
  const {currentUser}= useSelector((state)=>state.user);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const userId = currentUser._id;
  const [file, setFile] = useState(null);

  const [post, setPost] = useState({
    title: '',
    venue: '',
    date: '',
    sTime: '',
    eTime: '',
    salary: '',
    members: '',
    gender: '',
    image:'',
    description:''
  });

  const handleUploadImage = async () => {
    if (!file) {
        setImageUploadFailure('Please select an image');
        return;
    }
    setImageUploadFailure(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
            setImageUploadFailure('Image upload failed');
            setImageUploadProgress(null);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setPost({ ...post, image: downloadURL });
                setImageUploadProgress(null);
                setImageUploadFailure(null);
            });
        }
    );
};

  useEffect(() => {
    console.log(postId)
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

    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'time' || e.target.type === 'date'){
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
        navigate(`/post/${post._id}`);
      }
    }
    catch(error){
      setPublishError('something went wrong')
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 dark:bg-slate-700 flex items-center justify-center p-10">
      <div className="w-full bg-blue-50 dark:bg-slate-600 md:w-1/2 lg:w-2/3  p-10 flex flex-col justify-center rounded-lg shadow-xl">
        <h1 className="text-center p-10 text-4xl font-bold">Change Job Details</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full py-2 dark:text-slate-500 px-4 border border-gray-300 rounded-md"
              placeholder="Title"
              onChange={handleChange}
              value={post.title}
            />
          </div>

          <div className='flex gap-4 items-center justify-between border-4 border-blue-500 border-dotted p-3'>
                        <FileInput type="file" name='image' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                        <button
                            type='button'
                            className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-lg'
                            size='sm'
                            onClick={handleUploadImage}
                            disabled={imageUploadProgress}
                        >
                            {imageUploadProgress ? (
                                <CircularProgressbar className='h-20 bg-white' value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            ) : ('Upload image')}
                        </button>
                        {post.image && (
                            <img src={post.image} alt='upload' className='h-20 object-cover' />
                        )}
                    </div>

          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="descrpition"
              className="w-full py-2 px-4 border dark:bg-white dark:text-gray-600 border-gray-300 rounded-md"
              placeholder="Description"
              value={post.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="w-full py-2 dark:text-slate-500 px-4 border border-gray-300 rounded-md"
              placeholder="Venue"
              onChange={handleChange}
              value={post.venue}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full dark:text-slate-500 py-2 px-4 border border-gray-300 rounded-md"
              placeholder="Date"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sTime">Start Time</label>
            <input
              type="time"
              id="sTime"
              name="sTime"
              value={post.sTime}
              className="w-full py-2 px-4 border dark:text-slate-500 border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eTime">End Time</label>
            <input
              type="time"
              id="eTime"
              name="eTime"
              value={post.eTime}
              className="w-full py-2 px-4 border dark:text-slate-500 border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={post.salary}
              className="w-full py-2 px-4 border dark:text-slate-500 border-gray-300 rounded-md"
              onChange={handleChange}
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
                value={post.members}
                className="w-full py-2 dark:text-slate-500 px-4 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="gender">Gender</label>
              <select
              type="text"
                id="gender"
                name="gender"
                value={post.gender}
                className="w-full py-2 px-4 border dark:text-slate-500 border-gray-300 rounded-md"
                onChange={handleChange}
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
              'Change Details'
            )}
          </button>
          {publishError && <p className="text-red-500 mt-3">{publishError}</p>}
        </form>
      </div>
    </div>
  )
}

import { Alert, Button, FileInput, Select, TextInput    } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function CreatePost() {

  const [publishError,setPublishError] = useState(null);
  const {postId} = useParams();
  const {currentUser}= useSelector((state)=>state.user);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const userId = currentUser._id

  const [post, setPost] = useState({
    title: '',
    venue: '',
    date: '',
    sTime: '',
    eTime: '',
    salary: '',
    members: '',
    gender: 'both'
  });
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
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-10 flex flex-col justify-center rounded-lg shadow-xl">
        <h1 className="text-center p-10 text-5xl font-bold">Part Time Job</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
              placeholder="Title"
              onChange={handleChange}
              value={post.title}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
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
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
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
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
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
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
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
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
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
                className="w-full py-2 px-4 border border-gray-300 rounded-md"
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
                className="w-full py-2 px-4 border border-gray-300 rounded-md"
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

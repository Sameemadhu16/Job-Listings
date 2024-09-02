import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

export default function CreatePost() {
  
  const [formData,setFormData] = useState([]);
  const [publishError,setPublishError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
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
        navigate(`/post-page/${data.title}`);
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sTime">Start Time</label>
            <input
              type="time"
              id="sTime"
              name="sTime"
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
              onChange={(e) => setFormData({ ...formData, sTime: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eTime">End Time</label>
            <input
              type="time"
              id="eTime"
              name="eTime"
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
              onChange={(e) => setFormData({ ...formData, eTime: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              name="salary"
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
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
                className="w-full py-2 px-4 border border-gray-300 rounded-md"
                onChange={(e) => setFormData({ ...formData, members: e.target.value })}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="w-full py-2 px-4 border border-gray-300 rounded-md"
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

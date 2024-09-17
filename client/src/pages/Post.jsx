import React ,{useEffect,useState} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import JobPostCard from '../components/JobPostCard';
import { useSelector } from 'react-redux'
import {FaMapMarkerAlt,FaBath,FaBed,FaChair,FaParking, FaClock, FaStopwatch, FaUser, FaCalendar, FaMale, FaGenderless} from 'react-icons/fa'




export default function Post() {

    const {postId} = useParams();
    const [post,setPost]=useState([]);
    const [recentPosts,setRecentPosts]=useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user);
    const userId = currentUser.currentUser._id
    
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


    useEffect(() => {
        try{
            const fetchPosts = async () => {
                const res = await fetch(`/api/post/get-posts?limit=3`);
                const data = await res.json();

                if(res.ok){
                    setLoading(false);
                    setRecentPosts(data.posts);
                }
            } 
            fetchPosts();
        }catch(error){
            console.log(error.message);
        }
    },[]);

    const handleUpdateClick = () => {
        navigate(`/update-post/${post._id}`); 
    };

    if(loading){
        return <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl'/>
        </div>
    }

    return (
    <main>
  {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
  {error && <p className="text-center my-7 text-2xl text-red-600">Something went wrong!</p>}
  {post && !loading && !error && (
    <div className=" bg-blue-100 dark:bg-slate-700 flex items-start justify-center p-4">
    {/* Two Column Layout */}
    <div className="w-full md:w-4/5 lg:w-11/12 grid grid-cols-1 md:grid-cols-2 gap-3 p-8 bg-blue-50 dark:bg-slate-800 rounded-lg shadow-lg">
      
      {/* Left Column: Image Section */}
      <div className="flex items-center justify-center">
        <img src={post.image} alt="" className="rounded-lg shadow-lg object-cover max-w-full h-auto md:h-96" />
      </div>
      
      {/* Right Column: Post Details Section */}
      <div className="flex flex-col gap-3 justify-center">
        
          <h1 className="text-3xl font-semibold mb-4 dark:text-white">
          
            {post.title} - LKR {post.salary}
          </h1>
          <p className="flex items-center text-slate-600 text-sm dark:text-slate-200 mb-4">
            <FaMapMarkerAlt className="text-green-700 dark:text-slate-200 mr-2" />
            {post.venue}
          </p>
          
          <div className="flex gap-4 mb-4">
            <p className="bg-red-900 text-white text-center py-2 px-4 rounded-md">
              {post.type === 'part' ? 'Part Time' : 'For Sale'}
            </p>
  
          {
            currentUser.currentUser.role === "jobPoster" && 
              <button type="button" onClick={handleUpdateClick} className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md">
              Change Details
            </button>
          }
          </div>
  
          <ul className="space-y-3 text-green-800 text-sm font-semibold gap-5">
            <div className='flex gap-5'>
                <li className="flex items-center dark:text-slate-200">
                <FaCalendar className="text-lg mr-2" />
                Date: {new Date(post.date).toLocaleDateString()}
                </li>
                <li className="flex items-center dark:text-slate-200">
                <FaClock className="text-lg mr-2" />
                Start At: {post.sTime}
                </li>
                <li className="flex items-center dark:text-slate-200">
                <FaClock className="text-lg mr-2" />
                End At: {post.eTime}
                </li>

            </div>
            <div className='flex gap-5'>
                <li className="flex items-center dark:text-slate-200">
                <FaStopwatch className="text-lg mr-2" />
                Duration: {parseInt(post.sTime) < parseInt(post.eTime) 
                    ? parseInt(post.eTime) - parseInt(post.sTime)
                    : 24 - (parseInt(post.sTime) - parseInt(post.eTime))}h
                </li>
                <li className="flex items-center dark:text-slate-200">
                <FaUser className="text-lg mr-2" />
                Members: {post.members}
                </li>
                <li className="flex items-center dark:text-slate-200">
                <FaMale className="text-lg mr-2" />
                {post.gender === 'male' ? 'Male' : post.gender === 'female' ? 'Female' : 'Both'}
                </li>
            </div>
          </ul>
          <p className='mt-3 dark:text-gray-300 text-gray-600 font-semibold'><span className=' dark:text-white font-bold'>Description : </span>{post.description}</p>
      </div>
    </div>
  </div>
  
  )}
</main>



    )
}

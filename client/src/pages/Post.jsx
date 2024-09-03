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
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl text-red-600'>something went wrong!</p>}
        {post && !loading && !error &&(
            <>
            <div className='flex items-center justify-center'>
                <img src={post.image} alt="" className='max-w-full max-h-full' />
            </div>
            
            <div className='p-4'>
            <h1 className='text-3xl font-semibold'>
                {post.title}{' - LKR '}{post.salary}
            </h1>
            <p className='flex items-center text-center  gap-1 text-slate-600  text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {post.venue}
            </p>
            <div className='flex gap-4 py-3'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {post.type === 'part' ? 'Part Time' : 'For Sale'}
                </p>

                <button type='button' onClick={handleUpdateClick} className='bg-green-700 w-full max-w-[200px] hover:bg-green-800 text-white text-center p-1 rounded-md'>
                    Change Details
                </button>
                
            </div>
            
            <ul className='flex gap-4 text-green-800 text-sm flex-wrap items-center font-semibold mt-4'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaCalendar className='text-lg' />
                        Date : {new Date(post.date).toLocaleDateString()}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>

                <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaClock className='text-lg' />
                        Start At : {post.sTime}
                </li>

                    <FaClock className='text-lg' />
                    End At : {post.eTime }
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaStopwatch className='text-lg' />
                        Duration : {
                            parseInt(post.sTime) < parseInt(post.eTime) ?  parseInt(post.eTime)-parseInt(post.sTime): 24 - (parseInt(post.sTime) - parseInt(post.eTime))
                        }h
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaUser className='text-lg' />
                    Members : {post.members}
                </li>

                <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaMale className='text-lg' />
                    { 
                        post.gender === 'male' ? 'Male' : 
                        post.gender === 'female' ? 'Female' : 
                        'Both'
                    }

                </li>
            </ul>
            
        
            </div>

            </>
        )}
        
    </main>
    )
}

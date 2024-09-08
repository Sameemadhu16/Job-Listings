import React ,{useEffect,useState} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import JobPostCard from '../components/JobPostCard';
import { useSelector } from 'react-redux'
import {FaMapMarkerAlt,FaBath,FaBed,FaChair,FaParking, FaClock, FaStopwatch, FaUser, FaCalendar, FaMale, FaGenderless, FaMagnet, FaMap, FaPlayCircle, FaRoute, FaPaperPlane, FaPaperclip} from 'react-icons/fa'




export default function Fpost() {

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
        navigate(`/update-full-post/${post._id}`); 
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
        <div className=" bg-gray-100 dark:bg-slate-700 flex items-start justify-center p-4">
            {/* Two Column Layout */}
            <div className="w-full md:w-4/5 lg:w-11/12 grid grid-cols-1 md:grid-cols-2 gap-3 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                {/* Left Column: Image Section */}
                <div className='"flex items-center justify-center"'>
                    <img src={post.image} alt="" className='max-w-full max-h-full' />
                </div>
                
                {/* Right Column: Post Details Section */}
                <div className='flex flex-col gap-3 justify-center'>
                    <h1 className='text-3xl font-semibold'>
                        {post.title}
                    </h1>
                    <p className='flex items-center text-center  gap-1 text-slate-600 dark:text-white  text-sm'>
                        <FaPaperPlane className='text-green-700 dark:text-white' />
                        {post.companyName}
                    </p>
                    <div className='flex gap-4 py-3'>
                        <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        {post.type === 'part' ? 'Part Time' : 'Full Time'}
                        </p>

                        <button type='button' onClick={handleUpdateClick} className='bg-green-700 w-full max-w-[200px] hover:bg-green-800 text-white text-center p-1 rounded-md'>
                            Change Details
                        </button>
                        
                    </div>
            
                    <ul className='flex gap-4 text-green-800 text-sm flex-wrap items-center font-semibold mt-4'>
                        <li className='flex items-center gap-1 whitespace-nowrap dark:text-white'>
                            <FaCalendar className='text-lg' />
                                Date : {new Date(post.date).toLocaleDateString()}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap dark:text-white'>
                        <FaUser className='text-lg' />
                            Members : {post.members}
                        </li>
                    </ul>
                    <p className='mt-3 dark:text-gray-300 text-gray-600 font-semibold'><span className=' dark:text-white font-bold'>Description : </span>{post.description}</p>
                    <p className='mt-3 dark:text-gray-300 text-gray-600 font-semibold'><span className=' dark:text-white font-bold'>Essentials : </span>{post.essential}</p>
                    <p className='mt-3 dark:text-gray-300 text-gray-600 font-semibold'><span className=' dark:text-white font-bold'>Requirement : </span>{post.requirement}</p>
                </div>
            </div>

        </div>
        )}
        
    </main>
    )
}

import React, { useEffect, useState } from "react";
import seekerImage from "../images/seeker.jpg"; // Path to the job seeker image
import ringsImage from "../images/ring-r.png"; // Path to the new rings image with transparent background
import { Spinner } from "flowbite-react";
import { FaBriefcase } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import JobPostCard from "../components/JobPostCard";

const Home = () => {
    const [loading,setLoading] = useState(false);
    const [showMore,setShowMore] = useState(false);
    const [posts,setPosts] = useState([]);
    const navigate = useNavigate();
    const [pJob,setPJob] = useState(0);
    const [fJob,setFJob] = useState(0);
    const [tPosts,setTPosts] = useState(0);
    const [first,setFirst] = useState([]);
    const [users,setUsers] = useState(0);

    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true);
            setShowMore(false);
            const res = await fetch(`/api/post/get-posts`);
            const data = await res.json();
            
            
            if(res.ok){
                setShowMore(true);
                setPosts(data.posts);
                setTPosts(data.totalPosts);
                setLoading(false);
                
                const part = data.posts.filter(post => post.type === 'part');
                const pJob = part.length;
                setPJob(pJob);

                const full = data.posts.filter(post => post.type == 'full');
                const fJob = full.length;
                setFJob(fJob);

                

                // Sort by 'createdAt' (assuming 'createdAt' is a date string)
                const sortedFull = full.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Get the first 3 most recent posts
                const recentFullPosts = sortedFull.slice(0, 6);
                setFirst(recentFullPosts)
                
            }
            if(!res.ok){
              console.log(data.message);
              setLoading(false);
            }
        };
        fetchPosts();
    },[posts._id])

    const hanldeNavigate = () => {
      navigate('/search')
    }

    useEffect(() => {
      setLoading(true);
      const fetchUsers = async () => {
        const res = await fetch('/api/auth/get-users');
        const data = await res.json();

        if(res.ok){
          setUsers(data.totalUsers);
          setLoading(false);
        }
        if(!res.ok){
          setLoading(false);
          console.log(data.message);
        }
      }
      fetchUsers();
    },[])
  return (

    
    <div className="relative flex flex-col items-center bg-blue-50 dark:bg-slate-700 min-h-screen p-4 lg:p-10">
      {loading && (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner className="text-center" />
                </div>
            )}
      {/* Main Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-10/12 mx-auto">
            {/* Text Section */}
            <div className="text-center lg:text-left lg:w-1/2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    Secure Your Career Path. You’re Worth It.
                </h1>
                <p className="mt-4 text-lg text-gray-700 dark:text-slate-200">
                    Empowering Ambitious Job Seekers with Comprehensive Tools and
                    Resources to Discover, Apply, and Secure Their Dream Jobs.
                </p>
                <div className=" mt-6  flex flex-col items-center lg:flex-row gap-2">
                    
                    <button onClick={hanldeNavigate}   className="px-10 text-blue-800 dark:text-blue-200 font-bold text-lg rounded-lg">
                    Explore...
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className="relative mt-10 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
                {/* Decorative Background */}
                <div className="absolute inset-0 -right-10 w-72 h-72 lg:w-96 lg:h-96 ml-14">
                    <img
                    src={ringsImage}
                    alt="Decorative Rings"
                    className="w-full h-full object-contain ml-7"
                    />
                </div>

                {/* Job Seeker Image */}
                <div className="mr-12">
                    <img
                        src={seekerImage}
                        alt="Job Seeker"
                        className="relative mr-16 z-8 w-72 h-72 lg:w-95 lg:h-95 object-cover rounded-full shadow-lg"
                    />
                </div>
    

                {/* Job Posts Info Box */}
                <div className="absolute top-0 right-0 bg-white dark:bg-slate-200 p-2 rounded shadow-md mt-4 mr-10">
                    <span className="block text-sm z-10 font-medium text-gray-800">
                    {tPosts}+ All Jobs Post 
                    </span>
                </div>
            </div>

        </div>

      {/* Footer Statistics Section */}
      <footer className="w-full bg-white dark:bg-slate-800 py-6 mt-20 shadow-lg ">
        <div className="flex justify-around w-full lg:w-10/12 mx-auto">
          <div className="text-center">
            <div className=" flex items-center gap-1">
                <FaBriefcase className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800 dark:text-slate-200">{fJob}+</span>
            </div>
            <span className="text-gray-500 dark:text-white">Full Time Jobs</span>
          </div>
          <div className="text-center ">
            <div className="flex items-center gap-1">
                <FaBriefcase className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800 dark:text-slate-200">{pJob}+</span>
            </div>
            <span className="text-gray-500 dark:text-white">Part Time Jobs</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
                <FaUserTie className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800 dark:text-slate-200">{users}+</span>
            </div>
            <span className="text-gray-500 dark:text-white">Users</span>
          </div>
        </div>
      </footer>

    <div className="flex flex-wrap gap-2 mt-3 justify-center">
      {
        first.map((post)=>(
          <JobPostCard post={post}/>
        ))
      }
      
    </div>
    </div>
  );
};

export default Home;

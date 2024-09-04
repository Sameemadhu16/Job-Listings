import React, { useEffect, useState } from "react";
import seekerImage from "../images/seeker.jpg"; // Path to the job seeker image
import ringsImage from "../images/ring-r.png"; // Path to the new rings image with transparent background
import { Button, TextInput } from "flowbite-react";
import { FaBriefcase } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [loading,setLoading] = useState(false);
    const [showMore,setShowMore] = useState(false);
    const [posts,setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true);
            setShowMore(false);
            const res = await fetch(`/api/post/get-posts`);
            const data = await res.json();
            if(data.length > 8){
                setShowMore(true);
            }
            else{
                setShowMore(false);
            }
                setPosts(data);
                setLoading(false);
        };
        fetchPosts();
    },[posts._id])

    const hanldeNavigate = () => {
      navigate('/search')
    }
  return (
    <div className="relative flex flex-col items-center bg-blue-50 min-h-screen p-4 lg:p-10">
      {/* Main Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-10/12 mx-auto">
            {/* Text Section */}
            <div className="text-center lg:text-left lg:w-1/2">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    Secure Your Career Path. You’re Worth It.
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    Empowering Ambitious Job Seekers with Comprehensive Tools and
                    Resources to Discover, Apply, and Secure Their Dream Jobs.
                </p>
                <div className=" mt-6  flex flex-col items-center lg:flex-row gap-2">
                    
                    <button onClick={hanldeNavigate}   className="px-10 text-blue-800 font-bold text-lg rounded-lg">
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
                <div className="absolute top-0 right-0 bg-white p-2 rounded shadow-md mt-4 mr-10">
                    <span className="block text-sm z-10 font-medium text-gray-800">
                    120+ Jobs Post Daily
                    </span>
                </div>
            </div>

        </div>

      {/* Footer Statistics Section */}
      <footer className="w-full bg-white py-6 mt-20 shadow-lg ">
        <div className="flex justify-around w-full lg:w-10/12 mx-auto">
          <div className="text-center">
            <div className=" flex items-center gap-1">
                <FaBriefcase className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800">586k+</span>
            </div>
            <span className="text-gray-500">Fulltime Jobs</span>
          </div>
          <div className="text-center ">
            <div className="flex items-center gap-1">
                <AiOutlineClockCircle className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800">586k+</span>
            </div>
            <span className="text-gray-500">Parttime Jobs</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
                <FaUserTie className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800">586k+</span>
            </div>
            <span className="text-gray-500">Jobseekers</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

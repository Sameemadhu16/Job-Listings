import React, { useEffect, useState } from "react";
import seekerImage from "../images/seeker.jpg"; // Path to the job seeker image
import ringsImage from "../images/ring-r.png"; // Path to the new rings image with transparent background
import { Button, TextInput } from "flowbite-react";
import { FaBriefcase } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa'

const Home = () => {
    const [loading,setLoading] = useState(false);
    const [showMore,setShowMore] = useState(false);
    const [posts,setPosts] = useState([]);
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
                    <TextInput
                    type="text"
                    placeholder="Job Title Keywords"
                    className="px-4 py-2 rounded-l-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button gradientMonochrome="teal" className="hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Explore
                    </Button>
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
                <FaBriefcase className="text-teal-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800">586k+</span>
            </div>
            <span className="text-gray-500">Fulltime Jobs</span>
          </div>
          <div className="text-center ">
            <div className="flex items-center gap-1">
                <AiOutlineClockCircle className="text-teal-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800">586k+</span>
            </div>
            <span className="text-gray-500">Parttime Jobs</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
                <FaUserTie className="text-teal-500" size={24} />
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

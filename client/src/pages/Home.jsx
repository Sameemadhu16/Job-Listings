import React,{ useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import {Spinner} from 'flowbite-react';
import SeekerCartPost from '../components/Seeker.cartPost';
import logo from '../images/Jobpilot.png';


export default function Home() {

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
        <div>
            <div className='py-28 px-20'>
                <div className='text-3xl lg:text-5xl '>
                <img src={logo} className="mr-3 h-6 sm:h-28 rounded-full" alt="jobpilot-logo" />
                    <p className=''>
                        <span className='text-black dark:text-white font-bold'>
                        The  {' '}
                        </span>
                        <span className='text-blue-700 font-bold'>
                            Most Complete 
                        </span>
                    </p>
                    <p className='text-black dark:text-white font-bold'>
                        Job Listings In The World
                    </p>
                </div>
                <p className='text-sm py-4 text-gray-600 dark:text-white font-sans'>
                    Discover the job you want at top companies
                </p>
            </div>
        </div>
    )
}

import React,{ useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import {Spinner} from 'flowbite-react';
import SeekerCartPost from '../components/Seeker.cartPost';


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
     <p className=''>
     <span className='text-slate-500 font-bold'>
     Find your next {' '}
     </span>
     <span className='text-slate-700 font-bold'>
     perfect
     </span>
     </p>
      <p className='text-slate-500 font-bold'>
     job with ease
     </p>
     </div>
     <p className='text-sm py-4 text-gray-400 font-sans'>
      Jobpilot will help you find your home fast, easy and comfortable.Our expert support are always available.
      </p>
      <Link className='text-blue-800 font-semibold cursor-pointer hover:underline' to={'/search'}>Let's Start now...</Link>
    
    </div>
    
    <div>
      <img src="https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2022/06/30125154/How-to-Get-a-Job-Where-You-Used-to-Work.jpg" alt="home page photo" 
      className=''/>
    </div>

    <div className=''>
          <h1 className='text-3xl font-bold text-slate-700 p-4'>Listing result:</h1>
          <div className='p-7 flex flex-wrap gap-4'>
              {!loading && posts.length === 0 && (
                      <p className='text-lg text-center text-slate-700'>No result found..!</p>
                  )
              }
              {
                  loading && ( 
                     <Spinner size='xl'/>
                  )
              }

            </div>
          <div className='text-center mb-4'>
          {showMore && (
              <button onClick={onShowMoreClick} className='text-green-600 hover:underline'> Show More</button>
          )}
          </div>
      </div>
  </div>
  )
}

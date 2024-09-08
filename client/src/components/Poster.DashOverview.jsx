import { Table , Modal , Button  } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { PiHandbagSimpleLight } from 'react-icons/pi'
import { TiNews } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import SeekerCartPost from '../components/Seeker.cartPost'

export default function PosterDashOverview() {

    const [showMore, setShowMore] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error,setError] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [postIdDelete,setPostIdDelete] = useState(' ')
    const [loading,setLoading] = useState(false)
    const [pJob,setPJob] = useState(0);
    const [fJob,setFJob] = useState(0);
    
    const currentUser = useSelector((state) =>state.user)

    

    useEffect(() => {
        const fetchPosts = async () => {
            
            try {
                const res = await fetch(`/api/post/get-post/${currentUser.currentUser._id}`);
                const data = await res.json();

                if (res.ok) {
                    
                    setPosts(data.allPost);
                    console.log(data.allPost.length)

                    const part = data.allPost.filter(post => post.type === 'part');
                    const pJob = part.length;
                    setPJob(pJob);

                    const full = data.allPost.filter(post => post.type == 'full');
                    const fJob = full.length;
                    setFJob(fJob);

                    
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                setError(error)
            }
        };
        fetchPosts();
        
    },[currentUser.currentUser._id]);

    const deleteJob  = async () => {

        try{
            const res =  await fetch(`api/post/delete-post/${postIdDelete}/${currentUser.currentUser._id}`,{
                method:'DELETE',
            });
            const data = await res.json();

            if(!res.ok){
                console.log(data.message);
            }else{
                setPosts((prev) =>
                prev.filter((post)=>post._id !== postIdDelete))
                setShowModal(false);
            }
        }catch(error){
            setError(error);
        }
    }

    

    
  return (
    <div className=' w-full bg-blue-50 dark:bg-slate-700 '>
    <div className='flex-wrap flex gap-4 m-8'>
        
    <div className='w-full flex gap-4 items-center  px-4 py-6'>
        <div className='flex flex-col p-4 bg-gradient-to-r from-blue-100 to-blue-200 gap-4 md:w-72 w-full rounded-lg shadow-lg transition-all hover:shadow-xl'>
            <div className='flex justify-between items-center'>
            <div>
                <h3 className='text-black text-3xl font-bold'>{pJob}</h3>
                <p className='text-slate-600'>Your Part Time Jobs</p>
            </div>
            <PiHandbagSimpleLight className='bg-blue-500 text-white rounded-full text-6xl p-4 shadow-md transition-all transform hover:scale-105' />
            </div>
        </div>

        <div className='flex flex-col p-4 bg-gradient-to-r from-orange-100 to-orange-200 gap-4 md:w-72 w-full rounded-lg shadow-lg transition-all hover:shadow-xl'>
            <div className='flex justify-between items-center'>
            <div>
                <h3 className='text-black text-3xl font-bold'>{fJob}</h3>
                <p className='text-slate-600'>Your Full Time Jobs</p>
            </div>
            <TiNews className='bg-orange-500 text-white rounded-full text-6xl p-4 shadow-md transition-all transform hover:scale-105' />
            </div>
        </div>
        </div>

    </div>
    
    <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center m-1 '>
        
            <div className='flex flex-col  shadow-md p-2 rounded-md dark:bg-gray-800 w-full m-20'>
                <h1 className='font-bold text-xl mb-3 text-center'>Jobs You Created</h1>
                <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner aria-label="Loading" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center w-full">
            {posts.length > 0 ? (
              posts.map(post => (
                <>
                    <div className="flex justify-center w-full">
                        <SeekerCartPost key={post._id} post={post} ShowAddcart={true} />
                    </div>
                    <button className='bg-red-700 hover:bg-red-800 px-2 py-1 rounded-lg text-white' onClick={() => {setShowModal(true) 
                        setPostIdDelete(post._id)}}>DELETE</button>
                </>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center">No jobs available</p>
            )}
          </div>
        )}
      </div>
                    
                </div>
            </div>
        

        <Modal show = {showModal} onClose={() => setShowModal(false)} popupsize='md'>
            <Modal.Header/>
            <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                    dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-gray-500 text-lg'>
                        Are you sure you want to delete this post?
                    </h3>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={deleteJob}>
                            Yes, I'm sure
                        </Button>
                        <Button 
                        color = 'gray' onClick={() => setShowModal(false)}>
                            No, cancel 

                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
    )
}
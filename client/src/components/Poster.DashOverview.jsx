import { Table , Modal , Button  } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { PiHandbagSimpleLight } from 'react-icons/pi'
import { TiNews } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function PosterDashOverview() {

    const [showMore, setShowMore] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [error,setError] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [postIdDelete,setPostIdDelete] = useState(' ')
    const [pJob,setPJob] = useState(0);
    const [fJob,setFJob] = useState(0);
    
    const currentUser = useSelector((state) =>state.user)

    

    useEffect(() => {
        const fetchPosts = async () => {
            
            try {
                const res = await fetch(`/api/post/get-post/${currentUser.currentUser._id}`);
                const data = await res.json();

                if (res.ok) {
                    
                    setUserPosts(data.allPost);
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
                setUserPosts((prev) =>
                prev.filter((post)=>post._id !== postIdDelete))
                setShowModal(false);
            }
        }catch(error){
            setError(error);
        }
    }

    

    
  return (
    <div className=' w-full bg-blue-50 dark:bg-slate-700'>
    <div className='flex-wrap flex gap-4 m-8'>
        <div className='w-full flex gap-2 items-center justify-center '>
            <div className='flex flex-col p-3 bg-blue-100 gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex flex-wrap justify-between'>
                    <div className=''>
                        <h3 className='text-black text-xl font-semibold'>{pJob}</h3>
                        <p className='text-slate-500'>Your Part Time Jobs</p>
                    </div>
                    <PiHandbagSimpleLight className='bg-blue-400 text-white rounded-full
                            text-5xl p-3 shadow-lg'/>
                </div>
            </div>
            <div className='flex flex-col p-3 bg-orange-100 gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex flex-wrap justify-between'>
                    <div className=''>
                        <h3 className='text-black text-xl font-semibold'>{fJob}</h3>
                        <p className='text-slate-500'>Your Full Time Jobs</p>
                    </div>
                    <TiNews className='bg-orange-400 text-white rounded-full
                        text-5xl p-3 shadow-lg'/>
                </div>
            </div>
        </div>
    </div>
    
    <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center m-1 '>
        <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center w-full ml-2 mr-2 '>
            <div className='flex flex-col md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 justify-center w-full'>
                <h1 className='font-bold text-xl mb-3 text-center'>Jobs You Created</h1>
                <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Type</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            
                        </Table.Head>
                        {userPosts && userPosts.map((post) => (
                            <Table.Body className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={post.type === 'part' ? `/post/${post._id}` : `/full-post/${post._id}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='w-20 h-10 object-cover bg-gray-500'
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={post.type === 'part' ? `/post/${post._id}` : `/full-post/${post._id}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={post.type === 'part' ? `/post/${post._id}` : `/full-post/${post._id}`}
                                        >
                                            {post.type}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button className='bg-red-700 px-2 py-1 rounded-lg text-white hover:bg-opacity-90' type='button' onClick={() => {setShowModal(true) 
                                            setPostIdDelete(post._id)}}>Delete</button>
                                    </Table.Cell>
                                    
                                    
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    
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
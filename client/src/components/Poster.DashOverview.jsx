import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { PiHandbagSimpleLight } from 'react-icons/pi'
import { TiNews } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function PosterDashOverview() {
    const [showMore, setShowMore] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [postcount,setpostcount] = useState(0)
    const currentUser = useSelector((state) =>state.user)
//console.log(userPosts);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/get-posts`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    //setUserPosts(data.totalpost)
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchPosts();
        
    },);

    
  return (
    <div className='m-8 w-full  '>
    <div className='flex-wrap flex gap-4'>
        <div className='w-full flex gap-2 items-center justify-center'>
            <div className='flex flex-col p-3 bg-blue-100 gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex flex-wrap justify-between'>
                    <div className=''>
                        <h3 className='text-black text-xl font-semibold'>123</h3>
                        <p className='text-slate-500'>Open Jobs</p>
                    </div>
                    <PiHandbagSimpleLight className='bg-blue-400 text-white rounded-full
        text-5xl p-3 shadow-lg'/>
                </div>
            </div>
            <div className='flex flex-col p-3 bg-orange-100 gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex flex-wrap justify-between'>
                    <div className=''>
                        <h3 className='text-black text-xl font-semibold'>589</h3>
                        <p className='text-slate-500'>Saved Candidate</p>
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
                <h1 className='font-semibold text-lg'>Rcently Posted Jobs</h1>
                <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            
                        </Table.Head>
                        {userPosts.map((post) => (
                            <Table.Body className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
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
                                            to={`/post/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    
                                    
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    
            </div>


        </div>
    </div>
    </div>
  )
}

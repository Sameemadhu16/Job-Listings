import { Button, Dropdown, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowNarrowRight, HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FcApproval } from "react-icons/fc";
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PosterDashMyJobs() {

    const{currentUser} = useSelector((state) =>state.user);
    const [userPosts,setUserPosts]= useState([]);
    const [showMore, setShowMore] = useState(true);
    



    return (
    <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center m-1 '>
        <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center w-full ml-2 mr-2'>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 '>
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
        
    )
}

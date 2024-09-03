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
        
        <div className='flex-wrap gap-4 py-3 mx-auto justify-center w-full items-center p-5'>
            <h1 className='font-semibold  text-3xl m-4'>Rcently Posted Jobs</h1>
            <Table hoverable className='shadow-md mt-5 mr-5 w-full'>

                <Table.Head className="">
                    <Table.HeadCell className='font-bold'>Date updated</Table.HeadCell>
                    <Table.HeadCell className='font-bold'>Post image</Table.HeadCell>
                    <Table.HeadCell className='font-bold'>Post title</Table.HeadCell>
                    <Table.HeadCell className='font-bold'>Category</Table.HeadCell>
                </Table.Head>

                {userPosts.map((post, index) => (
                    <Table.Body key={index} className='divide-y'>
                        <Table.Row className='bg-slate-300 dark:border-gray-700 dark:bg-gray-800'>
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

        
    )
}

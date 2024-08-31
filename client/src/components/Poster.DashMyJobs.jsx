import { Button, Dropdown, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowNarrowRight, HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FcApproval } from "react-icons/fc";
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PosterDashMyJobs() {
    const{currentUser} = useSelector((state) =>state.user);
    const [userPost,setuserPost]= useState({});
    console.log(userPost);
   console.log(currentUser._id);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
    

    useEffect(()=>{
        const fetchPost = async() =>{
            try {
                
                    
                const res = await fetch(`/api/post/get-post/${currentUser._id}`);

                const data = await res.json();

                
                   
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                setuserPost(data.posts)
                
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPost();
    },[currentUser._id]);

   
    return (
        console.log(userPost)
        
        
    )
}

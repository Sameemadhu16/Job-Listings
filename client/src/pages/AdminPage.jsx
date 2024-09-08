import React, { useEffect, useState } from 'react';
import { Spinner , Modal , Button } from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import AdminCard from '../components/AdminCard';
import { useSelector } from 'react-redux';

export default function AdminPage() {

    const [loading, setLoading] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [users,setUsers] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [activeTab, setActiveTab] = useState('users');
    const [postIdDelete, setPostIdDelete] = useState(''); // New state for active tab
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/post/get-posts');
                const data = await res.json();

                if (res.ok) {
                    setPosts(data.posts);

                setFilteredPosts(data.posts); // Show all jobs by default
                    if (data.posts.length > 9) {
                        setShowMore(true);
                    }
                } else {
                    console.log(data.message);
                }
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        try{
            
            const fetchUsers = async () => {

                setLoading(true);

                const res = await fetch('/api/auth/get-users');
                const data = await res.json();

                if(res.ok){
                    setLoading(false);
                    setUsers(data.users);
                }

                if(!res.ok){
                    setLoading(false);
                    console.log(data.message);
                }
            }

            fetchUsers();
        }catch(error){
            console.log(error.message);
        }
    },[])

    const [filteredPosts, setFilteredPosts] = useState(users);

    const getFullTime = () => {
        setActiveTab('full'); // Update active tab
        const fullTimeJobs = posts.filter((post) => post.type === 'full');
        setFilteredPosts(fullTimeJobs);

        const first = filteredPosts.slice(0,9);
        setFirstArray(first);
    };

    const getPartTime = () => {
        setActiveTab('part'); // Update active tab
        const partTimeJobs = posts.filter((post) => post.type === 'part');
        setFilteredPosts(partTimeJobs);

        
    };

    const showUsers = () => {
        setActiveTab('users'); // Update active tab
        setFilteredPosts(users);
    };


    const handleDelete = async () => {
        
        try{
            const res =  await fetch(`api/post/delete-post/${postIdDelete}/${currentUser._id}`,{
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
            console.log(error);
        }
    }

    return (
        <div className="bg-blue-50 dark:bg-slate-700 min-h-screen">
            {loading && (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner className="text-center" />
                </div>
            )}
            {/* Main content */}
            <main className="max-w-4xl mx-auto py-12">

            
                <h1 className="text-center text-3xl font-bold text-blue-800 dark:text-slate-200">
                    Dashboard
                </h1>
                

                

                {/* Search results */}
                <div className="bg-white dark:bg-blue-950 shadow-md rounded-md p-6 mt-10">
                <h2 className="font-semibold text-lg mb-4 dark:text-white">
                    Search results for : <span className="text-blue-500 dark:text-blue-300 italic">
                        "{activeTab === 'users' ? 'USERS' : activeTab === 'full' ? 'FULL TIME' : 'PART TIME'}"
                    </span>
                </h2>

                    {/* Tab options */}
                    <div className="flex space-x-6 mb-6 border-b-2 pb-2">
                        <button
                            className={`${
                                activeTab === 'users' ? 'text-blue-700 dark:text-blue-200 font-semibold border-b-2 border-blue-200' : 'text-gray-500 dark:text-gray-300'
                            }`}
                            onClick={showUsers}
                        >
                            Users
                        </button>
                        <button
                            className={`${
                                activeTab === 'full' ? 'text-blue-700 dark:text-blue-200 font-semibold border-b-2 border-blue-200' : 'text-gray-500 dark:text-gray-300'
                            }`}
                            onClick={getFullTime}
                        >
                            Full Time
                        </button>
                        <button
                            className={`${
                                activeTab === 'part' ? 'text-blue-700 dark:text-blue-200 font-semibold border-b-2 border-blue-200' : 'text-gray-500 dark:text-gray-300'
                            }`}
                            onClick={getPartTime}
                        >
                            Part Time
                        </button>
                    </div>

                    {/* Job list */}
                    <div className="space-y-4">
                        {filteredPosts.map((post) => (
                            <div className='flex flex-col gap-1'>
                                <AdminCard key={post._id} post={post} />
                                <button className='bg-red-700 hover:bg-red-800 py-1 text-white rounded-lg w-1/4' onClick={() => {
                                                setShowModal(true);
                                                setPostIdDelete(post._id);
                                            }}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
                {showMore && (
                    <p className="text-center font-bold mt-3 text-blue-500 hover:underline cursor-pointer">SHOW MORE</p>
                )}

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
                        <Button color='failure' onClick={handleDelete}>
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

            </main>
        </div>
    )
}

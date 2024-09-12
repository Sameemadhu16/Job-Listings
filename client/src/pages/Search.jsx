import React, { useEffect, useState } from 'react';
import SearchCard from '../components/SearchCard';
import { Spinner, TextInput } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import { useLocation , useNavigate, useParams } from 'react-router-dom';

export default function Search() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [visiblePosts, setVisiblePosts] = useState(8);
    const location = useLocation();
    const [searchTerm,setSearchTerm] = useState('');
    const [formData,setFormData] = useState({
        searchTerm: '',
        sort: 'createdAt',
        category: 'uncateogory'
    });
    const [showMore,setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortUrl = urlParams.get('sort');

        if(searchTermFromUrl || sortUrl) {
            setFormData({
                ...formData,
                searchTerm:searchTermFromUrl,
                sort:sortUrl,
            });
        }
        const fetchPost = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/get-posts?${searchQuery}`)
            const data = await res.json();

            if(!res.ok){
                setLoading(false);
                console.log(data.message);
                return;
            }
            if(res.ok){
                setLoading(false);
                setPosts(data.posts);
                setFilteredPosts(data.posts);

                // Filter posts based on search term from URL
            if (searchTermFromUrl) {
                const filtered = data.posts.filter(post =>
                    post.title.toLowerCase().includes(searchTermFromUrl.toLowerCase())
                );
                setFilteredPosts(filtered);
            }

                if(posts.length === 8){
                    setShowMore(true);
                }else {
                    setShowMore(false);
                }
            }
        }
        fetchPost();
        
    },[location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm') {
            setFormData({...formData, searchTerm: e.target.value});
        }
        
    }



    const getFullTime = () => {
        setActiveTab('full');
        const fullTimeJobs = posts.filter((post) => post.type === 'full');
        setFilteredPosts(fullTimeJobs);
        setVisiblePosts(8);
    };

    const getPartTime = () => {
        setActiveTab('part');
        const partTimeJobs = posts.filter((post) => post.type === 'part');
        setFilteredPosts(partTimeJobs);
        setVisiblePosts(8);
    };

    const showAllJobs = () => {
        setActiveTab('all');
        setFilteredPosts(posts);
        setVisiblePosts(8);
    };

    const handleShowMore = () => {
        setVisiblePosts((prev) => prev + 8);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(searchTerm);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchTerm);

         // Update the URL with the new query parameters without refreshing the page
        window.history.pushState(null, '', `?${urlParams.toString()}`);

        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(formData.searchTerm.toLowerCase())
        );
        
        setFilteredPosts(filtered);  // Update the state with filtered posts
    }

    return (
        <div className="bg-blue-50 dark:bg-slate-700 min-h-screen">
            {loading && (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner className="text-center" />
                </div>
            )}
            <main className="max-w-4xl mx-auto py-12">
                <h1 className="text-center text-3xl font-bold text-blue-800 dark:text-slate-200">
                    Finding jobs made easy
                </h1>
                <p className="text-center text-lg text-gray-600 dark:text-white">Search. Explore. Choose.</p>

                <form onSubmit={handleSubmit} className="ml-28 flex text-center items-center gap-3">
                    <TextInput
                        placeholder="Search..."
                        id="searchTerm"
                        type="text"
                        className="pl-10 w-3/4"
                        value={formData.searchTerm}
                        onChange={(e) => setFormData({...formData, searchTerm: e.target.value})}  // Update formData
                    />
                </form>

                <div className="bg-white dark:bg-blue-950 shadow-md rounded-md p-6 mt-10">
                    <h2 className="font-semibold text-lg mb-4 dark:text-white">
                        Search results for:{' '}
                        <span className="text-blue-500 dark:text-blue-300 italic">
                            "{activeTab === 'all' ? 'ALL' : activeTab === 'full' ? 'FULL TIME' : 'PART TIME'}"
                        </span>
                    </h2>

                    <div className="flex space-x-6 mb-6 border-b-2 pb-2">
                        <button
                            className={`${
                                activeTab === 'all'
                                    ? 'text-blue-700 dark:text-blue-200 font-semibold border-b-2 border-blue-200'
                                    : 'text-gray-500 dark:text-gray-300'
                            }`}
                            onClick={showAllJobs}
                        >
                            All
                        </button>
                        <button
                            className={`${
                                activeTab === 'full'
                                    ? 'text-blue-700 dark:text-blue-200 font-semibold border-b-2 border-blue-200'
                                    : 'text-gray-500 dark:text-gray-300'
                            }`}
                            onClick={getFullTime}
                        >
                            Full Time
                        </button>
                        <button
                            className={`${
                                activeTab === 'part'
                                    ? 'text-blue-700 dark:text-blue-200 font-semibold border-b-2 border-blue-200'
                                    : 'text-gray-500 dark:text-gray-300'
                            }`}
                            onClick={getPartTime}
                        >
                            Part Time
                        </button>
                    </div>

                    <div className="space-y-4">
                        {filteredPosts.slice(0, visiblePosts).map((post) => (
                            <SearchCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
                {
                    filteredPosts.length === 0 ? (<p className='mt-2 font-bold'>NO RESULT FOUND...</p>) : (
                        
                        visiblePosts < filteredPosts.length && (
                            <p
                                className="text-center font-bold mt-3 text-blue-500 hover:underline cursor-pointer"
                                onClick={handleShowMore}
                            >
                                SHOW MORE
                            </p>
                    ))
                }
            </main>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import SearchCard from '../components/SearchCard';

export default function Search() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('all'); // New state for active tab

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

    const getFullTime = () => {
        setActiveTab('full'); // Update active tab
        const fullTimeJobs = posts.filter((post) => post.type === 'full');
        setFilteredPosts(fullTimeJobs);
    };

    const getPartTime = () => {
        setActiveTab('part'); // Update active tab
        const partTimeJobs = posts.filter((post) => post.type === 'part');
        setFilteredPosts(partTimeJobs);
    };

    const showAllJobs = () => {
        setActiveTab('all'); // Update active tab
        setFilteredPosts(posts);
    };

    return (
        <div className="bg-blue-50 min-h-screen">
            {/* Main content */}
            <main className="max-w-4xl mx-auto py-12">
                <h1 className="text-center text-3xl font-bold text-blue-800">
                    Finding jobs made easy
                </h1>
                <p className="text-center text-lg text-gray-600">Search. Explore. Choose.</p>

                

                {/* Search results */}
                <div className="bg-white shadow-md rounded-md p-6 mt-10">
                <h2 className="font-semibold text-lg mb-4">
                    Search results for : <span className="text-blue-500 italic">
                        "{activeTab === 'all' ? 'ALL' : activeTab === 'full' ? 'FULL TIME' : 'PART TIME'}"
                    </span>
                </h2>

                    {/* Tab options */}
                    <div className="flex space-x-6 mb-6 border-b-2 pb-2">
                        <button
                            className={`${
                                activeTab === 'all' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'text-gray-500'
                            }`}
                            onClick={showAllJobs}
                        >
                            All
                        </button>
                        <button
                            className={`${
                                activeTab === 'full' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'text-gray-500'
                            }`}
                            onClick={getFullTime}
                        >
                            Full Time
                        </button>
                        <button
                            className={`${
                                activeTab === 'part' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'text-gray-500'
                            }`}
                            onClick={getPartTime}
                        >
                            Part Time
                        </button>
                    </div>

                    {/* Job list */}
                    <div className="space-y-4">
                        {filteredPosts.map((post) => (
                            <SearchCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
                {showMore && (
                    <p className="text-center font-bold mt-3 text-blue-500 hover:underline cursor-pointer">SHOW MORE</p>
                )}
            </main>
        </div>
    );
}

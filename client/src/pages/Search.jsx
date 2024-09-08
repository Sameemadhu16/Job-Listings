import React, { useEffect, useState } from 'react';
import SearchCard from '../components/SearchCard';
import { Spinner, TextInput } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function Search() {
    const [posts, setPosts] = useState([]);
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [loading, setLoading] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [visiblePosts, setVisiblePosts] = useState(5);
    const location = useLocation();
    //const history = useHistory();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/post/get-posts');
                const data = await res.json();

                if (res.ok) {
                    setPosts(data.posts);
                    setFilteredPosts(data.posts); // Show all jobs by default
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
        const urlParams = new URLSearchParams(location.search);
        const SearchTermFromUrl = urlParams.get('searchTerm') || '';
        const sortFromUrl = urlParams.get('sort') || 'desc';
        const categoryFromUrl = urlParams.get('category') || 'uncategorized';

        setSidebarData({
            searchTerm: SearchTermFromUrl,
            sort: sortFromUrl,
            category: categoryFromUrl,
        });

        // Filter posts based on search term, sort order, and category
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(SearchTermFromUrl.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [location.search, posts]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSidebarData({ ...sidebarData, [id]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Update the URL with new search params
    //     const urlParams = new URLSearchParams();
    //     if (sidebarData.searchTerm) {
    //         urlParams.set('searchTerm', sidebarData.searchTerm);
    //     }
    //     if (sidebarData.sort) {
    //         urlParams.set('sort', sidebarData.sort);
    //     }
    //     if (sidebarData.category) {
    //         urlParams.set('category', sidebarData.category);
    //     }

    //     history.push({ search: urlParams.toString() });
    // };

    const getFullTime = () => {
        setActiveTab('full');
        const fullTimeJobs = posts.filter((post) => post.type === 'full');
        setFilteredPosts(fullTimeJobs);
        setVisiblePosts(5);
    };

    const getPartTime = () => {
        setActiveTab('part');
        const partTimeJobs = posts.filter((post) => post.type === 'part');
        setFilteredPosts(partTimeJobs);
        setVisiblePosts(5);
    };

    const showAllJobs = () => {
        setActiveTab('all');
        setFilteredPosts(posts);
        setVisiblePosts(5);
    };

    const handleShowMore = () => {
        setVisiblePosts((prev) => prev + 5);
    };

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

                <form  className="ml-28 flex text-center items-center gap-3">
                    <TextInput
                        placeholder="Search..."
                        id="searchTerm"
                        type="text"
                        value={sidebarData.searchTerm}
                        onChange={handleChange}
                        className="pl-10 w-3/4"
                    />
                    <button type="submit">
                        <FaSearch className="text-gray-400 cursor-pointer" />
                    </button>
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
                {visiblePosts < filteredPosts.length && (
                    <p
                        className="text-center font-bold mt-3 text-blue-500 hover:underline cursor-pointer"
                        onClick={handleShowMore}
                    >
                        SHOW MORE
                    </p>
                )}
            </main>
        </div>
    );
}

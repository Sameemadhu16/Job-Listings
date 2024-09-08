import { Button, Spinner } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { HiAnnotation, HiOutlineUserGroup, HiDocumentText } from 'react-icons/hi';
import SeekerCartPost from './Seeker.cartPost'

export default function SeekerDashOverview() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(0);
  const [pJob, setPJob] = useState(0);
  const [fJob, setFJob] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/post/get-posts');
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setPost(data.posts.length);
          setPJob(data.posts.filter(post => post.type === 'part').length);
          setFJob(data.posts.filter(post => post.type === 'full').length);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-6 md:mx-auto bg-blue-50 dark:bg-[rgb(16,23,42)]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Here’s an overview of your job statistics and latest job posts.</p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mb-6">
        <div className="flex flex-col p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl transform transition-transform hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <HiOutlineUserGroup className="bg-teal-500 text-white rounded-full text-6xl p-4 shadow-lg" />
            </div>
            <div>
              <h3 className="text-gray-600 dark:text-gray-300 text-md uppercase font-semibold">All Jobs</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{post}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl transform transition-transform hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <HiAnnotation className="bg-indigo-500 text-white rounded-full text-6xl p-4 shadow-lg" />
            </div>
            <div>
              <h3 className="text-gray-600 dark:text-gray-300 text-md uppercase font-semibold">Part Time Jobs</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{pJob}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl transform transition-transform hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <HiDocumentText className="bg-lime-500 text-white rounded-full text-6xl p-4 shadow-lg" />
            </div>
            <div>
              <h3 className="text-gray-600 dark:text-gray-300 text-md uppercase font-semibold">Full Time Jobs</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{fJob}</p>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">Latest Jobs</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner aria-label="Loading" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center w-full">
            {posts.length > 0 ? (
              posts.map(post => (
                <div className="flex justify-center w-full">
                  <SeekerCartPost key={post._id} post={post} ShowAddcart={true} />
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center">No jobs available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

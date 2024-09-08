import React, { useEffect, useState } from "react";
import seekerImage from "../images/seeker.jpg";
import ringsImage from "../images/ring-r.png";
import { Spinner } from "flowbite-react";
import { FaBriefcase, FaUserTie, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import JobPostCard from "../components/JobPostCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [pJob, setPJob] = useState(0);
  const [fJob, setFJob] = useState(0);
  const [tPosts, setTPosts] = useState(0);
  const [first, setFirst] = useState([]);
  const [users, setUsers] = useState(0);
  const [currentPartTimeJob, setCurrentPartTimeJob] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true);
            setShowMore(false);
            const res = await fetch(`/api/post/get-posts`);
            const data = await res.json();
            
            
            if(res.ok){
                setShowMore(true);
                setPosts(data.posts);
                setTPosts(data.totalPosts);
                setLoading(false);
                
                const part = data.posts.filter(post => post.type === 'part');
                const pJob = part.length;
                setPJob(pJob);

                const full = data.posts.filter(post => post.type == 'full');
                const fJob = full.length;
                setFJob(fJob);

                

                // Sort by 'createdAt' (assuming 'createdAt' is a date string)
                const sortedFull = full.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Get the first 3 most recent posts
                const recentFullPosts = sortedFull.slice(0, 6);
                setFirst(recentFullPosts)
                
            }
            if(!res.ok){
              console.log(data.message);
              setLoading(false);
            }
        };
        fetchPosts();
    },[posts._id])

    
    


  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const res = await fetch("/api/auth/get-users");
      const data = await res.json();

      if (res.ok) {
        setUsers(data.totalUsers);
        setLoading(false);
      }
      if (!res.ok) {
        setLoading(false);
        console.log(data.message);
      }
    };
    fetchUsers();
  }, []);

  // Part-time job carousel effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentPartTimeJob((prev) =>
  //       prev === pJob - 1 ? 0 : prev + 1
  //     );
  //   }, 5000); // Change job every 5 seconds

  //   return () => clearInterval(interval);
  // }, [pJob]);

  const hanldeNavigate = () => {
    navigate("/search");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true); // Start the transition
      setTimeout(() => {
        setCurrentPartTimeJob((prev) => (prev === pJob - 1 ? 0 : prev + 1));
        setTransitioning(false); // End the transition after 1 second
      }, 1000); // Transition duration
    }, 5000); // Change job every 5 seconds

    return () => clearInterval(interval);
  }, [pJob]);

  const getSlideStyle = (index) => {
    return {
      transition: "transform 1s ease-in-out, opacity 1s ease-in-out",
      transform:
        index === currentPartTimeJob
          ? "translateX(0)" // Slide into view
          : index < currentPartTimeJob
          ? "translateX(-100%)" // Slide out of view to the left
          : "translateX(100%)", // Slide in from the right
      opacity: index === currentPartTimeJob ? 1 : 0,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
    };
  };

  return (

    <div className="relative flex flex-col items-center bg-blue-50 dark:bg-slate-700 min-h-screen p-4 lg:p-10">
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner className="text-center" />
        </div>
      )}
      {/* Main Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-10/12 mx-auto">
            {/* Text Section */}
            <div className="text-center lg:text-left lg:w-1/2">
                <h1 className="text-4xl font-bold text-blue-800 dark:text-white leading-tight">
                    Secure Your Career Path. You’re Worth It.
                </h1>
                <p className="mt-4 text-lg text-gray-700 dark:text-slate-200">
                    Empowering Ambitious Job Seekers with Comprehensive Tools and
                    Resources to Discover, Apply, and Secure Their Dream Jobs.
                </p>
                <div className=" mt-6  flex flex-col items-center lg:flex-row gap-2">
                    
                    <button onClick={hanldeNavigate}   className="px-10 text-blue-800 dark:text-blue-200 font-bold text-lg rounded-lg">
                    Explore...
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className="relative mt-10 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
                {/* Decorative Background */}
                <div className="absolute inset-0 -right-10 w-72 h-72 lg:w-96 lg:h-96 ml-14">
                    <img
                    src={ringsImage}
                    alt="Decorative Rings"
                    className="w-full h-full object-contain ml-7"
                    />
                </div>

                {/* Job Seeker Image */}
                <div className="mr-12">
                    <img
                        src={seekerImage}
                        alt="Job Seeker"
                        className="relative mr-16 z-8 w-72 h-72 lg:w-95 lg:h-95 object-cover rounded-full shadow-lg"
                    />
                </div>
    

                {/* Job Posts Info Box */}
                <div className="absolute top-0 right-0 bg-white dark:bg-slate-200 p-2 rounded shadow-md mt-4 mr-10">
                    <span className="block text-sm z-10 font-medium text-gray-800">
                    {tPosts}+ All Jobs Post 
                    </span>
                </div>
            </div>

        </div>

      {/* Footer Statistics Section */}
      <footer className="w-5/6 bg-white dark:bg-slate-800 py-6 mt-20 shadow-lg">
        <div className="flex justify-around w-3/4 lg:w-10/12 mx-auto">
          <div className="text-center">
            <div className=" flex items-center gap-1">
                <FaBriefcase className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800 dark:text-slate-200">{fJob}+</span>
            </div>
            <span className="text-gray-500 dark:text-white">Full Time Jobs</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
                <FaBriefcase className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800 dark:text-slate-200">{pJob}+</span>
            </div>
            <span className="text-gray-500 dark:text-white">Part Time Jobs</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
                <FaUserTie className="text-blue-500" size={24} />
                <span className="block text-2xl font-bold text-gray-800 dark:text-slate-200">{users}+</span>
            </div>
            <span className="text-gray-500 dark:text-white">Users</span>
          </div>
        </div>
      </footer>

      {/* Part-time job carousel */}
      <div className="relative w-5/6 flex justify-center overflow-hidden h-[500px] mt-6 mb-6">
        {posts
          .filter((post) => post.type === "part")
          .map((post, index) => (
            <div
              key={post._id}
              style={{
                ...getSlideStyle(index), // Merge the sliding styles
                backgroundImage: `url('https://www.vpi-inc.com/wp-content/uploads/2017/06/10871_Jobs-Search-Resources_848x400_JUL17-848x400.png')`, // Background image
              }}
              className="flex justify-center items-center bg-cover bg-center rounded-lg shadow-lg"
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              <div className="relative z-10 text-center  p-6">
                <h1 className="text-3xl font-bold text-teal-100 mb-6">{post.title}</h1>
                <p className="text-lg text-slate-200 font-semibold">Venue: <span className="text-white font-serif text-lg">  {post.venue}</span></p>
                <p className="text-lg text-slate-200 font-semibold">Date: <span className="text-white font-serif text-lg">{new Date(post.date).toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric",})}</span></p>
                <p className="text-lg text-slate-200 font-semibold">Salary: <span className="text-white font-serif text-lg">{post.salary}</span></p>
                <div className="flex items-center gap-4">
                  <p className="text-lg text-slate-200 font-semibold">Start At: <span className="text-white font-serif text-lg">{post.sTime}</span></p>
                  <p className="text-lg text-slate-200 font-semibold">End At:  <span className="text-white font-serif text-lg">{post.eTime}</span></p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-3 justify-center">
        {first.map((post) => (
          <JobPostCard post={post} key={post._id} />
        ))}
      </div>

      
    </div>
  );
};

export default Home;

import React ,{useEffect,useState} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import PostCards from '../components/PostCards';
import JobPostCard from '../components/JobPostCard';
import { useSelector } from 'react-redux'
import { Card, Label } from 'flowbite-react'



export default function Post() {

    const {postId} = useParams();
    const [post,setPost]=useState([]);
    const [recentPosts,setRecentPosts]=useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user);
    const userId = currentUser.currentUser._id
    
    useEffect(() => {
        
            try{
                const fetchJobs = async () => {
                    const res = await fetch(`/api/post/get-post/${postId}`)
                    const data = await res.json();
                    
    
                    if(res.ok){
                        setLoading(false)
                        setPost(data.allPost[0])
                        //console.log(post)
                        
                    }
                }
                fetchJobs();
            }catch(error){
                console.log(error)
            }

            
        
    },[postId])


    useEffect(() => {
        try{
            const fetchPosts = async () => {
                const res = await fetch(`/api/post/get-posts?limit=3`);
                const data = await res.json();

                if(res.ok){
                    setLoading(false);
                    setRecentPosts(data.posts);
                }
            } 
            fetchPosts();
        }catch(error){
            console.log(error.message);
        }
    },[]);

    const handleUpdateClick = () => {
        navigate(`/update-post/${post._id}`); 
      };

    if(loading){
        return <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl'/>
        </div>
    }

    return (
        <div className="bg-slate-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-3/4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-6 md:mb-0 md:w-1/2">
                        <div className='flex flex-row justify-between'>
                            <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
                            {post.type == "part" ? (
                            <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 px-2 py-1 h-9">Part Time</Label>
                            ):(<Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 px-2 py-1 h-9">Full Time</Label>)}
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative  p-10 rounded-lg text-center text-white">
                            <p className="text-lg mb-4">Your Message Has Been Sent</p>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src={post.image} alt="Envelope" className=" h-48" />
                            </div>
                            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                Send Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

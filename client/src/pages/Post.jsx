import React ,{useEffect,useState} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import PostCards from '../components/PostCards';



export default function Post() {

    const {postslug}=useParams();
    const [post,setPost]=useState({});
    const [recentPosts,setRecentPosts]=useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchPost = async () => {
            try{
                setLoading(true);
                const res= await fetch(`/api/post/get-posts?title=${postslug}`);
                const data= await res.json();
                
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return ;
                }

                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            }
            catch(error){
                    setError(true);
                    setLoading(false)
            }
        }; fetchPost();
    },[postslug])

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
    <div>
        Post Page
    </div>
  )
}

import React ,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import PostCards from '../components/PostCards';


export default function Post() {

    const {postslug}=useParams();
    const [post,setPost]=useState({});
    const [recentPosts,setRecentPosts]=useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

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

    if(loading){
        return <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl'/>
        </div>
    }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='p-3 text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
            {post && post.title}
        </h1>
        
        <img src={post && post.image} alt={post&& post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
        <div className='flex justify-between p-3 border-b border-slale-500 mx-auto w-full max-w-2xl text-xs'>
            <span>
                {post && new Date(post.createdAt).toLocaleDateString()}
            </span>
            <p>{post.companyName}</p>
            

        </div>
        <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}></div>
        <div className='max-w-4xl mx-auto w-full'>
        <div className='flex flex-col gap-2 justify-around w-full'>
            <Button className='bg-green-600 hover:bg-opacity-95'>Update</Button>
            <Button className='bg-red-600 hover:bg-opacity-95'>Delete</Button>
        </div>
            
        </div>
        <div className='flex flex-col justify-center items-center mb-5'>
            <h1 className='text-xl mt-8 font-semibold'>
                Recent Post
            </h1>
            <div className='flex flex-wrap gap-4 mt-5 justify-center items-center'>
                {
                    recentPosts && recentPosts.map((post)=>
                        <PostCards key={post._id}
                        post={post}/>
                    )
                }
            </div>
        </div>
    </main>
  )
}

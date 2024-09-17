import React,{useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ChatMessage = ({ message }) => {
    console.log(message)

    const navigate = useNavigate();
    const [post,setPost]=useState([]);
    const [loading,setLoading] = useState(false);

    const Navigate = () => {
        navigate(`/chatbox?id=${message.postId}`)
    }

    useEffect(() => {
            try{
                const fetchJobs = async () => {
                    const res = await fetch(`/api/post/get-job/${message.postId}`)
                    const data = await res.json();
                    
    
                    if(res.ok){
                        setLoading(false)
                        setPost(data)
                        console.log(post)
                    }
                }
                fetchJobs();
            }catch(error){
                console.log(error)
            }

            
        
    },[message.postId])

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer" onClick={Navigate}>
            <div className="flex items-center space-x-4">
                <img 
                src={post.image} 
                alt={`${name}'s avatar`} 
                className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                <div className="flex items-center">
                    <span className="font-semibold text-gray-800">{post.title}</span>
                    <span className="text-xs text-gray-500 ml-2">{new Date(message.messages[message.messages.length-1].createdAt).toLocaleDateString()}</span>
                    <span className="text-xs text-gray-500 ml-2">{new Date(message.messages[message.messages.length-1].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-sm text-gray-600">{message.messages[message.messages.length-1].message}</p>
                </div>
            </div>
            </div>
        );
};

export default ChatMessage;

import { Button, Table } from 'flowbite-react';
import React,{useState,useEffect} from 'react';
import { HiAnnotation, HiOutlineUserGroup, HiDocumentText } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import PostCards from './PostCards';
import SeekerCartPost from './Seeker.cartPost';
import { Spinner } from 'flowbite-react';



export default function SeekerDashOverview({}) {

  const [posts,setPosts] = useState([]);
  const [post,setPost] = useState(0);
  const [pJob,setPJob] = useState(0);
  const [fJob,setFJob] = useState(0);
  const [loading,setLoading] = useState(false);

  useEffect(() =>{
    const fetchPosts = async () => {

      try{
        setLoading(true);

        const res = await fetch('/api/post/get-posts');
        const data = await res.json();
        
        if(res.ok){
          setPosts(data.posts);
          setLoading(false);
        }

        if(!res.ok){
          setLoading(false);
          console.log(data.message);
        }
        
        setPost(data.posts.length)

        const part = data.posts.filter(post => post.type === 'part');
        const pJob = part.length;
        setPJob(pJob);

        const full = data.posts.filter(post => post.type == 'full');
        const fJob = full.length;
        setFJob(fJob);

      }catch(error){
        console.log(error);
      }
      
    }
    fetchPosts();
  },[])

  const handleButtonClick = () => {
    window.location.href = '/seeker-dashboard?tab=profile';
  };


  return (
    <div className="p-3 md:mx-auto bg-blue-50 dark:bg-[rgb(16,23,42)]">
      <div className="flex-wrap flex gap-4 justify-center ">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-white text-md uppercase">ALL Jobs</h3>
              <p className="text-2xl">{post}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-white  text-md uppercase">Part Time Jobs</h3>
              <p className="text-2xl">{fJob}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-white text-md uppercase">Full Time Jobs</h3>
              <p className="text-2xl">{pJob}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center max-w-full">

      

        <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800">
          <h1 className="text-center p-2 font-bold ">Latest Jobs</h1>
          {/*<Table hoverable>
            <Table.Head>
              <Table.HeadCell>Job</Table.HeadCell>
              <Table.HeadCell>Date Applied</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='flex gap-2'>
                  <img
                    src='https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='
                    alt='user'
                    className="w-10 h-10 rounded-full bg:gray-500"
                    
                  />
                  Network Engineer
                </Table.Cell>
                <Table.Cell>
                  Feb 2, 2022
                </Table.Cell>
                <Table.Cell>
                  Active
                </Table.Cell>
                <Table.Cell>
                  <Button outline gradientDuoTone='purpleToPink'>
                    <Link to="#">
                      View Details
                    </Link>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>*/}
         <div className="flex flex-col  gap-2 sm:flex-row sm:gap-2">
         {
            posts && posts.length > 0 && (
              <div className="p-4">
            <div className="flex flex-wrap gap-4 ml-40">
            {posts.map((post)=>(
              <SeekerCartPost key={post._id} post={post} ShowAddcart={true}/>
            ))}
            </div>
          </div>
            )
          }
        </div>

        </div>
      </div>
    </div>
  );
}

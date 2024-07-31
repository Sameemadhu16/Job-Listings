import { Button, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TbFilterBolt } from "react-icons/tb";
import PostCards from '../components/PostCards';
import SeekerCartPost from '../components/Seeker.cartPost';

export default function Home() {

  const [posts,setPosts] = useState([]);

  useEffect(() =>{
    const fetchPosts = async () => {
      const res = await fetch('/api/post/get-posts');
      const data = await res.json();
      setPosts(data.posts)
    }
    fetchPosts();
  },[])

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="flex justify-end p-4 bg-white shadow">
        <form className="mr-3 hidden lg:inline-block">
          <TextInput
            type="text"
            placeholder="Search Jobs..."
            rightIcon={AiOutlineSearch}
            className="mr-4 w-96"
          />
        </form>
        <Button className="w-12 h-12 lg:hidden focus:outline-none" color="gray" pill>
          <AiOutlineSearch />
        </Button>
        <Button className="flex flex-col items-center mx-4">
          <TbFilterBolt />
          <span>Filter</span>
        </Button>
        <Button className="mx-4">Find Job</Button>
      </div>
      {
        posts && posts.length > 0 && (
          <div className="p-4">
        <div className="flex flex-wrap gap-4 ml-40">
        {posts.map((post)=>(
          <SeekerCartPost key={post._id} post={post} />
        ))}
        </div>
      </div>
        )
      }
      <div className="flex justify-center py-4">
        <Button.Group>
          <Button color="light">01</Button>
          <Button color="light">02</Button>
          <Button color="light">03</Button>
          <Button color="light">04</Button>
          <Button color="light">05</Button>
        </Button.Group>
      </div>
    </div>
  );
}

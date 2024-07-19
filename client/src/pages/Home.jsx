import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TbFilterBolt } from "react-icons/tb";
import PostCards from '../components/PostCards';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end p-4 bg-white shadow">
        <form className="mr-3 hidden lg:inline-block">
          <TextInput
            type="text"
            placeholder="Search Jobs..."
            rightIcon={AiOutlineSearch}
            className="mr-4"
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
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCards />
          <PostCards />
          <PostCards />
          <PostCards />
          <PostCards />
          <PostCards />
        </div>
      </div>
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
